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
import html2canvas from 'html2canvas';

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

  const handleDownload = async () => {
    if (imageUrls[current - 1]) {
      const url = imageUrls[current - 1];
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `comic_panel_${current}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }
  };

  const loadImage = (url: string) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Failed to load image from ${url}: ${e}`));
      img.src = url;
    });
  };
  const createStrip = async (stripImageUrls: string[]): Promise<HTMLCanvasElement> => {
    console.log("Creating strip with URLs:", stripImageUrls);
  
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      throw new Error("Unable to get 2D context from canvas");
    }
  
    // Fill the background with white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    try {
      const loadedImages = await Promise.all(stripImageUrls.map(loadImage)) as HTMLImageElement[];
      console.log("All images loaded successfully");
  
      const imageWidth = canvas.width / 2;
      const imageHeight = canvas.height / 2;
  
      loadedImages.forEach((img, index) => {
        const x = (index % 2) * imageWidth;
        const y = Math.floor(index / 2) * imageHeight;
        ctx.drawImage(img, x, y, imageWidth, imageHeight);
        console.log(`Drawn image ${index + 1} at (${x}, ${y})`);
      });
  
      console.log("All images drawn on canvas");
    } catch (error) {
      console.error("Error in createStrip:", error);
      // Draw error message on canvas
      ctx.fillStyle = 'red';
      ctx.font = '24px Arial';
      ctx.fillText('Error creating comic strip', 20, 50);
    }
  
    return canvas;
  };
  
  const handleDownloadStrips = async () => {
    if (imageUrls.length === 0) return;
  
    console.log("Starting handleDownloadStrips with imageUrls:", imageUrls);
  
    try {
      for (let i = 0; i < Math.ceil(imageUrls.length / 4); i++) {
        const stripImageUrls = imageUrls.slice(i * 4, (i + 1) * 4);
        if (stripImageUrls.length === 0) continue;
  
        console.log(`Creating strip ${i + 1}`);
        const canvas = await createStrip(stripImageUrls);
        
        console.log(`Canvas created for strip ${i + 1}. Width: ${canvas.width}, Height: ${canvas.height}`);
  
        const dataUrl = canvas.toDataURL('image/png');
        console.log(`Data URL created for strip ${i + 1}. Length: ${dataUrl.length}`);
  
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `comic_strip_${i + 1}.png`;
        link.click();
        console.log(`Download initiated for strip ${i + 1}`);
      }
    } catch (error) {
      console.error("Error in handleDownloadStrips:", error);
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
        <div className="w-full max-w-md flex flex-col gap-2">
          <Carousel setApi={setApi} className="w-full">
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
            <div className="flex gap-2 mt-2">
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
          <div className="flex gap-2">
            <button
              className="flex-1 px-3 relative py-2 shadow-md text-white text-lg bg-[#BB1215] hover:bg-[#BB1215]/80 font-adventure stroke-black stroke-2"
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
            <button
              className="flex-1 px-3 relative py-2 shadow-md text-white text-lg bg-[#BB1215] hover:bg-[#BB1215]/80 font-adventure stroke-black stroke-2"
              onClick={handleDownloadStrips}
            >
              <Image
                src="/button-background.png"
                alt=""
                className="object-cover absolute inset-0"
                fill
              />
              <span className="relative">Download Comic Strips</span>
            </button>
          </div>
        </div>
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
