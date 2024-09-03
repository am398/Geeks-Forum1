"use client";
import React, { useState } from "react";
import { Book, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import axios from "axios";
import { UserButton } from "@clerk/nextjs";

interface StudentCoursePageProps {
  name: string;
  id: string;
}

interface AcceptInviteProps {
  inviteCode: string;
}

export const acceptInvite = async ({ inviteCode }: AcceptInviteProps) => {
  try {
    const response = await axios.post("/api/courses/accept-invite", {
      inviteCode,
    });
    return response.data;
  } catch (error) {
    console.error("[ACCEPT_INVITE]", error);
  }
};

const StudentCoursePage = ({ name, id }: StudentCoursePageProps) => {
  const [inviteLink, setInviteLink] = useState("");
  const [joinStatus, setJoinStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJoinStatus("idle");
    console.log("Anuj");
    const link_arr = inviteLink.split("/");
    const inviteCode = link_arr[link_arr.length - 1];

    const course = await acceptInvite({ inviteCode });

    setTimeout(() => {
      if (course) {
        setJoinStatus("success");
      } else {
        setJoinStatus("error");
      }
    }, 1000);

    if (course) {
      return redirect(`/courses/${course.id}`);
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <Book className="text-indigo-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome {name} !
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join your course by pasting the invite link given by your Professor
          below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="inviteLink"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Invite Link
            </label>
            <input
              type="text"
              id="inviteLink"
              value={inviteLink}
              onChange={(e) => setInviteLink(e.target.value)}
              placeholder="Paste your invite link here"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
          >
            Join Course
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </form>
        {joinStatus === "success" && (
          <Alert className="mt-4 bg-green-100 border-green-400 text-green-700">
            <AlertDescription>Successfully joined the course!</AlertDescription>
          </Alert>
        )}
        {joinStatus === "error" && (
          <Alert className="mt-4 bg-red-100 border-red-400 text-red-700">
            <AlertDescription>
              Invalid invite link. Please try again.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="absolute top-8 right-8 w-10 h-10">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[40px] w-[40px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default StudentCoursePage;
