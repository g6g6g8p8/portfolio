import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PageContent, Project } from '../types';
import { storage } from '../lib/storage';
import { ProjectCard } from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const [content, setContent] = useState<PageContent>(storage.getContent());
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setContent(storage.getContent());
    setProjects(storage.getProjects());
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900"
          >
            {content.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-gray-600 max-w-3xl"
          >
            {content.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <Link 
              to="/projects"
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              View all projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
