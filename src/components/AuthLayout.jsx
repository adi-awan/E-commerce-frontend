import authImage from "../../assets/auth-image.png";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-10">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-blue-600 text-white p-12">

          <img
            src={authImage}
            alt="Authentication"
            className="w-96 mb-10"
          />

          <h1 className="text-4xl font-bold mb-4">
            Welcome to ShopHub
          </h1>

          <p className="text-center text-blue-100 leading-8">
            Buy thousands of products with secure payments,
            fast delivery and an amazing shopping experience.
          </p>

        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-8 md:p-14">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-gray-900">
              {title}
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              {subtitle}
            </p>

            {children}

          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthLayout;