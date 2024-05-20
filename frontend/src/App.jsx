import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import TaskDetailView from "./page/TaskDetailView";
import TaskFormView from "./page/TaskFormView";
import TaskListView from "./page/TaskListView";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskListView />} />
          <Route path="/task/:id" element={<TaskDetailView />} />
          <Route path="/new-task" element={<TaskFormView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
