const Empty = ({ text, full }: { text: string; full?: boolean }) => {
  return (
    <div
      className={`${
        full ? "h-[65vh]" : null
      } flex items-center py-3 justify-center flex-col gap-y-3 text-center px-2`}
    >
      <p className="text-secondaryicon text-center py-3">{text}</p>
    </div>
  );
};

export default Empty;
