import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Toaster position="top-right" />
      <Navbar />
      <AppRoutes />
      <Footer />
       <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;