"use client";

import { useEffect, useState } from "react";

interface Community {
  community: {
    id: string;
    name: string;
  };
  role: string;
}
interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  communities: Community[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/user/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setError("Unable to load profile. Please sign in again.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProfile(data.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return <div className="p-5">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="p-5">
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Profile</h1>
      {profile ? (
        <div>
          <h1>
            {profile?.firstName} {profile?.lastName}
          </h1>
          <p>Email: {profile?.email}</p>
          <p>Username: @{profile?.username}</p>
          <p>Role: {profile?.role}</p>
          <p>
            Communities:{" "}
            {profile?.communities?.length > 0
              ? profile.communities.map((c) => c.community.name).join(", ")
              : "No communities yet"}
          </p>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
}
