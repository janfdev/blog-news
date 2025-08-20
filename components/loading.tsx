import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="flex md:flex-row flex-col-reverse md:gap-7 gap-5 p-4 shadow-none border-0"
        >
          <div className="md:w-1/2 w-full">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="mt-3 h-7 w-96" />
            <Skeleton className="mt-4 h-20 w-full" />

            <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
              <Skeleton className="h-5 w-40" />
            </div>

            <div className="mt-6 flex items-center space-x-2 md:mt-8">
              <div className="inline-flex items-center font-semibold md:text-base">
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="block">
              <div className="aspect-video overflow-clip rounded-lg border border-border">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}
