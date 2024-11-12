import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Select from 'react-select';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import * as automerge from '@automerge/automerge';
import axios from 'axios';

import { BranchIcon, CloseIcon, CompareIcon, DocumentIcon, HomeIcon, LeftArrowIcon, MergeIcon, ShareIcon } from '@/assets/icons';
import TitleInput from '@/components/TitleInput';
import Editor from '@/components/Editor';
import { UserBubble } from '@/components/UserBubble';
import DraftItem from '@/components/DraftItem';
import Merge from '@/components/Merge';
import { Button } from '@/components/ui/button';
import { Document as DocumentType } from '@/types/document';
import useDocument from '@/hook/useDocument';
import useAuth from '@/hook/useAuth';
import { IDraft, useLocalDB } from '@/hook/useLocalDB';
import {Merge as TypeMerge} from '@/types/merge';
import { toTime } from '@/lib/utils';
import MergeItem from '@/components/MergeItem';

Modal.setAppElement('#root');

const Document = () => {
  const socketUri = process.env.VITE_SOCKET_ENDPOINT || 'ws://localhost:3030/';
  const apiUri = process.env.VITE_API_ENDPOINT || 'http://localhost:3030/api';

  const { docId } = useParams();
  const navigate = useNavigate();
  const { updateDocTitle, getDocumentById, loading } = useDocument();
  const { user, getToken } = useAuth();
  const { createDraft, openIndexedDB, getDraftsByDocId, getDraftById } = useLocalDB()

  const [socket, setSocket] = useState<Socket | null>();
  const [docTitle, setDocTitle] = useState<string>('Untitled');
  const [content, setContent] = useState<string | null>();
  const [debouncedContent, setDebouncedContent] = useState<string | null>();
  const [mergeIsOpen, setMergeIsOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<{ value: string; label: string } | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[] | null>();
  const [drafts, setDrafts] = useState<IDraft[]>()
  const [mergeOptions, setMergeOptions] = useState<{value: string, label: string}[]>();
  const [mergeDraft, setMergeDraft] = useState<string | null>()
  const [merges, setMerges] = useState<TypeMerge[]>();
  const [mergeViewIsOpen, setMergeViewIsOpen] = useState<boolean>(false);
  const [selectedMerge, setSelectedMerge] = useState<TypeMerge>();

  useEffect(() => {
    const fetchDoc = async () => {
      if (!docId) {
        return;
      }
      const doc: DocumentType = await getDocumentById(docId);
      
      if (doc) {
        setDocTitle(doc.title);
        setContent(doc.content);
      }
    }

    fetchDoc();
  }, [docId])

  useEffect(() => {
    const fetchDraft = async () => {
      if (!user?.sub) {
        alert('Failed to update draft title! Please try again later...');
        return;
      }
  
      const db = await openIndexedDB(user.sub);
      if (!db || !docId) {
        alert('Failed to update draft title! Please try again later...');
        return;
      }
      const draftList = await getDraftsByDocId(db, docId);
      setDrafts(draftList);
      if (draftList)
        setMergeOptions(draftList?.map(draft => ({value: draft.draftId, label: draft.title})))
    }

    fetchDraft();
  }, [])

  useEffect(() => {
    const fetchMerge = async () => {
      try {
        const token = await getToken();
        const response = await axios.get<TypeMerge[]>(
          `${apiUri}/merges/${docId}`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        )

        setMerges(response.data);
      } catch (error: any) {
        console.error(`Error occurs while posting merge: ${error}`);
      }
    }

    fetchMerge();
  }, [])

  // TODO: Fix state handling since it's still mixed up
  useEffect(() => {
    const getAfterMerge = async () => {
      if (!user?.sub) {
        alert('Failed to update draft title! Please try again later...');
        return;
      }
  
      const db = await openIndexedDB(user.sub);
  
      if (!db || !selection?.value) {

        return;
      }
  
      const draft = await getDraftById(db, selection.value);
      const draftContent = automerge.from({ content: draft?.content });
      const mainContent = automerge.from({ content: content });
  
      let afterMergeContent = automerge.merge(draftContent, mainContent);
      console.log(afterMergeContent.content)
      setMergeDraft(afterMergeContent.content);
    }

    getAfterMerge();
  }, [selection, mergeDraft])

  // -----------------------------------------Event listeners--------------------------------------------------
  useEffect(() => {
    if (!user?.sub || loading) {
      console.log('Loading...');
      return;
    }

    const socketInstance = io(socketUri, {
      transports: ['websocket']
    });
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log(`${socketInstance.id} connected, joining room ${docId}`);
      socketInstance.emit('join-doc', { docId: docId, userId: user.sub })
    })

    socketInstance.on('online-users', (users: string[]) => {
      setOnlineUsers(users);
      console.log(`Online users: ${users}`);
    })

    socketInstance.on('doc-change', (change: string) => {
      setContent(change);
    })
    return () => {
      socketInstance.off('connect');
      socketInstance.off('online-users');
      socketInstance.off('doc-change');
    }
  }, [docId, user?.sub])

  // -----------------------------------------Event emmiters--------------------------------------------------
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedContent(content);
    }, 100);

    return () => {
      clearTimeout(timeOut);
    }
  }, [content]);
  
  useEffect(() => {
    if (!socket || !debouncedContent) return;

    socket.emit('edit-doc', { docId: docId, content: debouncedContent});
  }, [debouncedContent, socket]);

  const leaveDoc = () => {
    if (!socket || !user?.sub) return;

    socket.emit('leave-doc',  {docId: docId, userId: user.sub});
  }
  // ---------------------------------------------------------------------------------------------------------

  const openMergeModal = () => {
    setMergeIsOpen(true);
  }

  const openMergeView = () => {
    setMergeViewIsOpen(true);
  }

  const closeMergeModal = () => {
    setMergeIsOpen(false);
  }

  const closeMergeView = () => {
    setMergeViewIsOpen(false);
  }

  const handleChange = (newValue: { value: string; label: string } | null) => {
    setSelection(newValue);
  };

  const handleEditorChange = (value: string) => {
    console.log(value)
    setContent(value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocTitle(event.target.value);
  }

  const changeTitle = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.preventDefault();
    if (!docId) {
      return;
    }
    updateDocTitle(docId, docTitle);
  }

  const handleConfirmMerge = async () => {
    alert('Merge succesfully');
    if (!socket) return;

    socket.emit('edit-doc', { docId: docId, content: mergeDraft});

    try {
      const token = await getToken();
      await axios.post<TypeMerge>(
        `${apiUri}/merges/${docId}`,
        {
          before: content,
          after: mergeDraft,
          description: null
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )
    } catch (error: any) {
      console.error(`Error occurs while posting merge: ${error}`);
    }

    setContent(mergeDraft);
    closeMergeModal();
  }

  const handleReturnToMain = () => {
    navigate(`/document/${docId}`);
    window.location.reload();
  }

  const handleShare = () => {
    if (!docId) {
      alert('Failed to share link! Please try again later...');
      return;
    }
    navigator.clipboard.writeText(`http://localhost:5173/document/${docId}`);
    alert('Copied link to this document!');
  }

  const handleCreateDraft = async () => {
    const newDraftId = uuidv4();
    if (!user?.sub) {
      alert('Failed to create new draft! Please try again later...');
      return;
    }
    const db = await openIndexedDB(user.sub);

    if (!db || !docId) {
      alert('Failed to create new draft! Please try again later...');
      return;
    }

    await createDraft(db, docId, newDraftId, content || '');
    navigate(`/draft/${docId}/${newDraftId}`);
    window.location.reload();
  }

  return (
    <div className='container h-screen flex flex-row'>
      <Merge isOpen={mergeViewIsOpen} onRequestClose={closeMergeView}>
        <div className='w-full h-full flex flex-col'>
          {/*Compare differences tittle*/}
          <div className='grow-0 w-full h-fit flex flex-row justify-between items-center'>
            <h1 className='text-[20px] font-semibold'>Compare differences</h1>
            <Button variant="ghost" size="icon" onClick={closeMergeView}>
              <CloseIcon/>
            </Button>
          </div>
          <p className='grow-0 text-gray-500'>
            Review the differences between your draft and the main version before merging.
          </p>

          {/*Comparing 2-board*/}
            <div className='grow w-full my-4 flex flex-row justify-between items-center'>
              {/*Current main version */}
              <div className='w-[47.5%] p-4 h-full border rounded-lg'>
                <Editor content={selectedMerge?.before} editable={false}/>
              </div>
              {/*After merge version */}
              <div className='w-[47.5%] p-4 h-full border rounded-lg'>
                <Editor content={selectedMerge?.after} editable={false}/>
              </div>
            </div>
        </div>
      </Merge>

      <Merge isOpen={mergeIsOpen} onRequestClose={closeMergeModal}>
        <div className='w-full h-full flex flex-col'>
          {/*Compare differences tittle*/}
          <div className='grow-0 w-full h-fit flex flex-row justify-between items-center'>
            <h1 className='text-[20px] font-semibold'>Compare differences</h1>
            <Button variant="ghost" size="icon" onClick={closeMergeModal}>
              <CloseIcon/>
            </Button>
          </div>
          <p className='grow-0 text-gray-500'>
            Review the differences between your draft and the main version before merging.
          </p>

          {/*Compare bar */}
          <div className='grow-0 relative w-full h-[48px] mt-4 py-2 px-4 bg-gray-100 rounded-lg flex flex-row justify-start items-center'>
            <CompareIcon />
            <div className='w-fit h-[36px] mx-4 px-4 bg-white rounded font-normal border flex flex-row justify-center items-center'>
              Main
            </div>
            <LeftArrowIcon />
            <Select
              className='ml-4'
              placeholder='Select draft to merge'
              defaultValue={selection}
              onChange={handleChange}
              options={mergeOptions}
            />
          </div>

          {/*Comparing 2-board*/}
            <div className='grow w-full my-4 flex flex-row justify-between items-center'>
              {/*Current main version */}
              <div className='w-[47.5%] p-4 h-full border rounded-lg'>
                <Editor content={content} editable={false}/>
              </div>
              {/*After merge version */}
              <div className='w-[47.5%] p-4 h-full border rounded-lg'>
                <Editor content={mergeDraft} editable={false}/>
              </div>
            </div>
          {/*Confirm + Cancel buttons */}
          <div className='grow-0 w-full h-fit flex flex-row-reverse justify-start items-center'>
            <Button className='ml-4' onClick={handleConfirmMerge}>
              Confirm
            </Button>
            <Button variant="outline" onClick={closeMergeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Merge>

      {/*Right section*/}
      <div className='w-4/5 h-full p-4 flex flex-col justify-start'>
        <div className='w-full h-[60px] flex flex-row justify-between items-center'>
          {/*Home + Title*/}
          <div className='w-4/5 h-[48px] flex flex-row justify-start items-center'>
            <Button variant="ghost" size="lg">
              <HomeIcon/>
              <a href='/document'>Home</a>
            </Button>
            <TitleInput value={docTitle} onChange={handleTitleChange} onBlur={changeTitle}/>
          </div>
          {/*Collaborators*/}
          <div className='w-1/5 h-[60px] flex flex-row-reverse justify-start items-center overflow-auto'>
            {onlineUsers && onlineUsers.map(user => <UserBubble userId={user}/>)}
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
          <Button className='w-full' variant="outline" size="lg" onClick={handleShare}>
            <ShareIcon />
            Share document
          </Button>
          <Button className='w-full' variant="outline" size="lg" onClick={handleCreateDraft}>
            <BranchIcon />
            Create new Draft
          </Button>
          <Button className='w-full' variant="outline" size="lg" onClick={openMergeModal}>
            <MergeIcon />
            Merge Draft
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

        <div className='grow-0 w-full h-[28px] mt-4 text-[20px] font-semibold'>Recent merges</div>
        <div className='grow w-full mt-2 rounded-lg flex flex-col justify-start items-start overflow-auto'>
          {merges && merges.map(merge => (
            <MergeItem 
              _id={merge._id}
              docId={docId as string}
              mergedBy={merge.mergedBy}
              before={merge.before}
              after={merge.after}
              mergedAt={merge.mergedAt}
              description={merge.description}
              setState={setSelectedMerge}
              openModal={openMergeView}
            />)
          )}
        </div>
      </div>
    </div>
  )
};

export default Document;