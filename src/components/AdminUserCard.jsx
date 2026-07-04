const AdminUserCard = ({
  user,
  onRoleChange,
  onDelete,
}) => {

  const badgeColor =
    user.role === "admin"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold">
            {user.name}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}
        >
          {user.role}
        </span>

      </div>

      <div className="mt-6">

        <label className="block mb-2 font-semibold">
          Change Role
        </label>

        <select
          value={user.role}
          onChange={(e) =>
            onRoleChange(
              user.id,
              e.target.value
            )
          }
          className="w-full border rounded-lg p-2"
        >
          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

      </div>

      <button
        onClick={() => onDelete(user.id)}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
      >
        Delete User
      </button>

    </div>
  );
};

export default AdminUserCard;