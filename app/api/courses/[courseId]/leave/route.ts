import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.courseId) {
      return new NextResponse("Course ID missing", { status: 400 });
    }

    const course = await db.course.update({
      where: {
        id: params.courseId,
        profileId: {
          not: profile.id
        },
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}