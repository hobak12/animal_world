import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  __deleteBoards,
  __getBoards,
  __editBoards,
} from "../../../redux/modules/boardSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DetailButton from "../../UI/DetailButton";
import { toast } from "react-toastify";

const BoardItemDetail = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boardSlice.board);

  const navigator = useNavigate();
  const param = useParams().id;

  // 비밀번호 일치 시 삭제
  const a = board.filter((item) => item.id === param).map((item) => item);
  const [pwTest, setPWTest] = useState("");
  const { pw, title, content, date } = a[0];

  //처음 수정, 삭제에 들어가면 원래 들어있던 불러오게 함
  const [state, setState] = useState({
    id: param,
    title: title,
    content: content,
    pw: "",
  });

  const pwChangeHandler = (event) => {
    setPWTest(event.target.value);
  };

  useEffect(() => {
    dispatch(__getBoards());
  }, [dispatch]);

  // delete handler
  const onDeleteHandler = (id) => {
    if (pwTest === pw) {
      dispatch(__deleteBoards(id));
      toast.success("삭제가 완료되었습니다!");
      navigator("/");
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
      setPWTest("");
    }
  };

  // edit handler
  const onEditHandler = (e) => {
    // 새로고침 방지
    e.preventDefault();

    const { title, content } = state;

    // 입력칸 공백 방지
    if (!title || !content) {
      toast.warning("제목과 내용 모두 입력하세요");
      return;
    }

    if (pwTest === pw) {
      const newBoard = {
        id: param,
        title: title,
        content: content,
      };
      dispatch(__editBoards(newBoard));
      toast.success("수정했습니다!");
      toggleEditInput();
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
      setPWTest("");
    }
  };

  // show 여부를 결정하는 state
  const [showEdit, setShowEdit] = useState(true);
  const [showDelete, setShowDelete] = useState(true);

  // 수정 input toggle
  const toggleEditInput = () => {
    setShowEdit((current) => !current);
    setPWTest("");
  };

  // delete input toggle
  const toggleDeleteInput = () => {
    setShowDelete((current) => !current);
    setPWTest("");
  };

  return (
    <>
      {a.map((item) => {
        return (
          <StBoardContainer key={item.id}>
            <LeftSection>
              <ImgBox src="/assets/animal_world_logo.png" alt="boardImg" />
              <h3>{item.user}</h3>
            </LeftSection>

            <StLeftWrapper>
              <ImgTag
                src={
                  item.ImgUrl === item.ImgUrl
                    ? item.ImgUrl
                    : "/assets/animal_world_logo.png"
                }
                alt="boardImg"
              />
              <StTime>{item.date}</StTime>
            </StLeftWrapper>
            <StRightWrapper>
              <StContent style={{ display: showEdit ? "block" : "none" }}>
                {item.title}
              </StContent>
              <StContent
                height="170px"
                style={{ display: showEdit ? "block" : "none" }}
              >
                {item.content}
              </StContent>

              <StButtonWrapper>
                <div
                  style={{
                    display: showDelete && showEdit ? "block" : "none",
                  }}
                >
                  <DetailButton width="50px" onClick={toggleDeleteInput}>
                    삭제
                  </DetailButton>
                  <DetailButton width="50px" onClick={toggleEditInput}>
                    수정
                  </DetailButton>
                </div>

                <div style={{ display: showEdit ? "none" : "block" }}>
                  <StEditTitleInput
                    type="text"
                    id="title"
                    value={state.title}
                    onChange={(e) => {
                      const { id, value } = e.target;
                      setState({ ...state, [id]: value });
                    }}
                    placeholder="제목을 입력해주세요"
                  />
                  <StEditContentTextArea
                    height="170px"
                    id="content"
                    value={state.content}
                    onChange={(e) => {
                      const { id, value } = e.target;
                      setState({ ...state, [id]: value });
                    }}
                    placeholder="내용을 입력해주세요"
                  />

                  <StPWInput
                    type="password"
                    placeholder="비밀번호 입력"
                    onChange={pwChangeHandler}
                    value={pwTest}
                  />
                  <DetailButton
                    onClick={(e) => {
                      onEditHandler(e);
                    }}
                  >
                    수정 완료
                  </DetailButton>

                  <DetailButton width="50px" onClick={toggleEditInput}>
                    취소
                  </DetailButton>
                </div>

                <div style={{ display: showDelete ? "none" : "block" }}>
                  <StPWInput
                    type="password"
                    onChange={(e) => setPWTest(e.target.value)}
                    placeholder="비밀번호"
                    value={pwTest}
                  />
                  <DetailButton onClick={() => onDeleteHandler(item.id)}>
                    삭제 완료
                  </DetailButton>
                  <DetailButton width="50px" onClick={toggleDeleteInput}>
                    취소
                  </DetailButton>
                </div>
              </StButtonWrapper>
            </StRightWrapper>
          </StBoardContainer>
        );
      })}
    </>
  );
};

const ImgTag = styled.img`
  width: 270px;
  height: 260px;
  border-radius: 16px;
  margin-right: 20px;
  border: solid 2px #ff8c00;
`;

const StBoardContainer = styled.div`
  /* background-color: pink; */
  display: flex;
  padding: 20px 20px 5px 20px;
`;

const StButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StContent = styled.div`
  width: 260px;
  height: ${({ height }) => height};
  border: solid 2px #ff8c00;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: white;
`;

const StPWInput = styled.input`
  border-radius: 10px;
  width: 120px;
  border: solid 2px #ff8c00;
  margin: 0px 5px 0px 5px;
  padding: 5px;
`;

const StEditTitleInput = styled.input`
  width: 250px;
  border: solid 2px #ff8c00;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 5px;
`;

const StEditContentTextArea = styled.textarea`
  width: 250px;
  height: ${({ height }) => height};
  border: solid 2px #ff8c00;
  border-radius: 16px;
  padding: 10px;
`;
const StLeftWrapper = styled.div`
  /* background-color: pink; */
  position: relative;
  right: 240px;
`;

const StRightWrapper = styled.div`
  /* background-color: purple; */
  position: relative;
  right: 240px;
`;

const StTime = styled.div`
  color: grey;
  font-size: 12px;
`;

const LeftSection = styled.div`
  position: relative;
  position: relative;
  right: 270px;
`;
const ImgBox = styled.img`
  width: 230px;
  height: 230px;
`;
export default BoardItemDetail;
