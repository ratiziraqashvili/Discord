"use client";
//@ts-ignore
import qs from "query-string";
//@ts-ignore
import { Video, VideoOff } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
//@ts-ignore
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const ChatVideoButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl({
        url: pathname || "",
        query: {
            video: isVideo ? undefined : true,
        }
    }, { skipNull: true })
  }

  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End video call" : "Start video call";

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};
