import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

let idCounter = 0;
const getId = () => idCounter++;

const initialTasks = {
  backlog: [{ id: getId().toString(), title: 'Research UI/UX trends', description: 'Stay updated with the latest design patterns' }],
  todo: [{ id: getId().toString(), title: 'Sketch wireframes', description: 'Create low-fidelity designs for main pages' }],
  inProgress: [{ id: getId().toString(), title: 'Develop landing page', description: 'Code the main landing page using React' }],
  done: [{ id: getId().toString(), title: 'User testing', description: 'Conduct usability tests with 5 participants' }]
};

function Main() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('backlog');
  const [editIndex, setEditIndex] = useState(null);
  const [editStatus, setEditStatus] = useState(null);

  const openPopup = (index = null, status = 'backlog') => {
    setIsPopupOpen(true);
    setEditIndex(index);
    setEditStatus(status);
    setStatus(status);
    if (index !== null) {
      setTitle(tasks[status][index].title);
      setDescription(tasks[status][index].description);
    } else {
      setTitle('');
      setDescription('');
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEditIndex(null);
    setEditStatus(null);
    setTitle('');
    setDescription('');
  };

  const saveTodo = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newTasks = { ...tasks };
      if (editIndex !== null) {
        newTasks[editStatus][editIndex] = { ...newTasks[editStatus][editIndex], title, description };
      } else {
        newTasks[status].push({ id: getId().toString(), title, description });
      }
      setTasks(newTasks);
      closePopup();
    }
  };

  const deleteTodo = (index, status) => {
    const newTasks = { ...tasks };
    newTasks[status] = newTasks[status].filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = source.droppableId;
      const destColumn = destination.droppableId;
      const newTasks = { ...tasks };
      const sourceItems = [...newTasks[sourceColumn]];
      const destItems = [...newTasks[destColumn]];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      newTasks[sourceColumn] = sourceItems;
      newTasks[destColumn] = destItems;
      setTasks(newTasks);
    } else {
      const column = source.droppableId;
      const newTasks = { ...tasks };
      const copiedItems = [...newTasks[column]];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newTasks[column] = copiedItems;
      setTasks(newTasks);
    }
  };

  const columns = [
    { id: 'backlog', title: 'Backlog', color: 'blue' },
    { id: 'todo', title: 'To Do', color: 'yellow' },
    { id: 'inProgress', title: 'In Progress', color: 'indigo' },
    { id: 'done', title: 'Done', color: 'green' }
  ];

  return (
    <div className='min-h-screen p-8'>
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Task Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className={`text-2xl font-bold mb-6 text-${column.color}-600`}>{column.title}</h2>
              <button
                onClick={() => openPopup(null, column.id)}
                className="mt-4 mb-4 bg-black w-full text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
              >
                <AddIcon />
              </button>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <ul
                    className={`space-y-4 ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks[column.id].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300 ${snapshot.isDragging ? 'bg-gray-200' : ''}`}
                          >
                            <div className="mb-2">
                              <h3
                                className={`text-lg font-semibold cursor-pointer hover:text-${column.color}-600 transition duration-300`}
                                onClick={() => openPopup(index, column.id)}
                              >
                                {task.title}
                              </h3>
                              <p className="text-gray-600">{task.description}</p>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => openPopup(index, column.id)}
                                className={`text-${column.color}-500 hover:text-${column.color}-600 transition duration-300`}
                              >
                                <EditIcon />
                              </button>
                              <button
                                onClick={() => deleteTodo(index, column.id)}
                                className="text-red-500 hover:text-red-600 transition duration-300"
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-full mx-4">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">
              {editIndex !== null ? 'Edit Task' : 'Add Task'}
            </h2>
            <form onSubmit={saveTodo}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              />
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className="bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 flex items-center space-x-2"
                >
                  <span>{editIndex !== null ? 'Update' : 'Add'}</span>
                </button>
                <button 
                  type="button" 
                  onClick={closePopup} 
                  className="bg-gray-500 text-white py-3 px-6 rounded-full hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
