import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(
  req: Request
) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const courseId = searchParams.get("courseId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!courseId) {
      return new NextResponse("Course ID missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.PROF, MemberRole.TA]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          }
        }
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("CHANNELS_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}