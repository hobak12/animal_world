import Router from "./shared/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
