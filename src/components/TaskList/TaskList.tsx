import { useState } from "react";

type Props = {
  list: ITask[];
  actionList: any;
  actionTask: any;
};

interface ITask {
  id: number;
  taskName: string;
  priority: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

import './TaskList.css'

export default function TaskList({ list, actionList }: Props) {

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  const handleDelete = (task: ITask) => {
    actionList((list: ITask[]) => {
      return list.filter((item) => item.id !== task.id);
    });
    alert(`La tarea ${task.taskName} ha sido eliminada`);
  };

  const handleEdit = (task: ITask) => {
    setEditingTaskId(task.id); // Activa el modo edición para esa tarea
    setCurrentTask({ ...task }); // Crea una copia de la tarea actual
  };

  const handleSave = () => {
    actionList((prevList: ITask[]) =>
      prevList.map((item) => (item.id === currentTask?.id ? currentTask : item))
    );
    setEditingTaskId(null); // Salir del modo de edición
    setCurrentTask(null); // Limpiar la tarea actual
  };

  const handleTaskChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: keyof ITask
  ) => {
    setCurrentTask((prevTask) => {
      if (!prevTask) return null;
      return {
        ...prevTask,
        [field]: e.target.value,
      };
    });
  };

  if (!list.length) return <h1>No existen tareas</h1>;

  return (
    <ul className="task-list">
      {list.map((task) =>
        task.isActive ? (
          <li key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              <form className="edit-form">
                <label>Nombre Tarea:</label>
                <input
                  type="text"
                  value={currentTask?.taskName || ""}
                  onChange={(e) => handleTaskChange(e, "taskName")}
                />

                <label>Prioridad:</label>
                <select
                  value={currentTask?.priority || ""}
                  onChange={(e) => handleTaskChange(e, "priority")}
                >
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>

                <label>Descripción:</label>
                <textarea
                  value={currentTask?.description || ""}
                  onChange={(e) => handleTaskChange(e, "description")}
                />

                <label>Fecha de inicio:</label>
                <input
                  type="date"
                  value={currentTask?.startDate || ""}
                  onChange={(e) => handleTaskChange(e, "startDate")}
                />

                <label>Fecha de finalización:</label>
                <input
                  type="date"
                  value={currentTask?.endDate || ""}
                  onChange={(e) => handleTaskChange(e, "endDate")}
                />
              </form>
            ) : (
              <>
                <p><strong>Nombre:</strong> {task.taskName}</p>
                <p><strong>Prioridad:</strong> {task.priority}</p>
                <p><strong>Descripción:</strong> {task.description}</p>
                <p><strong>Fecha de inicio:</strong> {task.startDate}</p>
                <p><strong>Fecha de finalización:</strong> {task.endDate}</p>
              </>
            )}

            <div className="buttons">
              <button className="delete-btn" onClick={() => handleDelete(task)}>
                Eliminar Tarea
              </button>

              {editingTaskId === task.id ? (
                <button className="save-btn" onClick={handleSave}>Guardar</button>
              ) : (
                <button className="edit-btn" onClick={() => handleEdit(task)}>Modificar</button>
              )}
            </div>
          </li>
        ) : null
      )}
    </ul>
  );
}
