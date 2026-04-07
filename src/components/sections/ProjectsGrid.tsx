import { MotionDiv } from "../ui/MotionDiv";
import { ProjectCard } from "../ui/ProjectCard";
import { Project } from "@/src/lib/mockData";
import type { Variants } from "framer-motion";

interface ProjectsGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
}

const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function ProjectsGrid({
  projects,
  title = "أحدث أعمالنا",
  subtitle = "نقدم حلول هندسية متطورة تلبي طموحاتك",
}: ProjectsGridProps) {
  return (
    <section className="py-24 px-6 bg-background relative" id="projects-section">
      <div className="container mx-auto max-w-7xl">

        {/* Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span aria-hidden="true" className="w-12 h-px bg-gold" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">{title}</h2>
            <span aria-hidden="true" className="w-12 h-px bg-gold" />
          </div>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </MotionDiv>

        {/* CSS Grid */}
        <MotionDiv
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variants={cardReveal} />
          ))}
        </MotionDiv>

      </div>
    </section>
  );
}
