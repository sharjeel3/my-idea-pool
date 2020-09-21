import React from 'react';
import { Skeleton } from './components/Skeleton';
import { Modal } from './components/Modal';
import { Auth } from './components/Auth';

function App() {
  return (
    <>
      <Auth />
      <Modal />
      <Skeleton />
    </>
  );
}

export default App;
