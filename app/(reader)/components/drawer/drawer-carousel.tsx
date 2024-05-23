import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export const DrawerCarousel = ({
  content,
  hideArrows,
}: {
  content: React.ReactNode[];
  hideArrows?: boolean;
}) => {
  return (
    <Carousel className="z-50 w-9/12">
      <CarouselContent>
        {content.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6 text-sm">
                  {content}
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
