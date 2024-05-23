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
    <Carousel className="w-5/6">
      <CarouselContent>
        {content.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="aspect-square flex items-center justify-center p-6">
                  {content}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {!hideArrows && <CarouselPrevious />}
      {!hideArrows && <CarouselNext />}
    </Carousel>
  );
};
