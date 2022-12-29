import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <StHeader>
      <HomeLink
        onClick={() => {
          navigate("/");
        }}
      >
        <LogoImgBox src="/assets/Logo.png" alt="logo" />
      </HomeLink>
    </StHeader>
  );
};

export default Header;

// 지금 style은 임시 (나중에 css 수정 시 변경 예정)
const StHeader = styled.div`
  font-size: 30px;
  color: blue;
`;

const HomeLink = styled.div`
  text-decoration: none;
`;

const LogoImgBox = styled.img`
  /* position: relative;
  left: 300px; */
  /* display: flex;
  text-align: center;
  justify-content: center; */
`;
