import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';

import NotesApp from './miniApps/NotesApp';
import StopwatchApp from './miniApps/StopwatchApp';
import ImageGalleryApp from './miniApps/ImageGalleryApp';

function App() {
  const [miniApp, setMiniApp] = useState<number>(0);

  const handleMiniAppChange = (miniAppId: number) => {
    setMiniApp(miniAppId);
  };

  const MiniAppsBackgroundURL =
    'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <>
      <Toaster />
      <Navbar handleMiniAppChange={handleMiniAppChange} />
      {miniApp === 0 && (
        <div
          style={{
            backgroundImage: `url(${MiniAppsBackgroundURL})`,
          }}
          className='bg-center bg-cover bg-no-repeat h-screen'
        />
      )}
      {miniApp === 1 && <NotesApp />}
      {miniApp === 2 && <StopwatchApp />}
      {miniApp === 3 && <ImageGalleryApp />}
    </>
  );
}

export default App;

