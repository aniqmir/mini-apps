import { useState } from 'react';
import Navbar from './components/Navbar';
import NotesApp from './miniApps/NotesApp';

function App() {
  const [miniApp, setMiniApp] = useState<number>(0);

  const handleMiniAppChange = (miniAppId: number) => {
    setMiniApp(miniAppId);
  };

  return (
    <>
      <Navbar handleMiniAppChange={handleMiniAppChange} />
      {miniApp === 1 && <NotesApp />}
    </>
  );
}

export default App;

