import { PageHeader } from "@/src/components/dashboard/PageHeader";
import { ProjectForm } from "@/src/components/dashboard/ProjectForm";
import { getProjectById } from "@/src/modules/projects/project.service";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="تعديل المشروع"
        subtitle={`تعديل بيانات المشروع: ${project.title}`}
      />
      <ProjectForm
        projectId={id}
        defaultValues={{
          title: project.title,
          category: project.category ?? "",
          image: project.image,
          description: project.description ?? "",
        }}
      />
    </div>
  );
}
