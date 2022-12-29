import styled from "styled-components";

const DetailButton = ({ children, width, onClick }) => {
  return (
    <StButton onClick={onClick} width={width}>
      {children}
    </StButton>
  );
};

export default DetailButton;

const StButton = styled.button`
  width: ${({ width }) => width};
  background-color: #ff8c00;
  border-radius: 20px;
  margin-left: 5px;
  border: none;
  padding: 5px;
`;
