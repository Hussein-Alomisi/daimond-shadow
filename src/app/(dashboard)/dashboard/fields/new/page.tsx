import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { FieldForm } from "@/src/components/dashboard/FieldForm";

export default function NewFieldPage() {
  return (
    <div>
      <PageHeader
        title="إضافة مجال جديد"
        subtitle="أدخل بيانات المجال لإضافته إلى قاعدة البيانات"
      />
      <FieldForm />
    </div>
  );
}
