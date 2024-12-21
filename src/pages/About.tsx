import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageContent } from '../types';
import { storage } from '../lib/storage';

export function About() {
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await storage.loadContent();
        setContent(data);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading || !content) return <div>Loading...</div>;

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-12">About</h1>
          <div className="prose prose-lg">
            <p>{content.about.content}</p>
          </div>

          {/* Experience */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="space-y-6">
              {content.about.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="font-medium">{exp.role}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
