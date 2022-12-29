import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BoardItem = ({ board }) => {
  const { isLoading, error } = useSelector((state) => state.boardSlice);

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Box>
      <DetailLink to={`/${board.id}`} key={board.id}>
        <div className="imgBox">
          <img src={board.ImgUrl} alt="boardImg" />
        </div>
        <div className="content">
          <h3 style={{ fontSize: "25px" }}>{board.title}</h3>
        </div>
      </DetailLink>
    </Box>
  );
};

export default BoardItem;

const DetailLink = styled(Link)`
  text-decoration: none;
`;

const Box = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 30px;

  &:hover {
    .imgBox {
      transform: translate(-56px, -56px);
    }
    .content {
      transform: translate(56px, 56px);
    }
  }

  .imgBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: all 0.5s ease-in-out;
  }

  .imgBox img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    resize: both;
    border-radius: 16px;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    z-index: 1;
    align-items: flex-end;
    text-align: center;
    transition: 0.5s ease-in-out;
  }

  .content h3 {
    display: block;
    font-size: 20px;
    color: #111;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 1px;
  }

  .content span {
    color: #555;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 2px;
  }

  @media (max-width: 600px) {
    .container .box:hover .content {
      transform: translate(0, 3.5rem);
    }
    .container .box:hover .imgBox {
      transform: translate(0, -3.5rem);
    }
  }
`;
