import './App.css';
import { useState } from 'react';

function App() {
  //Initial wird ein leeres Array übergeben => keine Todos vorhanden
  const [todos, setTodos] = useState([]);
  const [isAddButton, setIsAddButton] = useState(true);
  let [textBoxValue, setTextBoxValue] = useState("");
  
  let fieldID = "inputfield_newtodo" //Anhand der Field-ID wird das Eingabefeld erkannt

  function updateTodoList(){
    const id = Math.floor(1000 + Math.random() * 9000);
    const value = document.getElementById(fieldID).value;

    let newToDo ={ 
        value, 
        id   
      }
    
    
    if(newToDo.value!==""){ 
      todos.push(newToDo);
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
              return(<tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td >{item.id}</td>
                      <td>{item.value}</td>
                      <td><i className="bi bi-pencil-square" onClick={ () => updateTodo(item.id)}></i></td>
                      <td><i className="bi bi-trash" onClick={ () => deleteTodo(item.id) }></i></td>
                    </tr>)
                }
              )
            }     
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
