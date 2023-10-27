import './App.css';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [isAddButton, setIsAddButton] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  
  let fieldID = "inputfield_newtodo"

  function updateTodoList(){
    const id = Math.floor(1000 + Math.random() * 9000);
    const value = document.getElementById(fieldID).value;

    let newToDo ={ 
        value, 
        id   
      }

    if(newToDo.value!==""){ 
      if (isAddButton) {
        todos.push(newToDo);
      } else {
        for (let i = 0; i < todos.length; i++) {
          if (todos[i].id === selectedTodoId) {
            todos[i].value = value;
          }
        }
        document.querySelectorAll('tr').forEach((item) => {
          item.classList.remove('active');
        })
        setIsAddButton(true);
        
      }
      setTodos([...todos]);
      document.getElementById(fieldID).value = "";
    }
  }

  function deleteTodo(id) {
    const updatedArray = todos.filter(todo => todo.id !==  id);
    setTodos(updatedArray);
  }

  function updateTodo(id) {
    setIsAddButton(false);
    setSelectedTodoId(id);
    
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        document.getElementById(fieldID).value = todos[i].value; 
      }
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="input-group row justify-content-md-center  ">
          <input id={fieldID} type="text" className="form-control col " placeholder="Neue Aufgabe anlegen" aria-describedby="basic-addon2"></input>
          <div className="input-group-append  col">
            <button onClick={updateTodoList}  className="btn btn-primary btn-lg bi bi-plus-circle">{isAddButton === true ? "add" : "update"}</button>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Beschreibung</th>
              <th scope="col">Bearbeiten</th>
              <th scope="col">Löschen</th>
            </tr>
          </thead>
          <tbody>
          {todos.map( (item, index )=> { 
              return(<tr key={item.id} className={item.id === selectedTodoId ? 'active' : ''}>
                      <th scope="row">{index + 1}</th>
                      <td >{item.id}</td>
                      <td>{item.value}</td>
                      <td ><button className="btn btn-primary" onClick={() => updateTodo(item.id)}>Bearbeiten</button></td>
                      <td ><button className="btn btn-primary" onClick={() => deleteTodo(item.id)}>Löschen</button></td>
                    </tr>)
            })}

          </tbody> 
        </table>
      </div>
    </>
  );
}

export default App;
