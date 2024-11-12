import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DocumentIcon, HomeIcon } from '@/assets/icons';
import TitleInput from '@/components/TitleInput';
import Editor from '@/components/Editor';
import DraftItem from '@/components/DraftItem';
import { Button } from '@/components/ui/button';
import { SaveIcon } from 'lucide-react';
import useAuth from '@/hook/useAuth';
import { IDraft, useLocalDB } from '@/hook/useLocalDB';
import { toTime } from '@/lib/utils';

const Draft = () => {
  const { docId, draftId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateDraftTitle, openIndexedDB, updateDraft, getDraftById, getDraftsByDocId } = useLocalDB();

  const [draftTitle, setDraftTitle] = useState<string>('Untitled');
  const [content, setContent] = useState<string | null>();
  const [drafts, setDrafts] = useState<IDraft[]>()

  useEffect(() => {
    const fetchDraft = async () => {
      if (!user?.sub) {
        alert('Failed to update draft title! Please try again later...');
        return;
      }
  
      const db = await openIndexedDB(user.sub);
      if (!db || !draftId) {
        alert('Failed to update draft title! Please try again later...');
        return;
      }
      const draft = await getDraftById(db, draftId);
      setDraftTitle(draft?.title || 'Untitled');
      setContent(draft?.content);
    }

    fetchDraft();
  }, [])

  useEffect(() => {
    const fetchDraft = async () => {
      if (!user?.sub) {
        alert('Failed to update draft title! Please try again later...');
        return;
      }
  
      const db = await openIndexedDB(user.sub);
      if (!db || !draftId || !docId) {
        alert('Failed to update draft title! Please try again later...');
        return;
      }
      const draftList = await getDraftsByDocId(db, docId);
      setDrafts(draftList);
    }

    fetchDraft();
  }, [])

  const handleEditorChange = (value: string) => {
    console.log(value)
    setContent(value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDraftTitle(event.target.value);
  }

  const changeTitle = async (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.preventDefault();
    if (!draftId || !user?.sub) {
      alert('Failed to update draft title! Please try again later...');
      return;
    }

    const db = await openIndexedDB(user.sub);

    if (!db) {
      alert('Failed to create new draft! Please try again later...');
      return;
    }

    await updateDraftTitle(db, draftId, draftTitle);
  }

  const handleSaveDraft = async () => {
    if (!user?.sub) {
      alert('Failed to update draft title! Please try again later...');
      return;
    }

    const db = await openIndexedDB(user.sub);

    if (!db || !draftId) {
      alert('Failed to create new draft! Please try again later...');
      return;
    }

    await updateDraft(db, draftId, content || '');
    alert('Saved!');
  }

  const handleReturnToMain = () => {
    navigate(`/document/${docId}`);
    window.location.reload();
  }

  return (
    <div className='container h-screen flex flex-row'>
      {/*Right section*/}
      <div className='w-4/5 h-full p-4 flex flex-col justify-start'>
        <div className='w-full h-[60px] flex flex-row justify-between items-center'>
          {/*Home + Title*/}
          <div className='w-4/5 h-[48px] flex flex-row justify-start items-center'>
            <Button variant="ghost" size="lg">
              <HomeIcon/>
              <a href='/document'>Home</a>
            </Button>
            <TitleInput value={draftTitle} onChange={handleTitleChange} onBlur={changeTitle}/>
          </div>
          <div className='w-1/5 h-[60px] flex flex-row-reverse justify-start items-center overflow-auto'>
          <Button size="lg" onClick={handleSaveDraft}>
            <SaveIcon />
            Save
          </Button>
          </div>
        </div>

        {/*Editor*/}
        <Editor onChange={handleEditorChange} content={content}/>
      </div>
      <aside/>
        {/*Left sidebar section*/}
      <div className='w-1/5 h-full p-4 bg-gray-100 flex flex-col justify-start'>
        <div className='grow-0 w-full h-[168px] flex flex-col justify-between items-center'>
          <Button className='w-full' variant="outline" size="lg" onClick={handleReturnToMain}>
              <DocumentIcon />
              Return to Main
          </Button>
        </div>

        <div className='grow-0 w-full h-[28px] mt-4 text-[20px] font-semibold'>Draft version</div>
        <div className='grow w-full mt-2 rounded-lg flex flex-col justify-start items-start overflow-auto'>
          {drafts && drafts.map(draft => (
            <DraftItem
              docId={docId as string}
              draftId={draft.draftId}
              title={draft.title || 'Untitled'}
              isMerged={false}
              createdAt={toTime(draft.createdAt.toString())}
              content={draft.content}
            />)
          )}
        </div>
      </div>
    </div>
  )
};

export default Draft;