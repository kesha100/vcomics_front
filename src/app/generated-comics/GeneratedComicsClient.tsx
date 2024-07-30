"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GeneratedComicsClient: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const panelImageUrlsParam = searchParams.get("panelImageUrls");
    if (panelImageUrlsParam) {
      const urls = JSON.parse(panelImageUrlsParam);
      setImageUrls(urls);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDownload = () => {
    if (imageUrls[current - 1]) {
      window.open(imageUrls[current - 1], "_blank");
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {imageUrls.length > 0 ? (
        <Carousel
          setApi={setApi}
          className="w-full max-w-md flex flex-col gap-2"
        >
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col gap-2">
                  <Card className="relative">
                    <div className="aspect-square">
                      <Image
                        src={url}
                        alt={`Comic panel ${index + 1}`}
                        className="object-cover z-10 cursor-pointer"
                        width={1024}
                        height={1024}
                        onClick={() => handleImageClick(url)}
                      />
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <button
            className="px-3 relative py-2 shadow-md text-white text-lg bg-[#BB1215] hover:bg-[#BB1215]/80 font-adventure stroke-black stroke-2"
            onClick={handleDownload}
          >
            <Image
              src="/button-background.png"
              alt=""
              className="object-cover absolute inset-0"
              fill
            />
            <span className="relative">Download Current Panel</span>
          </button>
          <div className="relative flex items-center gap-2">
            <CarouselPrevious
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex-1 text-white bg-[#BB1215] hover:bg-[#BB1215]/80 rounded-none hover:text-white"
              )}
            />
            <CarouselNext
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex-1 text-white bg-[#BB1215] hover:bg-[#BB1215]/80 rounded-none hover:text-white"
              )}
            />
          </div>
        </Carousel>
      ) : (
        <p className="text-[#1E0018] text-xl">No comic panels generated yet.</p>
      )}

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-w-screen-lg w-full mx-auto rounded-lg overflow-hidden shadow-lg relative">
            <img
              src={selectedImage}
              alt="Selected Image"
              className="w-full max-h-[80vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 bg-white text-[#1E0018] px-3 py-1 rounded-lg shadow-md hover:bg-gray-200"
              onClick={handleCloseImage}
            >
              Close
            </button>
            <button
              className="absolute bottom-4 right-4 bg-white text-[#1E0018] px-3 py-1 rounded-lg shadow-md hover:bg-gray-200"
              onClick={() => window.open(selectedImage, "_blank")}
            >
              Download
            </button>
          </div>
        </div>
      )}

      <Link href="/" passHref>
        <button className="mt-8 text-[#1E018] hover:underline">
          Back to Upload Page
        </button>
      </Link>
    </>
  );
};

export default GeneratedComicsClient;