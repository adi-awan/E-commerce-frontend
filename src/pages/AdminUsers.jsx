import { useEffect, useState } from "react";

import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../services/adminUserService";

import AdminUserCard from "../components/AdminUserCard";

const AdminUsers = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {

      const data = await getUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);

      alert("Failed to load users.");

    }
  };

  useEffect(() => {

    loadUsers();

  }, []);

  const changeRole = async (
    id,
    role
  ) => {

    try {

      await updateUserRole(
        id,
        role
      );

      alert("Role Updated");

      loadUsers();

    } catch (error) {

      console.log(error);

      alert("Unable to update role.");

    }
  };

  const removeUser = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    try {

      await deleteUser(id);

      alert("User Deleted");

      loadUsers();

    } catch (error) {

      console.log(error);

      alert("Unable to delete user.");

    }
  };

  const filteredUsers = users.filter((user) => {

    return (

      user.name?.toLowerCase().includes(search.toLowerCase()) ||

      user.email?.toLowerCase().includes(search.toLowerCase())

    );

  });

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        User Management
      </h1>

      <input
        type="text"
        placeholder="Search users..."
        className="w-full border rounded-lg p-3 mb-8"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="grid md:grid-cols-2 gap-6">

        {filteredUsers.map((user) => (

          <AdminUserCard
            key={user.id}
            user={user}
            onRoleChange={changeRole}
            onDelete={removeUser}
          />

        ))}

      </div>

      {filteredUsers.length === 0 && (

        <p className="text-center mt-10 text-gray-500">
          No users found.
        </p>

      )}

    </div>
  );
};

export default AdminUsers;