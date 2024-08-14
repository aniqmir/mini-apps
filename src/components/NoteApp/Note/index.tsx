import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

const Note = ({ note, value, handleDeleteNote, handleNoteTextChange }: any) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, [note]);

  return (
    <div
      className={`w-64 h-64 relative transition opacity-0 scale-0 ${
        animate && 'opacity-100 scale-95'
      }`}
    >
      <textarea
        className={`m-1 px-5 py-5 w-64 h-64 ${note.colors.background} ${note.colors.text} rounded-lg resize-none`}
        value={value}
        id={note.id}
        onChange={(e) => handleNoteTextChange(note.id, e.target.value)}
      />
      <button
        onClick={() => handleDeleteNote(note.id)}
        className='absolute right-0 bottom-0 text-2xl text-slate-50'
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default Note;
