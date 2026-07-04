import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "Password",
  name = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">

      <FaLock
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-gray-300
          pl-12
          pr-12
          outline-none
          focus:border-blue-600
          focus:ring-2
          focus:ring-blue-200
          transition
        "
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-500
          hover:text-blue-600
        "
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>

    </div>
  );
};

export default PasswordInput;