import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { fundServices, getService } from "@/lib/service-pages";

export function generateStaticParams() {
  return fundServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService("Fund Services", slug);
  if (!service) return { title: "Fund Service" };
  return {
    title: service.title,
    description: service.lead,
  };
}

export default async function FundServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService("Fund Services", slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
