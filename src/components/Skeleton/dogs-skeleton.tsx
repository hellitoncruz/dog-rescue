import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DogCardSkeleton() {
  return (
    <Card className="overflow-hidden card">
      <CardContent className="p-0">
        <div className="flex skeleton-container">
          <div className="relative h-64 md:h-auto w-1/3">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="flex flex-col justify-between p-6 w-2/3">
            <div>
              <div className="mt-2 flex flex-wrap justify-between items-center">
                <Skeleton className="h-7 w-[150px] mb-2" />
                <Skeleton className="h-5 w-[100px]" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-6 w-[180px] mb-2" />
                <Skeleton className="h-6 w-[150px] mb-4" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-[90%] mb-1" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
            <div className="mt-6">
              <Skeleton className="h-10 w-[150px]" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
