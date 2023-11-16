import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todoItem: [],
  setTodoItem: (val) => set(() => ({ todoItem: val })),
  id: 0,
  setId: (val) => set(() => ({ id: val })),
}));
