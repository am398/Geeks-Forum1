import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";
import StudentCoursePage from "@/components/modals/student-initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  console.log(profile);

  const course = await db.course.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (course) {
    return redirect(`/courses/${course.id}`);
  }

  const organisation = profile.email.split("@")[1];

  if (organisation === "snu.edu.in") {
    return <StudentCoursePage name={profile.name} id={profile.id} />;
  } else return <InitialModal />;
};

export default SetupPage;
