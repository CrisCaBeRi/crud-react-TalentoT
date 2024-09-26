import { useState } from "react";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/Form/TaskForm";

interface ITask {
  id: number;
  taskName: string;
  priority: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const [task, setTask] = useState({
    id: "",
    taskName: "",
    priority: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: false,
  });

  return (
    <main>
      <h1>Lista de Tareas</h1>

      <TaskForm
        actionList={setTaskList}
        actionTask={setTask}
        task={task}
        taskList={taskList}
        formType="create"
      />

      <TaskList
        list={taskList}
        actionList={setTaskList}
        actionTask={setTask} />
    </main>
  );
}

export default App;
