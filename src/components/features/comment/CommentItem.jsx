import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  __deleteComment,
  __editComment,
} from "../../../redux/modules/commentSlice";
import styled from "styled-components";
import DetailButton from "../../UI/DetailButton";
import { toast } from "react-toastify";

const CommentItem = ({ comment }) => {
  const { id, user, content, pw, time } = comment;
  const dispatch = useDispatch();

  // 댓글 삭제 handler, 비밀번호 확인 후 삭제
  const onClickDeleteHandler = (id) => {
    if (pw === password) {
      dispatch(__deleteComment(id));
      toggledeleteInput();
    } else {
      toast.error("비밀번호가 틀렸습니다");
      setPassword("");
    }
  };
  const [commentContent, setCommentContent] = useState(content);
  const [password, setPassword] = useState("");

  //댓글 수정 handler, 비밀번호 확인 후 수정
  const OnClickEditCommentHandler = (id) => {
    if (pw === password) {
      const newComment = {
        id: id,
        content: commentContent,
      };
      dispatch(__editComment(newComment));
      toggleEditInput();
      toast.success("댓글이 수정되었습니다!");
    } else {
      toast.error("비밀번호가 틀렸습니다");
      setPassword("");
    }
  };

  // show 여부를 결정하는 state
  const [showEdit, setShowEdit] = useState(true);
  const [showDelete, setShowDelete] = useState(true);

  //수정 input 토글
  const toggleEditInput = () => {
    setShowEdit((current) => !current);
    setPassword("");
  };

  // 삭제 input 토글
  const toggledeleteInput = () => {
    setShowDelete((current) => !current);
    setPassword("");
  };

  return (
    <div>
      <StCommentContainer>
        <StCommentContent max_width="100px" min_width="50px">
          {user}
        </StCommentContent>

        <StCommentContent
          max_width="300px"
          min_width="200px"
          style={{ display: showEdit ? "block" : "none" }}
        >
          {content}
        </StCommentContent>
        <StEditTextArea
          style={{ display: showEdit ? "none" : "block" }}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />

        <StTime>{time}</StTime>
        <div style={{ display: showDelete && showEdit ? "block" : "none" }}>
          <DetailButton width="50px" onClick={toggledeleteInput}>
            삭제
          </DetailButton>
          <DetailButton width="50px" onClick={toggleEditInput}>
            수정
          </DetailButton>
        </div>

        <StButtonContainer style={{ display: showEdit ? "none" : "block" }}>
          <StInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            value={password}
          />
          <DetailButton
            onClick={() => {
              OnClickEditCommentHandler(id);
            }}
          >
            수정완료
          </DetailButton>
          <DetailButton width="50px" onClick={toggleEditInput}>
            취소
          </DetailButton>
        </StButtonContainer>

        <StButtonContainer style={{ display: showDelete ? "none" : "block" }}>
          <StInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            value={password}
          />
          <DetailButton onClick={() => onClickDeleteHandler(id)}>
            삭제완료
          </DetailButton>
          <DetailButton width="50px" onClick={toggledeleteInput}>
            취소
          </DetailButton>
        </StButtonContainer>
      </StCommentContainer>
    </div>
  );
};

export default CommentItem;

const StCommentContainer = styled.div`
  padding: 0px 5px 0px 5px;
  /* background-color: pink; */
  display: flex;
  align-items: center;
`;

const StInput = styled.input`
  border-radius: 10px;
  width: 100px;
  border: solid 2px #ff8c00;
  margin: 0px 0px 5px 0px;
  padding: 4px;
`;

const StEditTextArea = styled.textarea`
  border-radius: 10px;
  border: none;
`;

const StCommentContent = styled.p`
  min-width: ${({ min_width }) => min_width};
  max-width: ${({ max_width }) => max_width};
  border-radius: 10px;
  padding: 5px;
  background-color: white;
  overflow: hidden;
  margin-right: 5px;
`;

const StTime = styled.div`
  width: 70px;
  color: grey;
  font-size: 12px;
  border-radius: 5px;
  background-color: white;
`;

const StButtonContainer = styled.div``;
