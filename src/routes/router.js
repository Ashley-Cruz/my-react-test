import { Route, Routes, Navigate } from "react-router-dom";
import { Welcome, TodoList } from "../pages";

export const router = (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="todo-list" element={<TodoList />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
