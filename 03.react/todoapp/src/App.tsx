// import { useState } from "react";
import { TodoList } from "@/pages/_index";
import { Header, Footer } from "@/layout/_index";
// import { useTodoStore } from "./store/useTodoStore.js"; 

function App() {
  // const [todoItem, setTodoItem] = useState([]);
  // const {todoItem, setTodoItem} = useTodoStore();
  return (
    <div id="app">
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
