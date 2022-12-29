// 웹페이지 전체의 Layout
// Header, Footer는 고정이기 때문에 Layout에 추가
import Header from "./Header";
import Footer from "./Footer";
// import MainLayout from "./MainLayout";
import GlobalStyle from "../styles/GlobalStyle";
//import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyle />
      <Header />
      {children}
      {/* <MainLayout /> */}
      <Footer />
    </div>
  );
};

export default Layout;

// const Main = styled.div`
//   flex: 1;
// `;
