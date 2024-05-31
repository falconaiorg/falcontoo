import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const DrawerCarousel = ({
  content,
  hideArrows,
  clamp,
}: {
  content: React.ReactNode[];
  hideArrows?: boolean;
  clamp?: 3 | 4 | 5
}) => {
  return (
    <Carousel className="z-50 w-9/12">
      <CarouselContent>
        {content.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6 text-sm">
                  <div className={cn({
                    "line-clamp-3": clamp === 3,
                    "line-clamp-4": clamp === 4,
                    "line-clamp-5": clamp === 5,
                  })}>

                  {content}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {!hideArrows && <CarouselPrevious variant={"ghost"} />}
      {!hideArrows && <CarouselNext variant={"ghost"} />}
    </Carousel>
  );
};
