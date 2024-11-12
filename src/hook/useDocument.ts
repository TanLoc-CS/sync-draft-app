import { useState } from 'react'
import useAuth from './useAuth';
import axios from 'axios';
import { Document } from '@/types/document';

const useDocument = () => {
  const baseUri = import.meta.env.VITE_API_ENDPOINT;
  const { getToken } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [documentErr, setDocumentErr] = useState<any>(null);

  const getDocuments = async (whose: string): Promise<Document[] | any> => {
    setLoading(true);
    setDocumentErr(null);

    try {
      const token = await getToken();

      const response = await axios.get<Document[]>(
        `${baseUri}/documents?q=${whose}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )

      return response.data;
    } catch (error) {
      console.error(`Error occurs while getting documents: ${error}`);
      setDocumentErr(error);
    } finally {
      setLoading(false);
    }
  }

  const getDocumentById = async (docId: string): Promise<Document | any> => {
    setLoading(true);
    setDocumentErr(null);

    try {
      const token = await getToken();

      const response = await axios.get<Document>(
        `${baseUri}/documents/${docId}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )

      return response.data;
    } catch (error) {
      console.error(`Error occurs while getting document: ${error}`);
      setDocumentErr(error);
    } finally {
      setLoading(false);
    }
  }

  const createDocument = async () => {
    setLoading(true);
    setDocumentErr(null);

    try {
      const token = await getToken();

      const response = await axios.post<Document>(
        `${baseUri}/documents`,
        {},
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )
      
      console.log(`Created document: ${response.data._id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error occurs while creating document: ${error}`);
      setDocumentErr(error);
    } finally {
      setLoading(false);
    }
  }

  const updateDocTitle = async (docId: string, newTitle: string) => {
    setLoading(true);
    setDocumentErr(null);

    try {
      const token = await getToken();

      const response = await axios.put<Document>(
        `${baseUri}/documents/${docId}`,
        {
          newTitle: newTitle
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )
      
      console.log(`Updated document: ${response.data._id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error occurs while update doc title: ${error}`);
      setDocumentErr(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    documentErr,
    getDocumentById,
    getDocuments,
    createDocument,
    updateDocTitle
  }
}

export default useDocument