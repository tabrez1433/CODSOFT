import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TasksLayout from "./components/TasksLayout.jsx";
import UserNameForm from "./components/UserNameForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserNameForm />} />
        <Route path="/task-management/:name" element={<TasksLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
