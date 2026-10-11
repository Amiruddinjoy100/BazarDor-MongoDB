
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LinkGoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleLinkGoogle = async () => {
    setLoading(true);

    try {
      const { error } = await authClient.linkSocial({
        provider: "google",
        callbackURL: "/profile",
      });

      if (error) {
        toast.error(error.message || "Google account linking failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLinkGoogle}
      disabled={loading}
      className="btn btn-green"
    >
      {loading
        ? "Connecting Google..."
        : "Google Account Link করুন"}
    </button>
  );
}
