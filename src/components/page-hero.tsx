import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { HeroPhoto } from "./hero-photo";
import { Reveal } from "./reveal";
import { photos, type PhotoKey } from "@/lib/photos";

export function PageHero({
  photoKey,
  eyebrow,
  title,
  description,
}: {
  photoKey: PhotoKey;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  const photo = photos[photoKey];
  return (
    <section className="relative overflow-hidden bg-ink text-ivory min-h-[70vh] flex items-end">
      <HeroPhoto photo={photo} priority scrim="default" />
      <Container width="wide" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <Reveal>
          <Eyebrow tone="bronze">{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal index={1}>
          <h1 className="mt-8 font-display text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-4xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal index={2}>
            <p className="mt-10 max-w-3xl text-lg text-ivory/80 leading-relaxed">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
