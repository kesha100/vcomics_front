"use client";

import { useEffect, useState } from "react";
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

const ImageGallery: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const imageUrls = [
    "https://jzfstrhyaxuupvfyibws.supabase.co/storage/v1/object/public/vcomics/panel-2-1721936551298",
    // 'https://jzfstrhyaxuupvfyibws.supabase.co/storage/v1/object/public/vcomics/panel-4-1721936550824',
    "https://jzfstrhyaxuupvfyibws.supabase.co/storage/v1/object/public/vcomics/panel-6-1721936551247",
    "https://jzfstrhyaxuupvfyibws.supabase.co/storage/v1/object/public/vcomics/panel-10-1721936554814",
    "https://jzfstrhyaxuupvfyibws.supabase.co/storage/v1/object/public/vcomics/panel-8-1721936556771",
    "https://jzfstrhyaxuupvfyibws.supabase.co/storage/v1/object/public/vcomics/panel-11-1721936557770",
    "https://jzfstrhyaxuupvfyibws.supabase.co/storage/v1/object/public/vcomics/panel-5-1721936557956",
    // Add more URLs as needed
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    console.log({ current });
    // window.open(imageUrl, "_blank");
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/background.png')] bg-bottom bg-repeat-x">
      <header className="flex items-center justify-between px-6 h-14 bg-[#1E0018]">
        <a href="#" className="text-white font-bold text-xl">
          VCOMICS
        </a>
        <a href="#" className="text-white hover:underline">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.99 3.65 9.12 8.4 9.88V15.8h-2.5v-2.8h2.5V10c0-2.54 1.54-3.94 3.8-3.94 1.1 0 2.05.08 2.33.12v2.71h-1.6c-1.26 0-1.5.6-1.5 1.47v1.93h2.92l-.38 2.8h-2.54V22C18.35 21.12 22 16.99 22 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </a>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-adventure uppercase text-[#1E0018]">
          Image Gallery
        </h1>

        <Carousel
          setApi={setApi}
          className="w-full max-w-md flex flex-col gap-2"
        >
          {/* <div className="absolute -inset-4 bg-cover bg-center bg-[url('/comics-background.png')]"></div> */}
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col gap-2">
                  <Card className="relative">
                    <div className="aspect-square">
                      <Image
                        src={url}
                        alt=""
                        className="object-cover z-10"
                        width={1024}
                        height={1024}
                      />
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <button
            className="px-3 relative py-2 shadow-md text-white text-lg bg-[#BB1215] hover:bg-[#BB1215]/80 font-adventure stroke-black stroke-2"
            onClick={() => handleDownload()}
          >
            <Image
              src="/button-background.png"
              alt=""
              className="object-cover absolute inset-0"
              fill
            />
            <span className="relative">Download</span>
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

        {/* Modal for displaying selected image */}
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
                onClick={() => handleDownload(selectedImage)}
              >
                Download
              </button>
            </div>
          </div>
        )}

        <Link href="/loading" passHref>
          <button className="mt-8 text-[#1E018]">Back to Upload Page</button>
        </Link>
      </main>
    </div>
  );
};

export default ImageGallery;
