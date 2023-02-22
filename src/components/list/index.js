import './style.css';
import { useState } from "react";
import React from 'react';
import { v4 as uuid } from "uuid";

function Lists(){
  const buttons = [
    {
      type: "todo",
      label: "To Do",
    },
    {
      type: "done",
      label: "Done",
    },
    {
      type: "trash",
      label: "Trash",
    },
  ];

    const itemsData = [
        {
          key: uuid(),
          label: "Write Essay",
          isDone: false,
          delete: false
        },
        {
          key: uuid(),
          label: "One Hour CSS Course Online",
          isDone: false,
          delete: false
        },
        {
          key: uuid(),
          label: "Buy One Way Tickets to San Fransico",
          isDone: false,
          delete: false
        },
        {
          key: uuid(),
          label: "Go to Gym",
          isDone: false,
          delete: false
        },
        {
          key: uuid(),
          label: "Buy Groceries",
          isDone: false,
          delete: false
        }
      ];

    const [isModalShown, setModalShown] = useState(false);

    const [type, setType] = useState("todo");

    const [deleteModal, setDeleteModal] = useState(false);
    
    const openModal = () => {
        setModalShown(!isModalShown)
    }

    const trashModal = () => {
      setDeleteModal(!deleteModal)
  }

    const [input, setInput] = useState("");
    const [items, setItems] = useState(itemsData);

    const handleChange = e => setInput(e.target.value);
    
    const handleSubmit = () => {
        const newItem = {
            key: uuid(),
            label: input
        }
        setItems([...items, newItem]) };

    const handleDone = (keyFromButton) => {
      const index = items.findIndex(item => item.key === keyFromButton)
      const oldObject = items[index]
      const newObject = {...oldObject}
      newObject.isDone = !oldObject.isDone
      const leftPart = items.slice(0, index)
      const rightPart = items.slice(index+1, items.length)
      const newItems = [...leftPart, newObject, ...rightPart]
      setItems(newItems)
    }

    const handleDelete = (keyFromButton) => {
      const index = items.findIndex(item => item.key === keyFromButton)
      const oldObject = items[index]
      const newObject = {...oldObject}
      newObject.delete = !oldObject.delete
      const leftPart = items.slice(0, index)
      const rightPart = items.slice(index+1, items.length)
      const newItems = [...leftPart, newObject, ...rightPart]
      setItems(newItems)
    } 

    const handleDeleteForever = (keyFromButton) => {
      const index = items.findIndex(item => item.key === keyFromButton)
      const leftPart = items.slice(0, index)
      const rightPart = items.slice(index+1, items.length)
      const newItems = [...leftPart, ...rightPart]
      setItems(newItems)
    } 


    const handleStatus = (typeFromButton) => {
      setType(typeFromButton)
    }

    const filteredItems = items.filter(item => {
        if (type === "todo") return !item.delete
        if (type === "done") return item.isDone && !item.delete;
        if (type === "trash") return item.delete;
    })
    

return(
    <>
     <div className='buttons'>
            <div className="pager">
            {buttons.map((itemB) => (
            <button
              key={itemB.type}
              className='todo_buttons' onClick={()=>handleStatus(itemB.type)}>
              {itemB.label}
            </button>))}
           </div>
           <div className="modal">
               <button className='plus_button' onClick={openModal}><img className="plus_img" src={require('../images/Plus.png')}/></button>
               {isModalShown && (
                <div className="modal_add">
                  <p className='add_title'>Add New To Do</p>
                  <input 
                  placeholder='Your text' 
                  className="add_input" 
                  value={input}
                  onChange={handleChange}>
                  </input>
                  <button 
                  className='add_button' 
                  onClick={handleSubmit}>Add</button>
               </div>
              )}
          </div>
    </div>
    <h1 className='headerName'>{(type === "todo") ? "To Do" : (type === "done") ? "Done" : (type === "trash") ? "Trash" : "Я не знаю такой раздел!"}</h1> 
    <hr></hr>
    <ul className="todo-list">
    {filteredItems.map((item) => (
        <div className="item-list">
          <span className='list__more' onClick={trashModal}><img className="plus_img" src={require('../images/more.png')}/></span>
          {deleteModal && !item.delete &&(
              <button className='list_trash' onClick={() => handleDelete (item.key)}><img src={require('../images/trash.png')}/>  Move to Trash</button>
          )}
          {deleteModal && item.delete &&(
            <div className='trashButton'>
              <button className="toDoBtn" onClick={() => handleDeleteForever(item.key)}><img src={require('../images/trash.png')}/> Delete Forever</button>
              <button className="toDoBtn" onClick={() => handleDelete (item.key)}><img src={require('../images/moveback.png')}/> Move Back To To Do</button>
          </div>
          )}
        <input type="checkbox"
                className="todo-checkbox"
                onChange={() => handleDone (item.key)}/>
                <p style={{textDecoration: item.isDone ? "line-through" : "none"}}>{item.label}</p>
        </div>
        ))}
      </ul>
</>
    )
}

export default Lists;