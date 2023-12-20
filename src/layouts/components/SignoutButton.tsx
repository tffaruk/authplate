"use client";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("remember");
  };
  return (
    <button
      className="btn btn-outline-primary btn-sm w-full"
      onClick={handleSignOut}
      // size={2}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
