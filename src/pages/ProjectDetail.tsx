import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Project } from '../types';
import { storage } from '../lib/storage';
import { motion } from 'framer-motion';

export function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      const projects = await storage.loadProjects();
      const foundProject = projects.find((p: Project) => p.id === id);
      setProject(foundProject || null);
      setLoading(false);
    };
    loadProject();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{project.description}</p>
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
}
