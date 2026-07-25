'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <div className="sticky top-0 flex justify-end p-4 bg-card/95 backdrop-blur border-b border-border">
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground mb-3">
                      {project.category}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                  </div>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>
              </div>

              {/* Image placeholder */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <p className="text-muted-foreground">Project showcase</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary rounded-full text-sm text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-semibold hover:bg-secondary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
