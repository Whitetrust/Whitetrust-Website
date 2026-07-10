import Image from "next/image";
import type { Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

export function HeroPhoto({
  photo,
  priority = false,
  scrim = "default",
  zoom = true,
  className,
  sizes = "100vw",
}: {
  photo: Photo;
  priority?: boolean;
  scrim?: "default" | "strong" | "soft" | "none";
  zoom?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      <div className={cn("absolute inset-0", zoom && "cawt-slow-zoom")}>
        <Image
          src={photo.url}
          alt=""
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", photo.focal ?? "object-center")}
        />
      </div>
      {scrim !== "none" && (
        <div
          className={cn(
            "absolute inset-0",
            scrim === "default" &&
              "bg-gradient-to-b from-ink/85 via-ink/70 to-ink/95",
            scrim === "strong" && "bg-ink/85",
            scrim === "soft" &&
              "bg-gradient-to-b from-ink/60 via-ink/45 to-ink/85"
          )}
        />
      )}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 25%, #C9A876 0%, transparent 55%)",
        }}
      />
    </div>
  );
}

export function PhotoBand({
  photo,
  height = "tall",
  scrim = "soft",
  className,
}: {
  photo: Photo;
  height?: "tall" | "medium" | "thin";
  scrim?: "default" | "strong" | "soft" | "none";
  className?: string;
}) {
  const h =
    height === "tall"
      ? "h-[60vh] md:h-[70vh]"
      : height === "medium"
      ? "h-[40vh] md:h-[50vh]"
      : "h-[28vh]";
  return (
    <div className={cn("relative w-full overflow-hidden", h, className)}>
      <Image
        src={photo.url}
        alt={photo.alt}
        fill
        sizes="100vw"
        className={cn("object-cover", photo.focal ?? "object-center")}
      />
      {scrim !== "none" && (
        <div
          className={cn(
            "absolute inset-0",
            scrim === "default" && "bg-ink/55",
            scrim === "strong" && "bg-ink/75",
            scrim === "soft" && "bg-ink/35"
          )}
        />
      )}
    </div>
  );
}
