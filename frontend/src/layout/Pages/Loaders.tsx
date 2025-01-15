import { Ellipsis } from "lucide-react";

const Loader = ({ h, w }: { h: string; w: string }) => {
  return <div className={`bg-loader ${h} ${w} rounded-full`}></div>;
};

export const NotifyLoader = () => {
  return (
    <div className="flex w-full border-b border-border p-4 items-center justify-between">
      <div className="flex items-center gap-x-3 w-full">
        <Loader h="h-10" w="w-11" />
        <section className="flex flex-col gap-y-2 w-full">
          <Loader h="h-1" w="w-16" />
          <Loader h="h-2" w="w-1/2" />
        </section>
      </div>
      <div>
        <Ellipsis className="text-secondaryicon" />
      </div>
    </div>
  );
};

export const PostLoader = () => {
  return (
    <div className="flex flex-row gap-x-2 w-full border-b border-border p-2 sm:px-5 py-4">
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

export const ProfileLoader = () => {
  return (
    <div className="flex flex-col">
      <header className="flex flex-col gap-y-5 w-full p-3 lg:px-4 border-b border-border h-72">
        <div className="namesContainer flex flex-row gap-x-3">
          <Loader h="h-24" w="w-24" />
          <div className="flex flex-col gap-y-3 mt-4">
            <Loader h="h-6" w="w-24" />
            <Loader h="h-3" w="w-20" />
          </div>
        </div>
        <Loader h="h-3" w="w-1/2" />
        <Loader h="h-7" w="w-full" />
        <Loader h="h-3" w="w-1/4" />
        <Loader h="h-3" w="w-1/4" />
      </header>
      <PostsLoader count={4} />
    </div>
  );
};
