import { NextResponse } from "next/server";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

// Export a named `POST` function
export async function POST(req: Request) {
  try {
    const { inviteCode } = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return redirectToSignIn();
    }

    const existingCourse = await db.course.findFirst({
      where: {
        inviteCode: inviteCode,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (existingCourse) {
      return NextResponse.json(existingCourse);
    }

    const course = await db.course.update({
      where: {
        inviteCode: inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id,
            },
          ],
        },
      },
    });

    if (course) {
      return NextResponse.json(course);
    }

    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  } catch (error: unknown) {
    console.error("[ACCEPT_INVITE]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
