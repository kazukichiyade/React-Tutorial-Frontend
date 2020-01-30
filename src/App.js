import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // useEffect(サーバからgetの際に使う)
  useEffect(() => {
    // サーバーに保存してあるデータをGET
    noteService.getAll().then(initialNotes => setNotes(initialNotes));
  }, []);

  // showAllがtrueかfalseでコンポーネントの表示を変更
  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  // 一つ一つのデータの表示をshowAllのtrueとfalseで表示を管理(変更)
  const rows = () =>
    notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />);

  // newNoteのsubmit時に必要
  const handleNoteChange = event => {
    setNewNote(event.target.value);
  };

  // db.jsonに登録してある同じデータをPOST
  const addNote = event => {
    // デフォルトイベントtrue
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    };

    noteService.create(noteObject).then(data => {
      // 新しい配列で作成
      setNotes(notes.concat(data));
      // Post後formは空にする
      setNewNote('');
    });
  };

  // データの更新
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
      })
      // エラーメッセージ
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  );
};

export default App;
