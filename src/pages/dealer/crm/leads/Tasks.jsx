// src/pages/dealer/crm/leads/Tasks.jsx
import React, { useState } from 'react';

export default function Tasks() {
  const teamMembers = ['Alice Smith', 'Bob Johnson', 'Carlos Gomez'];

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Follow up call with John Doe',
      assignedTo: 'Alice Smith',
      dueDate: '2025-06-15',
      lead: 'John Doe',
      status: 'Pending',
      priority: 'High',
    },
    {
      id: 2,
      name: 'Demo at ACME Farms',
      assignedTo: 'Bob Johnson',
      dueDate: '2025-06-20',
      lead: 'ACME Farms',
      status: 'Pending',
      priority: 'Medium',
    },
    {
      id: 3,
      name: 'Email brochure to Raj Kumar',
      assignedTo: 'Alice Smith',
      dueDate: '2025-05-10',
      lead: 'Raj Kumar',
      status: 'Done',
      priority: 'Low',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    assignedTo: teamMembers[0],
    dueDate: '',
    lead: '',
    status: 'Pending',
    priority: 'Medium',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: tasks.length + 1,
      ...newTask,
    };
    setTasks([...tasks, newEntry]);
    setNewTask({
      name: '',
      assignedTo: teamMembers[0],
      dueDate: '',
      lead: '',
      status: 'Pending',
      priority: 'Medium',
    });
    setShowForm(false);
  };

  const statusStyle = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Done: 'bg-green-100 text-green-700',
  };

  const priorityStyle = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-orange-100 text-orange-700',
    Low: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🗓️ Tasks</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ New Task
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Task Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTask.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Assigned To</label>
                <select
                  name="assignedTo"
                  value={newTask.assignedTo}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  {teamMembers.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Lead</label>
                <input
                  type="text"
                  name="lead"
                  value={newTask.lead}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>Pending</option>
                  <option>Done</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="w-full border mt-6 bg-white shadow rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Task</th>
            <th className="p-3">Assigned</th>
            <th className="p-3">Due</th>
            <th className="p-3">Lead</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="p-3">{t.name}</td>
              <td className="p-3">{t.assignedTo}</td>
              <td className="p-3">{t.dueDate}</td>
              <td className="p-3">{t.lead}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-sm font-medium ${statusStyle[t.status]}`}>
                  {t.status}
                </span>
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-sm font-medium ${priorityStyle[t.priority]}`}>
                  {t.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
