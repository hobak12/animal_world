import React from "react";
import { useSelector } from "react-redux";
import BoardItem from "./BoardItem";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const BoardList = () => {
  const board = useSelector((state) => state.boardSlice.board);

  //검색 기능
  const location = useLocation();
  const itemSearch = decodeURI(location.search.slice(3).toLowerCase());
  const searchedItem = itemSearch
    ? board.filter(
        (search) =>
          search.title.includes(itemSearch) ||
          search.content.includes(itemSearch)
      )
    : board;

  return (
    <div key={board}>
      <Container>
        {searchedItem
          .map((item) => {
            return <BoardItem key={item.id} board={item} />;
          })
          .sort((a, b) => a.time - b.time)
          .reverse()}
      </Container>
    </div>
  );
};

export default BoardList;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
