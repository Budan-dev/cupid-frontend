/**
 * Auth utility functions
 * Handles authentication-related operations
 */

/**
 * Checks if the user is authenticated by verifying the auth cookie
 * @returns Promise<boolean> - true if user is authenticated, false otherwise
 */
export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
      {
        method: "GET",
        credentials: "include", // Send cookies with the request
      },
    );

    return response.ok;
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
}

/**
 * Signs out the user by clearing the auth cookie
 * @returns Promise<boolean> - true if sign out was successful
 */
export async function signOut(): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    return response.ok;
  } catch (error) {
    console.error("Sign out failed:", error);
    return false;
  }
}

/**
 * Gets the auth cookie name (usually "authToken" or "token")
 * This may vary based on your backend implementation
 */
export function getAuthCookieName(): string {
  return "authToken"; // or "token", depending on your backend
}
