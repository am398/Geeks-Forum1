import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModal } from "@/components/modals/initial-modal";

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

  return <InitialModal />;

  return <div>Create a Course</div>;
};

export default SetupPage;
