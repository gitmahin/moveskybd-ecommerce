import Skeleton from "react-loading-skeleton";

export const ShopLoading = () => {
  return (
    <div className="w-full h-fit grid grid-cols-5  gap-2 ">
      {Array.from({ length: 8 }).map((_, i) => {
        return (
          <div key={i} className="w-full p-1 pt-0 border rounded-lg">
            <Skeleton width={"100%"} height={220} borderRadius={8} />
            <Skeleton width={"100%"} height={20} borderRadius={50} />
            <Skeleton width={150} height={20} borderRadius={50} />
            <Skeleton width={"100%"} height={30} borderRadius={8} />
          </div>
        );
      })}
    </div>
  );
};
