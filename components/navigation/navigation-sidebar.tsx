import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import Image from "next/image";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode.toggle";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-gradient-to-br from-[#1E1F22] via-[#2C2D31] to-[#3A3B3F] bg-gradient-to-br from-[#E3E5E8] via-[#c2afdf] to-[#f9b5ce] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {courses.map((course) => (
          <div key={course.id} className="mb-4">
            <NavigationItem
              id={course.id}
              name={course.name}
              imageUrl={course.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      {/* <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div> */}
    </div>
  );
};
