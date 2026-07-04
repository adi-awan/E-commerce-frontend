import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({
  onClick,
  text = "Continue with Google",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        h-12
        border
        border-gray-300
        rounded-xl
        bg-white
        hover:bg-gray-50
        flex
        items-center
        justify-center
        gap-3
        font-medium
        transition-all
        duration-300
        hover:shadow-md
        active:scale-[0.98]
      "
    >
      <FcGoogle size={24} />

      <span>{text}</span>
    </button>
  );
};

export default GoogleButton;