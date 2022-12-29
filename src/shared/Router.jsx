import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import BoardDetail from "../pages/BoardDetail";
import BoardWrite from "../pages/BoardWrite";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<BoardDetail />} />
        <Route path="/boardwrite" element={<BoardWrite />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
