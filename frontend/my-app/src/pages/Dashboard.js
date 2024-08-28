import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, updateUser, deleteUser } from "../controllers/auth";


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
      setLoading(false);
    };

    getUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdate = async () => {
    const success = await updateUser(editingUser, { name, email });
    if (success) {
      setUsers(users.map(user => user.id === editingUser ? { ...user, name, email } : user));
      setEditingUser(null);
    } else {
      alert('Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    const success = await deleteUser(userId);
    if (success) {
      setUsers(users.filter(user => user.id !== userId));
    } else {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="flex justify-end p-4">
  <button
    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
  onClick={()=> navigate('/login')}>
    Logout
  </button>
</div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Date & Time</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                    {user.createdAt}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingUser === user.id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="text-green-500 hover:text-green-700 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
