import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface CourseIdPageProps {
  params: {
    courseId: string;
  }
};

const CourseIdPage = async ({
  params
}: CourseIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      members: {
        some: {
          profileId: profile.id,
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "Study Zone"
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  })

  const initialChannel = course?.channels[0];

  if (initialChannel?.name !== "Study Zone") {
    return null;
  }

   return redirect(`/courses/${params.courseId}/channels/${initialChannel?.id}`)
}

 
export default CourseIdPage;


