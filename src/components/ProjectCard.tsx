import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group cursor-pointer"
      >
        <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{project.client} • {project.year}</p>
          {project.categories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <span
                  key={category}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
