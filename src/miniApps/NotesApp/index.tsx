import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

// icons
import { MdAdd, MdSave } from 'react-icons/md';
import { CiBatteryEmpty } from 'react-icons/ci';

import Note from '../../components/NoteApp/Note';

interface NoteType {
  id: number;
  colors: {
    background: string;
    text: string;
  };
}

type TextValuesType = {
  [key: number]: string; // or [key: 1 | 2 | 3]: string for specific keys
};

const noteBackgroundColors = [
  { background: 'bg-red-950', text: 'text-orange-50' },
  { background: 'bg-cyan-900', text: ' text-cyan-200' },
  { background: 'bg-green-300', text: ' text-green-950' },
  { background: 'bg-yellow-300', text: ' text-yellow-900' },
];

const NotesApp = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const [textValues, setTextValues] = useState<TextValuesType>({});

  const [animate, setAnimate] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const savedData =
      localStorage.getItem('savedNotes') ||
      JSON.stringify({ notes: [], textValues: {} });

    const parsedSavedData = JSON.parse(savedData);

    setNotes(parsedSavedData.notes);
    setTextValues(parsedSavedData.textValues);
  }, []);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 400); // Reset animation state after duration
    return () => clearTimeout(timeout);
  }, [notes]); // Trigger effect when notes array changes

  const handleNoteTextChange = (id: number, value: string) => {
    setTextValues({
      ...textValues,
      [id]: value,
    });
  };

  const generateRandomColorIndex = () => {
    const num = Math.random() * (noteBackgroundColors.length - 0) + 0;
    return Math.floor(num);
  };

  const handleAddNotes = () => {
    const newId = notes.length > 0 ? notes[0].id + 1 : 1;
    setNotes([
      {
        id: newId,
        colors: noteBackgroundColors[generateRandomColorIndex()],
      },
      ...notes,
    ]);
  };

  const saveNotes = () => {
    try {
      localStorage.setItem(
        'savedNotes',
        JSON.stringify({
          notes,
          textValues,
        }),
      );
      toast.success('Saved Successfully');
    } catch {
      toast.error('Some error occurred');
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
    setTextValues((prev) => ({
      ...prev,
      [id]: '',
    }));
  };

  // Filter items based on the search query
  const filteredNotes = notes.filter(
    (item) =>
      !searchQuery ||
      textValues[item.id]?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='m-10'>
      <div className='flex py-10 justify-start'>
        <p className='text-3xl text-slate-900 mr-5'>Notes</p>
        <div className='flex justify-between w-full'>
          <button
            onClick={handleAddNotes}
            className='w-10 h-10 flex justify-center items-center rounded-full transition-all bg-slate-900 hover:bg-slate-700'
          >
            <MdAdd color='white' />
          </button>

          <button
            onClick={saveNotes}
            className='w-10 h-10 flex justify-center items-center rounded-full transition-all bg-slate-900 hover:bg-slate-700'
          >
            <MdSave color='white' />
          </button>
        </div>
      </div>
      <div className='pb-10'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search notes...'
          className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
        />
      </div>
      <div>
        {filteredNotes.length === 0 && (
          <div className='flex flex-col justify-center items-center'>
            <div>
              <CiBatteryEmpty size={100} />
            </div>
            <p className='text-2xl text-slate-900'>
              {notes.length === 0 || searchQuery === ''
                ? 'No Notes...'
                : 'Try another search'}
            </p>
          </div>
        )}
      </div>
      <div className='grid justify-center sm:grid-cols-4 lg:grid-cols-4 gap-y-5 sm:gap-y-10'>
        {filteredNotes.map((singleNote) => (
          <Note
            animate={animate}
            note={singleNote}
            key={singleNote.id}
            value={textValues[singleNote.id]}
            handleDeleteNote={handleDeleteNote}
            handleNoteTextChange={handleNoteTextChange}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
