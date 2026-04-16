"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined;
  fallbackSrc?: string;
}

export function SafeImage({ 
  src, 
  fallbackSrc = "/images/placeholder.jpg", 
  alt, 
  ...props 
}: SafeImageProps) {
  const [error, setError] = useState(false);

  // If no source is provided at all, use fallback directly
  const imageSource = (!src || error) ? fallbackSrc : src;

  return (
    <Image
      {...props}
      src={imageSource}
      alt={alt || "الصورة"}
      onError={() => {
        if (!error) setError(true);
      }}
    />
  );
}
