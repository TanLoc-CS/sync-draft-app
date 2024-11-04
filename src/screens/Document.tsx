import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Select from 'react-select';

import { BranchIcon, CloseIcon, CompareIcon, DocumentIcon, HomeIcon, LeftArrowIcon, MergeIcon, ShareIcon } from '@/assets/icons';
import TitleInput from '@/components/TitleInput';
import Editor from '@/components/Editor';
import { UserBubble } from '@/components/UserBubble';
import Draft, { DraftProps } from '@/components/Draft';
import Merge from '@/components/Merge';
import { Button } from '@/components/ui/button';

import 'react-quill/dist/quill.snow.css';

const collaborators = [
  { userId: '1', name: 'one'},
  { userId: '1', name: 'one'},
  { userId: '1', name: 'one'},
  { userId: '1', name: 'one'},
]

const drafts: DraftProps[] = [
  {draftId: '1', draftTitle: 'Test draft', updatedAt: '2 hours ago', isMerged: false},
  {draftId: '2', draftTitle: 'Test merged draft', updatedAt: '2 hours ago', isMerged: true},
]

const options = [
  {value: 'Draft 1', label: 'Draft 1'},
  {value: 'Draft 2', label: 'Draft 2'},
  {value: 'Draft 3', label: 'Draft 3'},
];

Modal.setAppElement('#root');

const Document = () => {
  const navigate = useNavigate();
  let { docId } = useParams();

  const [docTitle, setDocTitle] = useState<string>('Untitled');
  const [content, setContent] = useState<any>();
  const [mergeIsOpen, setMergeIsOpen] = useState<boolean>(false);
  const [selection, setSelection] = useState<{ value: string; label: string } | null>(null);

  const openMergeModal = () => {
    setMergeIsOpen(true);
  }

  const closeMergeModal = () => {
    setMergeIsOpen(false);
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

  const handleConfirmMerge = () => {
    alert('Merge succesfully');
    closeMergeModal();
  }

  const handleShare = () => {
    if (!docId) {
      alert('Failed to share link! Please try again later...');
      return;
    }
    navigator.clipboard.writeText(`http://localhost:5173/document/${docId}`);
    alert('Copied link to this document!');
  }

  return (
    <div className='container h-screen flex flex-row'>
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
              options={options}
            />
          </div>

          {/*Comparing 2-board*/}
            <div className='grow w-full my-4 flex flex-row justify-between items-center'>
              {/*Current main version */}
              <div className='w-[47.5%] h-full border rounded-lg'>

              </div>
              {/*After merge version */}
              <div className='w-[47.5%] h-full border rounded-lg'>

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
            <Button variant="ghost" size="lg" onClick={() => navigate('/document')}>
              <HomeIcon/>
              Home
            </Button>
            <TitleInput value={docTitle} onChange={handleTitleChange}/>
          </div>
          {/*Collaborators*/}
          <div className='w-1/5 h-[60px] flex flex-row-reverse justify-start items-center overflow-auto'>
            {collaborators.map(c => <UserBubble/>)}
          </div>
        </div>

        {/*Editor*/}
        <Editor onChange={handleEditorChange} content={content}/>
      </div>
      <aside/>
        {/*Left sidebar section*/}
      <div className='w-1/5 h-full p-4 bg-gray-100 flex flex-col justify-start'>
        <div className='grow-0 w-full h-[168px] flex flex-col justify-between items-center'>
          <Button className='w-full' variant="outline" size="lg" onClick={() => console.log('main')}>
            <DocumentIcon />
            Return to Main
          </Button>
          <Button className='w-full' variant="outline" size="lg" onClick={handleShare}>
            <ShareIcon />
            Share document
          </Button>
          <Button className='w-full' variant="outline" size="lg" onClick={() => console.log('main')}>
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
          {drafts.map(draft => (
            <Draft 
              draftId={draft.draftId}
              draftTitle={draft.draftTitle}
              isMerged={draft.isMerged}
              updatedAt={draft.updatedAt}
            />)
          )}
        </div>

        <div className='grow-0 w-full h-[28px] mt-4 text-[20px] font-semibold'>Recent merges</div>
        <div className='grow w-full mt-2 rounded-lg flex flex-col justify-start items-start overflow-auto'>
          {drafts.map(draft => (
            <Draft 
              draftId={draft.draftId}
              draftTitle={draft.draftTitle}
              isMerged={draft.isMerged}
              updatedAt={draft.updatedAt}
            />)
          )}
        </div>
      </div>
    </div>
  )
};

export default Document;