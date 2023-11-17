import axios from "axios";
import { useState, useEffect, MouseEvent } from "react";
import { useTodoStore } from "@/store/useTodoStore"; 


const Header = () => {
  const {setTodoItem, todoItem} = useTodoStore();
  const [activeButton, setActiveButton] = useState("All");
  const [isSearch, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState([]);

  useEffect(() => {
    UpdateTodoList();
  }, [activeButton]);

  const filter = (e: MouseEvent<HTMLButtonElement>) => {
    setActiveButton(e.target.textContent);
  };

  // 필터기능
  const UpdateTodoList = async () => {
    try {
      const response = await axios("http://localhost:33088/api/todolist");
      const { items } = response.data;
      if (activeButton === "All") {
        setTodoItem(items);
      } else if (activeButton === "Active") {
        setTodoItem(items.filter((item) => !item.done));
      } else if (activeButton === "Completed") {
        setTodoItem(items.filter((item) => item.done));
      }
    } catch (err) {
      console.error(err);
    }

  };

  const handleSearchValue = (e) =>{
    console.log(e.target.value);
    setSearch(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(todoItem.filter((item)=> item.title.includes(isSearch)));
    const searchData = ()=> todoItem.filter((i)=> i.title.includes(isSearch));
    setSearchItem(searchData)
    console.log(searchItem);
    
  }
  

  return (
    <header>
      <h1>TODO</h1>
      <form action="get" className='listSearchForm'>
            <input onChange={handleSearchValue} className='listSearch' type='search' placeholder='리스트를 검색하세요.' ></input>
            <input onClick={handleSearch}className='listSearchButton' type='submit' value='검색'/>
      </form>
      <ul className='searchResult'>
        {searchItem.map((item: any)=> (
        <li key={item._id}>{item.title}</li>))}
      </ul>
      <div>
        {["All", "Active", "Completed"].map((item, index) => {
          return (
            <button
              key={index}
              onClick={filter}
              className={item === activeButton ? "active" : ""}
            >
              {item}
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
