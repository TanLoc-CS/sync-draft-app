import React from 'react';
import Button from '@/components/Button';
import TestIcon from '@/assets/icons/TestIcon';

const Home = () => {
  return (
    <div className='container p-4'>
      <header>
        <h1>Sync Draft</h1>
      </header>
      <body>
      <Button label='New document' icon={<TestIcon/>} onClick={() => console.log('New document')}/>

      </body>
    </div>
  )
};

export default Home;