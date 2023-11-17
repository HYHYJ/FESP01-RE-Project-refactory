import { useState, useEffect } from "react";
import { TodoInfo, TodoRegist } from "../_index";
import axios from "axios";
import { useTodoStore } from "./../../store/useTodoStore"; 


const TodoList = () => {
  const {todoItem, setTodoItem,setId ,id } = useTodoStore();
  const [regist, setRegist] = useState(false);
  const [info, setInfo] = useState(false);
  const [IsUpDown, setUpDown] = useState("최신순")

  useEffect(() => {
    initializeTodoList();
  }, []);



  // TodoItem UI에 필요한 데이터 패칭
  const initializeTodoList = async () => {
    try {
      const response = await axios("http://localhost:33088/api/todolist");
      const { items } = response.data;
      
      setTodoItem(items);
    } catch (err) {
      console.error(err);
    }
  };

  // 체크박스 업데이트 시 PATCH 통신
  const updateCheckBox = async (e, id) => {
    const target = e.target;

    try {
      await axios.patch(`http://localhost:33088/api/todolist/${id}`, {
        done: target!.checked,
      });
      initializeTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  // 새로운 글 등록 페이지 토글
  const toggleRegist = () => {
    setRegist(!regist);
  };

  // 새로운 글 등록 페이지 토글
  const toggleInfo = (e) => {
    setInfo(!info);
    
    const target  = e.target
    setId(target.id);
  };
  const handleUpDown =(e) =>{
    const value : string = e.target.value
    
    const newList = ()=> todoItem.sort(function(a,b) {
      return new Date (b.createdAt) - new Date (a.createdAt);
    });
    const oldList = () =>todoItem.sort(function(a,b) {
      return new Date(a.createdAt) - new Date(b.createdAt)
    });

 
    
    if(value === '최신순'){
      setUpDown('최신순')
      return setTodoItem(newList())
    }else if(value === '등록순'){
      setUpDown('등록순')
      return setTodoItem(oldList())
    }
  }


  return (
    <div>
      <div className="contents-containe r">
        <div className="list-container">
         
          <select  onClick={handleUpDown} className='sorting'>
            <option>최신순</option>
            <option>등록순</option>
          </select>
          <button className="regist-button" onClick={toggleRegist}>
            할 일 추가하기
          </button>
          <ul className="todolist">
            {todoItem.map((item) => (
              <li
                key={item._id}
                id={item._id}
                className="todo-item"
              >
                <input
                  className="checkbox-item"
                  type="checkbox"
                  checked={item.done}
                  onChange={(e) => updateCheckBox(e, item._id)}
                />
               <span id={item._id}
                  onClick={toggleInfo}
                  className={item.done ? "checked title-item" : "title-item"}
                >
                  {item.title}
               </span>
               <span className='createdAt'>
                {item.createdAt}
               </span>
              </li>
            ))}
          </ul>
        </div>
        <section></section>
        {regist && <TodoRegist />}
        {info && <TodoInfo />}
      </div>
    </div>
  );
};

export default TodoList;
