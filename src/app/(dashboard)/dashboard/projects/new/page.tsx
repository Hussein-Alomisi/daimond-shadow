import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { ProjectForm } from "@/src/components/dashboard/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <PageHeader
        title="إضافة مشروع جديد"
        subtitle="أدخل بيانات المشروع لإضافته إلى قاعدة البيانات"
      />
      <ProjectForm />
    </div>
  );
}
