import { useState, useEffect } from 'react';
import { PageContent, Project } from '../types';
import { storage } from '../lib/storage';

export function Admin() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);

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
    }
  };

  const handleSave = async () => {
    if (!content) return;
    try {
      setSaving(true);
      await storage.saveContent(content);
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  if (!content) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, title: e.target.value }
              })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Subtitle</label>
            <input
              type="text"
              value={content.hero.subtitle}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, subtitle: e.target.value }
              })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About Section</h2>
        <div>
          <label className="block mb-2">Content</label>
          <textarea
            value={content.about.content}
            onChange={(e) => setContent({
              ...content,
              about: { ...content.about, content: e.target.value }
            })}
            rows={6}
            className="w-full p-2 border rounded"
          />
        </div>
      </section>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
