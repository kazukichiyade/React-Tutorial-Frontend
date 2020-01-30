import React from 'react';

// 項目(データ一つずつ)の共通コンポーネント
const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
