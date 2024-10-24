import React, { useState } from 'react';

import Button, { ButtonColor, ButtonSize } from '@/components/Button';
import SearchInput from '@/components/SearchInput';

import { PlusIcon } from '@/assets/icons';
import Card from '@/components/Card';

export interface IDocument {
  id: string,
  title: string,
  sharedBy?: string
}

// Placeholder data for documents
const myDocuments = [
  { id: '1', title: 'Research Paper Draft' },
  { id: '2', title: 'Literature Review' },
  { id: '3', title: 'Project Proposal' },
  { id: '1', title: 'Research Paper Draft' },
  { id: '2', title: 'Literature Review' },
  { id: '3', title: 'Project Proposal' },
  { id: '1', title: 'Research Paper Draft' },
  { id: '2', title: 'Literature Review' },
  { id: '3', title: 'Project Proposal' },
  { id: '1', title: 'Research Paper Draft' },
  { id: '2', title: 'Literature Review' },
  { id: '3', title: 'Project Proposal' },
]

const sharedDocuments = [
  { id: '4', title: 'Team Meeting Notes', sharedBy: 'John Doe' },
  { id: '5', title: 'Collaborative Study', sharedBy: 'Jane Smith' },
]

const Home = () => {
  const [activeTab, setActiveTab] = useState<string>('mine');
  const [myDocs, setMyDocs] = useState<IDocument[]>(myDocuments);
  const [sharedDocs, setSharedDocs] = useState<IDocument[]>(sharedDocuments);
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const filterDocs = () => {
    if (activeTab === 'mine') {
      return myDocs.filter(doc => ( searchTerm !== ''?
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) :
        true
      ));
    };

    return sharedDocs.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className='container h-screen p-4 flex flex-col justify-start items-center'>
      <header className='w-full h-auto flex flex-row justify-start items-center'>
        <h1 className='text-[40px] font-bold'>Sync Draft</h1>
      </header>
      <main>
        <div className='w-[600px] h-auto mt-4 flex flex-row justify-between items-center'>
          <SearchInput value={searchTerm} onChange={handleSearchChange} />
          <Button label='New document' icon={<PlusIcon fill='white'/>} size={ButtonSize.lg} color={ButtonColor.black} onClick={() => console.log('New document')}/>
        </div>

        {/*Tabs toggle*/}
        <div className='w-[600px] h-[48px] bg-gray-200 rounded-lg flex flex-row justify-evenly items-center mt-4'>
          <div 
            className={`w-[280px] h-[32px] rounded-lg flex justify-center items-center cursor-pointer ${activeTab === 'mine'? 'bg-white':'bg-transparent text-gray-500'}`}
            onClick={() => setActiveTab('mine')}
          >
            My documents
          </div>
          <div 
            className={`w-[280px] h-[32px] rounded-lg flex justify-center items-center cursor-pointer ${activeTab === 'shared'? 'bg-white':'bg-transparent text-gray-500'}`}
            onClick={() => setActiveTab('shared')}
          >
            Shared with me
          </div>
        </div>

        {/*Cards Grid*/}
        <div className='w-[600px] h-[720px] overflow-y-scroll mt-4 grid grid-cols-2 gap-4 justify-items-center content-start'>
          {filterDocs().map(doc => (
            !doc.sharedBy?
              (<Card docId={doc.id} title={doc.title} key={Math.random()}/>) :
              (<Card docId={doc.id} title={doc.title} sharedBy={doc.sharedBy} key={Math.random()}/>)
          ))}
        </div>
      </main>
    </div>
  )
};

export default Home;