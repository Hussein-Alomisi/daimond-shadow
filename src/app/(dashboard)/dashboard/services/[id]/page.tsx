import { notFound } from "next/navigation";
import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { ServiceForm } from "@/src/components/dashboard/ServiceForm";
import { getServiceById } from "@/src/modules/services/service.service";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="تعديل الخدمة"
        subtitle={`تعديل تفاصيل خدمة "${service.title}"`}
      />
      <ServiceForm
        serviceId={Number(service.id)}
        defaultValues={{
          title: service.title,
          description: service.description,
          icon: service.icon,
        }}
      />
    </div>
  );
}
