import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";

const Loader = ({ h, w }: { h: string; w: string }) => {
  return (
    <div className={cn("bg-(--loader) rounded-full animate-pulse", h, w)}></div>
  );
};

export const NotifyLoader = () => {
  return (
    <div className="flex w-full border-b border-(--border) p-4 items-center justify-between">
      <div className="flex items-center gap-x-3 w-full">
        <Loader h="h-10" w="w-11" />
        <section className="flex flex-col gap-y-2 w-full">
          <Loader h="h-1" w="w-16" />
          <Loader h="h-2" w="w-1/2" />
        </section>
      </div>
      <div>
        <Ellipsis className="text-(--placeholder)" />
      </div>
    </div>
  );
};

export const PostLoader = () => {
  return (
    <div className="flex flex-row gap-x-2 w-full border-b border-(--border) p-2 sm:px-5 py-4">
      <Loader h="h-10" w="w-11" />
      <div className="flex flex-col gap-y-1 w-full">
        <Loader h="h-2" w="w-20" />
        <div className="mt-3 flex flex-col gap-y-2">
          <Loader h="h-2" w="w-3/4" />
          <Loader h="h-2" w="w-1/2" />
          <Loader h="h-2" w="w-1/4" />
        </div>
      </div>
    </div>
  );
};

export const PostsLoader = ({ count }: { count: number }) => {
  return (
    <div className="flex flex-col transition-opacity duration-500 opacity-100">
      {Array.from({ length: count }).map((_, index) => (
        <PostLoader key={index} />
      ))}
    </div>
  );
};

export const NotifysLoader = ({ count }: { count: number }) => {
  return (
    <div className="flex flex-col transition-opacity duration-500 opacity-100">
      {Array.from({ length: count }).map((_, index) => (
        <NotifyLoader key={index} />
      ))}
    </div>
  );
};

const PartyLoader = () => {
  return (
    <div className="flex items-center justify-between w-full py-3 px-5">
      <div className="flex items-center gap-3">
        <Loader h="h-10" w="w-10" />
        <div className="flex flex-col gap-3">
          <Loader h="h-2" w="w-48" />
          <Loader h="h-2" w="w-1/2" />
        </div>
      </div>
      <div className="flex flex-col w-full justify-between items-end">
        <Ellipsis className="text-(--placeholder)" />
        <Loader h="h-1" w="w-1/4" />
      </div>
    </div>
  );
};

export const PartiesLoader = () => {
  return (
    <div className="flex flex-col transition-opacity duration-500 opacity-100">
      {Array.from({ length: 6 }).map((_, index) => (
        <PartyLoader key={index} />
      ))}
    </div>
  );
};

export const ProfileLoader = () => {
  return (
    <div className="flex flex-col">
      <PostsLoader count={6} />
    </div>
  );
};
