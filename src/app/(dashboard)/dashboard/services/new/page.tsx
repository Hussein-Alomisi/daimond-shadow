import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { ServiceForm } from "@/src/components/dashboard/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="إضافة خدمة جديدة"
        subtitle="قم بتعبئة النموذج لإضافة خدمة جديدة إلى الموقع."
      />
      <ServiceForm />
    </div>
  );
}
