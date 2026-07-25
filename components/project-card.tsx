'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-semibold text-accent mb-2">{project.category}</p>
            <p className="text-xs text-muted-foreground">{project.year}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 text-muted-foreground">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-border">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
