import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { getService, privateClientServices } from "@/lib/service-pages";

export function generateStaticParams() {
  return privateClientServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService("Private Clients", slug);
  if (!service) return { title: "Private Client Service" };
  return {
    title: service.title,
    description: service.lead,
  };
}

export default async function PrivateClientServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService("Private Clients", slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
