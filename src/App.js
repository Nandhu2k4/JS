import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (editId) {
      setTodos(toDos.map(obj => obj.id === editId ? { ...obj, text: editText } : obj));
      setEditId(null);
      setEditText('');
    } else {
      setTodos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setTodo('');
    }
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleDelete = (id) => {
    setTodos(toDos.filter(obj => obj.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Let's make some wish!!! </h2>
      </div>
      <div className="input">
        <input 
          value={editId ? editText : toDo} 
          onChange={(e) => editId ? setEditText(e.target.value) : setTodo(e.target.value)} 
          type="text" 
          placeholder="🖊️ Add item..." 
        />
        <i onClick={handleAddTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div key={obj.id} className="todo">
            <div className="left">
              <input 
                onChange={(e) => {
                  setTodos(toDos.map(obj2 => obj2.id === obj.id ? { ...obj2, status: e.target.checked } : obj2));
                }} 
                checked={obj.status} 
                type="checkbox" 
                name="" 
                id="" 
              />
              <p style={{ textDecoration: obj.status ? 'line-through' : 'none' }}>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={() => handleEdit(obj.id, obj.text)} className="fas fa-edit"></i>
              <i onClick={() => handleDelete(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;