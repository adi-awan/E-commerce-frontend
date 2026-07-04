const LoadingButton = ({
  loading,
  text,
  loadingText,
  type = "submit",
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`
        w-full
        h-12
        rounded-xl
        bg-blue-600
        hover:bg-blue-700
        text-white
        font-semibold
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-2
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;