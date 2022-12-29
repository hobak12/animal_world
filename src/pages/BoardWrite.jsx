//import { useNavigate } from "react-router-dom";
import BoardInput from "../components/features/board/BoardInput";
import Layout from "../components/UI/Layout";
import MainLayout from "../components/UI/MainLayout";
// detail page에 필요한 컴포넌트 import
// ex) board input, board Item ...
// header & footer => Layout에 존재하기 때문에 자동 포함

const BoardWrite = () => {
  return (
    <Layout>
      <MainLayout>
        <BoardInput />
      </MainLayout>
    </Layout>
  );
};

export default BoardWrite;
