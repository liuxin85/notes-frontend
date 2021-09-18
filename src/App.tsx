import React, { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/Note/Note";
// import axios from "axios";
import DUMMY_NOTES from "./DUMMY_NOTES";
import INote from "./interfaces/note.inferface";

function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);

  // App components renders the first time
  useEffect(() => {
    const listFromStorageString = localStorage.getItem("my-notes");
    if (listFromStorageString) {
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNotesList(listFromStorageArray);
    } else {
      setNotesList(DUMMY_NOTES);
    }
  }, []);

  useEffect(() => {
    console.log("save to localstrage");
    const notesListString = JSON.stringify(notesList);
    localStorage.setItem("my-notes", notesListString);
  }, [notesList]);

  // getNotes fuctions
  // const getNotes = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/notes");

  //     setNotesList(response.data.notes);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const updateNoteItem = (updatedNote: INote) => {
    console.log("value updated in the app components");
    console.log(updatedNote);

    // temporary variable
    const updatedList = notesList.map((noteItem: INote) => {
      if (noteItem._id === updatedNote._id) {
        return updatedNote;
      }
      return noteItem;
    });
    console.log(updatedList);
    setNotesList(updatedList); // updating the state of noteslist
  };

  return (
    <div className="App">
      <div className="notes-list">
        {notesList.map((noteItem, index) => {
          return (
            <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
