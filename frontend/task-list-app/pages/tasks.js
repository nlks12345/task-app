import { useQuery ,useMutation ,useQueryClient} from 'react-query';
import axios from '../lib/axios';
import { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons
// import axios from 'axios';



const API_URL = 'http://localhost:3001/tasks'; // Your Rails API URL

// Fetch tasks from the API
const fetchTasks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Create task function
const createTask = async (taskData) => {
    const { data } = await axios.post(`${API_URL}/create`, taskData);
    return data;
};

// Create task function
const updateTask = async (taskData) => {
    const { data } = await axios.post(`${API_URL}/update`, taskData);
    return data;
};

// Delete task API function
const deleteTask = async (taskId) => {
    const { data } = await axios.post(`${API_URL}/delete`, {id: taskId});
    return data;
  };
  

export default function TaskList() {
  // Fetch tasks using React Query
  const queryClient = useQueryClient(); 
  // Access the React Query client to invalidate cache
  const { data: tasks, isLoading, error } = useQuery('tasks', fetchTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [createTaskFormData, setCreateTaskFormData] = useState({
    title: '',
    description: '',
    status: 0, // Default status
  });
  const [editTaskId, setEditTaskId] = useState(null); // New state for editing

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateTaskFormData((prevData) => ({
      ...prevData,
      [name]: value,  // Convert '1' to true, '0' to false
    }));
  };

  // Mutation to create a task
  const mutation = useMutation(({taskData, type}) => {
    if(taskData.id && type == 'delete'){
        return deleteTask(taskData.id); // Call the updateTask function
    }
    else if (taskData.id && type == 'update') {
        return updateTask(taskData); // Call the updateTask function

    } else {
        return createTask(taskData); // Call the updateTask function
    }

  }, {
    onSuccess: () => {
      // Invalidate and refetch the tasks after successful mutation
      queryClient.invalidateQueries('tasks');
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error('Error creating task:', error);
    }
  });

  // Handle form submit (adjust as needed for your API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(createTaskFormData);
    let taskData;
    let type = 'create';
    try {
        //Set the task data
        console.log(editTaskId);
        if(editTaskId){
            type = 'update';
             taskData = {
                title: createTaskFormData.title,
                description: createTaskFormData.description,
                completed: createTaskFormData.status,
                id: editTaskId
              };
        } else {
             taskData = {
                title: createTaskFormData.title,
                description: createTaskFormData.description,
                completed: createTaskFormData.status,
              };
        }
        
      
          // Call the mutation to create the task
          mutation.mutate({taskData: taskData, type: type});

    
      } catch (error) {
        console.error('Error creating task:', error);
        // Optionally, you can handle the error by showing a notification or message to the user
      }
  };

  // Handle Edit button click
  const handleEdit = (task) => {
    setEditTaskId(task.id);  // Set the task ID
    setCreateTaskFormData({
      title: task.title,
      description: task.description,
      status: task.completed ? 1 : 0, // Set the correct status value
    });
    setIsModalOpen(true); // Open the modal
  };

  // Handle delete button click - Open confirmation modal
  const handleDelete = (taskId) => {
    setEditTaskId(taskId);
    setIsConfirmDeleteOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (editTaskId) {
        mutation.mutate({taskData: { id: editTaskId}, type: 'delete'});
    }
    setIsConfirmDeleteOpen(false);

  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error loading tasks</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg ">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold mb-4 text-zinc-950">Task List</h1>
            <button className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    onClick={() => {
                        setIsModalOpen(true);
                        setEditTaskId(null); 
                        setCreateTaskFormData({ title: '', description: '', status: false }); // Reset form
                    }}

            >
                <span className="mr-2 text-l">+</span> Create New Task
            </button>            
        </div>

        {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
            
            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={createTaskFormData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={createTaskFormData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="status" className="block mb-2">Status</label>
                <select
                  id="status"
                  name="status"
                  value={createTaskFormData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                >
                  <option value="0">Pending</option>
                  <option value="1">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  {editTaskId ? 'Update' : 'Create'}
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {/* ENd of Modal */}

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsConfirmDeleteOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End of Delete Confirmation Modal */}


      
      {/* Task List Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-zinc-950">Task Title</th>
            <th className="px-4 py-2 text-left text-zinc-950">Task Description</th>
            <th className="px-4 py-2 text-left text-zinc-950">Task Status</th>
            <th className="px-4 py-2 text-left text-zinc-950">Task Action</th>

          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="px-4 py-2 text-blue-600">{task.title}</td>
              <td className="px-4 py-2 text-blue-600">{task.description}</td>
              <td className="px-4 py-2 text-blue-600 ${}">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    task.completed  ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                >
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                    {/* Edit Button */}
                <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    onClick={() => handleEdit(task)} // Handle the edit action
                >
                    <FaEdit className="w-5 h-5" />
                </button>

                {/* Delete Button */}
                <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => handleDelete(task.id)} // Handle the delete action
                >
                    <FaTrashAlt className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
