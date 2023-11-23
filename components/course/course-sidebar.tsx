import { ChannelType, MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  MessageSquare,
  Mic,
  ShieldHalf,
  ShieldCheck,
  Video,
} from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { CourseHeader } from "./course-header";

// import { CourseHeader } from "./course-header";
import { CourseSearch } from "./course-search";
import { CourseSection } from "./course-section";
import { CourseChannel } from "./course-channel";
import { CourseMember } from "./course-member";

interface CourseSidebarProps {
  courseId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <MessageSquare className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.STUDENT]: null,
  [MemberRole.TA]: <ShieldHalf className="h-4 w-4 ml-2 text-indigo-500" />,
  [MemberRole.PROF]: <ShieldCheck className="h-4 w-4 text-green-500" />,
};

export const CourseSidebar = async ({ courseId }: CourseSidebarProps) => {
  console.log("courseId", courseId);
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = course?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = course?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = course?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = course?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!course) {
    return redirect("/");
  }

  const role = course.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <CourseHeader course={course} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <CourseSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <CourseSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <CourseChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  course={course}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <CourseSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <CourseChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  course={course}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <CourseSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <CourseChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  course={course}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <CourseSection
              sectionType="members"
              role={role}
              label="Members"
              course={course}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <CourseMember
                  key={member.id}
                  member={member}
                  course={course}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
