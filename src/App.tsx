import { useState } from 'react';

import Navbar from './components/Navbar';

import NotesApp from './miniApps/NotesApp';
import StopwatchApp from './miniApps/StopwatchApp';

function App() {
  const [miniApp, setMiniApp] = useState<number>(0);

  const handleMiniAppChange = (miniAppId: number) => {
    setMiniApp(miniAppId);
  };

  return (
    <>
      <Navbar handleMiniAppChange={handleMiniAppChange} />
      {miniApp === 0 && <div>Mini Apps</div>}
      {miniApp === 1 && <NotesApp />}
      {miniApp === 2 && <StopwatchApp />}
    </>
  );
}

export default App;

