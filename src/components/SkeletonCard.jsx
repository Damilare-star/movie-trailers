const SkeletonCard = () => {
  return (
    <div className="flex-shrink-0 w-[150px] sm:w-[200px] md:w-[240px]">
      <div className="rounded-lg overflow-hidden">
        <div className="w-full aspect-[2/3] bg-netflix-gray skeleton"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
