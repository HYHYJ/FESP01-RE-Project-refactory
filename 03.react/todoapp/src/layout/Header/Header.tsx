import axios from "axios";
import { useState, useEffect, MouseEvent } from "react";
import { useTodoStore } from "@/store/useTodoStore"; 


const Header = () => {
  const {setTodoItem } = useTodoStore();
  const [activeButton, setActiveButton] = useState("All");

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

  return (
    <header>
      <h1>TODO</h1>
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
