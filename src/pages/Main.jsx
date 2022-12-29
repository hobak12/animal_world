import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BoardList from "../components/features/board/BoardList";
import Layout from "../components/UI/Layout";
import { __getBoards } from "../redux/modules/boardSlice";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SimpleSlider from "../components/features/board/SimpleSlider";
import { FaSearch } from "react-icons/fa";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(__getBoards());
  }, [dispatch]);

  //enter (keycode 13)로 검색 가능
  const handleOnKeyUp = (event) => {
    if (event.keyCode === 13) {
      //
      handleOnClickSearchButton();
    }
  };
  const handleOnClickSearchButton = (event) => {
    event.preventDefault();
    navigate(`/?q=${search}`);
    setSearch("");
  };
  return (
    <Layout>
      <MainBox>
        <SimpleSlider />
        <Search>
          <form onSubmit={handleOnClickSearchButton}>
            <input
              onKeyUp={handleOnKeyUp}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="input"
              type="text"
              placeholder="검색어를 입력해주세요"
            />
            <SearchBtn type="submit">
              <FaSearch /> 검색
            </SearchBtn>
          </form>
          <DetailLink to={`/boardwrite`}>
            <WriteButton>글쓰기</WriteButton>
          </DetailLink>
        </Search>
      </MainBox>

      <BoardList />
    </Layout>
  );
};

export default Main;

const DetailLink = styled(Link)`
  text-decoration: none;
`;

const MainBox = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const WriteButton = styled.button`
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 20px;
  background-color: #ff8c00;

  &:hover {
    color: #fff;
    background-color: #ff8c00;
  }
`;

const Search = styled.div`
  padding-top: 64px;
  display: flex;
  justify-content: space-between;

  .input {
    width: 400px;
    padding: 12px 24px;

    background-color: transparent;
    transition: transform 250ms ease-in-out;
    font-size: 14px;
    line-height: 18px;

    color: #575756;
    background-color: transparent;

    background-repeat: no-repeat;
    background-size: 18px 18px;
    background-position: 95% center;
    border-radius: 50px;
    border: 1px solid #575756;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;

    &::placeholder {
      color: color(#575756 a(0.8));
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    &:hover,
    &:focus {
      padding: 12px 0;
      outline: 0;
      border: 1px solid transparent;
      border-bottom: 1px solid #575756;
      border-radius: 0;
      background-position: 100% center;
    }
  }
`;

const SearchBtn = styled.button`
  margin: 10px;
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 20px;
`;
