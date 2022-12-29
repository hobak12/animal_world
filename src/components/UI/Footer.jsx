import styled from "styled-components";

const Footer = () => {
  return (
    <StFooter>
      <span>
        copyright ⓒ 팔팔하정
        https://github.com/react-teamProject/react-teamproject
      </span>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  color: #919191;
`;
