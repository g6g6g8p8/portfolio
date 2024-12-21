import { db } from './firebase';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { PageContent, Project } from '../types';

const CONTENT_DOC_ID = 'main_content';
const PROJECTS_COLLECTION = 'projects';

export const storage = {
  // Content methods
  loadContent: async (): Promise<PageContent> => {
    try {
      const docRef = doc(db, 'content', CONTENT_DOC_ID);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as PageContent;
      }
      throw new Error('No content found');
    } catch (error) {
      console.error('Error loading content:', error);
      throw error;
    }
  },

  saveContent: async (content: PageContent): Promise<void> => {
    try {
      await setDoc(doc(db, 'content', CONTENT_DOC_ID), content);
    } catch (error) {
      console.error('Error saving content:', error);
      throw error;
    }
  },

  // Projects methods
  loadProjects: async (): Promise<Project[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  },

  saveProject: async (project: Project): Promise<void> => {
    try {
      await setDoc(doc(db, PROJECTS_COLLECTION, project.id), project);
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  }
};
