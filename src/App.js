import './App.css';
import React, { useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

function App() {
  const list = [
    {
      id: 1, 
      name: "Rocky",
      discription : "Meeting with Andrews on dec 1",
      status : "Completed"
    },
    {
      id: 2, 
      name: "Iron Man",
      discription : "Make a perfect suit for spider man",
      status :"Not Completed"
    }
  ]
  const [lists, setList] = useState(list)
  const [updateState, setUpdateState] = useState(-1)
  return (
    <div className="App">
      <div className='crud'>
        <AddList setList = {setList}/>
        <form onSubmit={handleSubmit}>
          <table>
            {
              lists.map((current) => (
              updateState === current.id ? <EditList current={current} lists={lists} setList={setList}/> :
              <tr>
                <td>{current.name}</td>
                <td>{current.discription}</td>
                <td>{current.status}</td>
                <td>
                  <IconButton>
                    <EditIcon className='edit' variant="contained"  onClick={() => handleEdit(current.id)} style={{marginRight:"20px"}} fontSize='small'/>
                  </IconButton>
                  <IconButton>
                    <DeleteIcon color='red' className='delete' variant='contained' onClick={() => handleDelete(current.id)}/>
                  </IconButton>
                  
                </td>
              </tr>
              ))
            }
          </table>
        </form>
      </div>
    </div>
  );
  function handleEdit(id) {
    setUpdateState(id)
  }
  
  function handleDelete(id) {
    const newlist = lists.filter((li) => li.id !== id)
    setList(newlist)
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    const name = event.target.elements.name.value
    const discription = event.target.elements.discription.value
    const status = event.target.elements.status.value
    const newlist = lists.map((li) => (
        li.id === updateState ? {...li, name:name, price:discription, status:status} : li
    ))
  
    setList(newlist)
    setUpdateState(-1)
  }
}


function EditList({current, lists, setList}) {
function handInputname(event) {
  const value = event.target.value;
  const newlist = lists.map((li) => (
      li.id === current.id ? {...li, name :value} : li
  ))

  setList(newlist)
}

function handInputprice(event) {
  const value = event.target.value;
  const newlist = lists.map((li) => (
      li.id === current.id ? {...li, price :value} : li
  ))

  setList(newlist)
}
function handStatus(event) {
  const value = event.target.value;
  const newlist = lists.map((li) => (
      li.id === current.id ? {...li, status : value} : li
  ))

  setList(newlist)
}
return(
  <tr>
      <td><input type="text" onChange={handInputname} name='name' value={current.name}/></td>
      <td><input type="text" onChange={handInputprice} name='discription' value={current.discription}/></td>
      <td><select name="status">
        <option  onChange={handStatus} name='status' value={current.status}>Completed</option>
        <option  onChange={handStatus} name='status' value={current.status}>Not Completed</option>
      </select></td>
      <td><button type='submit'>Update</button></td>
  </tr>
)
}

function AddList({setList}) {
const nameRef = useRef()
const discriptionRef = useRef()
const statusRef = useRef()

function handleSubmit(event) {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const discription = event.target.elements.discription.value;
  const status = event.target.elements.status.value; 
  const newlist = {
      id: 3,
      name,
      discription,
      status
  }
  setList((prevList)=> {
      return prevList.concat(newlist)
  })
  nameRef.current.value = ""
  discriptionRef.current.value = ""
  statusRef.current.value = ""
}
return(
  <form className='addForm' onSubmit={handleSubmit} style={{display:"flex",flexWrap:"wrap",flexDirection:"column",justifyContent:"space-between"}}>
      <input type="text" name="name" placeholder="Enter Name" ref={nameRef}/><br/>
      <input type="text" name="discription" placeholder="discription" ref={discriptionRef}/><br/>
      <select name="status">
        <option  type="text" name='status' ref={statusRef}>Completed</option>
        <option  type="text" name='status' ref={statusRef}>Not Completed</option>
      </select><br/>
      <button type="submit">Add</button>
  </form>
)
}

export default App;
