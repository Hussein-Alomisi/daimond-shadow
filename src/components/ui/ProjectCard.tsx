import Image from "next/image";
import { Project } from "@/src/lib/mockData";
import { motion, Variants } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  variants?: Variants;
}

export function ProjectCard({ project, variants }: ProjectCardProps) {
  return (
    <motion.div
      variants={variants}
      className="group relative h-[400px] w-full overflow-hidden rounded-lg shadow-md cursor-pointer border border-transparent transition-colors duration-500 hover:shadow-2xl hover:border-gold/30"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Default Overlay & Hover Darker Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent transition-opacity duration-500 group-hover:from-primary group-hover:via-primary/80 group-hover:to-primary/20" />

      {/* Gold Accent Line (animates on hover) */}
      <div className="absolute top-0 right-0 h-full w-[3px] bg-gold scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100" />
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100" />

      {/* Content Container (Padded) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Hidden initial texts that slide/fade in on hover */}
        <div className="transform translate-y-6 opacity-80 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          
          <span className="text-gold font-semibold text-sm tracking-wider mb-2 block">
            {project.category}
          </span>
          
          <h3 className="text-2xl font-bold text-white mb-2 leading-snug">
            {project.title}
          </h3>
          
          {/* Optional Location */}
          <div className="flex items-center text-white/70 text-sm overflow-hidden h-0 opacity-0 transition-all duration-500 delay-100 group-hover:h-6 group-hover:opacity-100 mt-2">
            {project.location ? (
              <>
                <svg
                  className="w-4 h-4 ml-2 text-gold/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </>
            ) : (
               <span className="text-transparent">N/A</span>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
