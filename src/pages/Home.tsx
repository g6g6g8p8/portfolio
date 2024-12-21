import { useEffect, useState } from 'react';
import { PageContent, Project } from '../types';
import { storage } from '../lib/storage';

export function Home() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contentData, projectsData] = await Promise.all([
        storage.loadContent(),
        storage.loadProjects()
      ]);
      setContent(contentData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !content) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{content.hero.title}</h1>
        <p className="text-xl text-gray-600">{content.hero.subtitle}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map(project => (
            <div key={project.id} className="border rounded-lg p-4">
              <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
