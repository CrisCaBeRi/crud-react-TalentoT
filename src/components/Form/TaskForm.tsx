type Props = {
  actionList?: any;
  actionTask?: any;
  task?: ITask;
  formType?: "create" | "edit";
  taskList?: ITask[];
};

interface ITask {
  id: string | number;
  taskName: string;
  priority: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

import './TaskForm.css'

export default function TaskForm({
  actionList,
  actionTask,
  task,
}: Props) {
  const today = new Date().toISOString().split("T")[0];


  // Manejador de inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    actionTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };


  // Manejador de envío de formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(task as ITask);
  };

  const addTask = (task: ITask) => {
    const randomId = Math.floor(Math.random() * (50000 - 1 + 1)) + 1;
    actionList((item: ITask[]) => {
      return [...item, { ...task, isActive: true, id: randomId.toString() }];
    });
    alert("La tarea ha sido creada");
    actionTask({
      id: "",
      taskName: "",
      priority: "",
      description: "",
      startDate: "",
      endDate: "",
      isActive: false,
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="taskName">Nombre Tarea:</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          value={task?.taskName}
          onChange={handleChange}
          required
        />

        <label htmlFor="priority">Prioridad</label>
        <select
          name="priority"
          id="priority"
          value={task?.priority}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <label htmlFor="description">Descripción:</label>
        <textarea
          name="description"
          id="description"
          value={task?.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="startDate">Fecha de inicio:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={task?.startDate}
          onChange={handleChange}
          min={today}
          required
        />

        <label htmlFor="endDate">Fecha de finalización:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={task?.endDate}
          onChange={handleChange}
          min={task?.startDate}
          required
          disabled={!task?.startDate}
        />

        <button type="submit" className="submit-button">
          Crear Tarea
        </button>
      </form>
    </main>
  );
}
