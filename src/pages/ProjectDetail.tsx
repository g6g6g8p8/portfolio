import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Project } from '../types';
import { storage } from '../lib/storage';
import { motion } from 'framer-motion';

export function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const projects = storage.getProjects();
    const foundProject = projects.find(p => p.id === id);
    setProject(foundProject || null);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-site mx-auto">
          <h1 className="text-2xl dark:text-white">Project not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-site mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h1>
            <div className="flex gap-4 text-gray-600 dark:text-gray-400">
              <span>{project.client}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
          </div>

          <div className="aspect-w-16 aspect-h-9 mb-12 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="max-w-3xl mb-12">
            <p className="text-xl text-gray-600 dark:text-gray-400 whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {project.gallery.length > 0 && (
            <div className="space-y-8">
              {project.gallery.map((item, index) => (
                <div key={index}>
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={`Gallery item ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                  ) : (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={item.url}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
