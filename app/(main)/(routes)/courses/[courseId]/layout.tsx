import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { CourseSidebar } from "@/components/course/course-sidebar";

const CourseIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }


  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (!course) {
    return redirect("/");
  }

  return ( 
    <div className="h-full">
      <div 
      className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <CourseSidebar courseId={params.courseId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
   );
}
 
export default CourseIdLayout;