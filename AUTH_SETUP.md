# Authentication Setup Guide

This guide explains how the authentication and cookie-based session system works in this Next.js application.

## Overview

The authentication system consists of:

1. **Sign-in Form** - Collects credentials and sends them to the backend
2. **Middleware** - Protects routes by checking for authentication cookies
3. **Protected Layout** - Verifies auth on page load
4. **Auth Utilities** - Helper functions for auth operations

## How It Works

### 1. Sign-In Flow

**File:** `app/(auth)/components/signinForm.tsx`

When a user signs in:

```typescript
// The credentials: "include" option is critical
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/user/signin`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ← Sends & receives cookies
    body: JSON.stringify({ email, password }),
  },
);
```

**What happens:**

- The browser sends the email/password to your backend
- The backend validates credentials
- The backend returns a Set-Cookie header (e.g., `authToken` or `token`)
- The browser **automatically stores** this cookie
- On successful sign-in, the user is redirected to `/profile`

### 2. Cookie Storage

The backend should set a cookie like this (example Node.js):

```javascript
res.cookie("authToken", token, {
  httpOnly: true, // Not accessible from JavaScript
  secure: true, // Only sent over HTTPS
  sameSite: "lax", // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

### 3. Middleware Protection

**File:** `middleware.ts`

The middleware runs on every request and:

- Checks if the route is protected (e.g., `/profile`, `/communities`)
- Looks for the `authToken` or `token` cookie
- If cookie exists → allow access
- If cookie missing → redirect to `/signin`

**Protected routes:**

- `/profile`
- `/communities`
- `/messages`

### 4. Protected Layout Authentication Check

**File:** `app/(protected)/layout.tsx`

When entering a protected route, the layout:

1. Calls `/api/user/profile` with `credentials: "include"`
2. The browser automatically includes the auth cookie
3. If the backend returns 200 → user is authenticated, show content
4. If the backend returns 401 → user is not authenticated, redirect to signin

### 5. Using Auth Utilities

**File:** `lib/auth.ts`

Helper functions for common auth operations:

```typescript
import { checkAuth, signOut } from "@/lib/auth";

// Check if user is authenticated
const isAuth = await checkAuth();

// Sign out the user
await signOut();
```

## Important Notes

### Cookie Handling

- **Automatic**: With `credentials: "include"`, browsers automatically handle cookies
- **HttpOnly**: Best practice is to set cookies as HttpOnly on the backend
- **Secure**: Use Secure flag for HTTPS only
- **SameSite**: Protect against CSRF attacks

### Environment Variables

Make sure your `.env.local` has:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Adjust the URL based on your backend server location.

### Backend Requirements

Your backend must:

1. Accept POST requests at `/api/user/signin`
2. Return Set-Cookie header with auth token on success
3. Implement `/api/user/profile` endpoint to verify auth
4. Return 401 for unauthenticated requests
5. Implement `/api/user/logout` endpoint to clear cookies

### Testing the Setup

1. Start your backend server
2. Run your Next.js app: `npm run dev`
3. Go to `http://localhost:3000/signin`
4. Enter credentials and sign in
5. Check the Network tab in DevTools → look for Set-Cookie header
6. Try accessing `/profile` → should work if authenticated
7. Check Application tab → see the stored cookie

### Debugging

Enable console logs to see what's happening:

```typescript
console.log("Response status:", response.status);
console.log("Response cookies:", response.headers.getSetCookie?.());
```

Check the browser DevTools → Application tab → Cookies to verify cookies are stored.

## Next Steps

1. Ensure your backend is setting cookies correctly
2. Test the sign-in flow and verify cookies are stored
3. Test accessing protected routes (should redirect to signin if not authenticated)
4. Deploy and push to GitHub

## File Structure

```
middleware.ts                          # Route protection
lib/auth.ts                           # Auth utilities
app/(auth)/components/signinForm.tsx  # Sign-in form
app/(protected)/layout.tsx            # Protected layout
```
