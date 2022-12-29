import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { __postBoards } from "../../../redux/modules/boardSlice";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
import { toast } from "react-toastify";

const BoardInput = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const [pw, setPW] = useState("");
  const [test, setTest] = useState("");
  //------------------------------------
  // new Date 사용하여 현재시간 추가
  const date = new Date().toLocaleString();
  // -----------------------------------
  const [fireURL, setFireURL] = useState("");
  const [fireCheck, setFireCheck] = useState("");
  //------------------------------------
  //useEffect를 사용해서 최초 uploadImg를 실행해준다.
  useEffect(() => {
    uploadImg();
    console.log("test가 업데이트 되었습니다.");
  }, [fireCheck]);
  //------------------------------------

  const dispatch = useDispatch();
  const navigator = useNavigate();

  // ref (빈칸 공백 방지 때 사용)
  const usernameInput = useRef();
  const boardTitleInput = useRef();
  const boardContentInput = useRef();
  const PWInput = useRef();
  const imgInput = useRef();

  // title change
  const onTitleChange = async (e) => {
    setTitle(e.target.value);
  };

  // content change
  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  // user, pw change
  const onUserChange = (e) => {
    setUser(e.target.value);
    setTest(e.target.value);
  };

  const onPWChange = (e) => {
    setPW(e.target.value);
  };

  // onsubmitHandler
  const onSubmitHandler = (e) => {
    // 새로고침 방지
    e.preventDefault();

    // 입력칸 공백 방지
    if (!user && !pw && !title && !content && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !pw & !title && !content) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !pw && !title && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !pw && !content && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !title && !content && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!pw && !title && !content && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !pw && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !title && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!pw && !title && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !content && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!pw && !content && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!title && !content && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!pw && !title && !content) {
      toast.warning("빈칸을 모두 입력해주세요!");
      PWInput.current.focus();
      return;
    } else if (!user && !title && !content) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !pw && !content) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !pw && !title) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!title && !content) {
      toast.warning("제목과 내용을 입력해주세요!");
      boardTitleInput.current.focus();
      return;
    } else if (!pw && !content) {
      toast.warning("빈칸을 모두 입력해주세요!");
      PWInput.current.focus();
      return;
    } else if (!pw && !title) {
      toast.warning("빈칸을 모두 입력해주세요!");
      PWInput.current.focus();
      return;
    } else if (!user && !content) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !title) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!pw && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!title && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!content && !fireCheck) {
      toast.warning("빈칸을 모두 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!user && !pw) {
      toast.warning("반려동물 이름과 비밀번호를 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!content) {
      toast.warning("내용을 입력해주세요!");
      boardContentInput.current.focus();
      return;
    } else if (!title) {
      toast.warning("제목을 입력해주세요!");
      boardTitleInput.current.focus();
      return;
    } else if (!pw) {
      toast.warning("비밀번호를 입력해주세요!");
      PWInput.current.focus();
      return;
    } else if (!user) {
      toast.warning("반려동물 이름을 입력해주세요!");
      usernameInput.current.focus();
      return;
    } else if (!fireCheck) {
      toast.warning("반려동물 사진을 선택해주세요!");
      return;
    }

    const newBoard = {
      id: uuidv4(),
      user: user,
      pw: pw,
      title: title,
      content: content,
      ImgUrl: fireURL,
      date: date,
    };

    console.log("newBoard:", newBoard);
    console.log("fireURL:", fireURL);

    dispatch(__postBoards(newBoard));

    setTitle("");
    setContent("");
    setUser("");
    setPW("");
    navigator("/");
  };

  //-----------------------------------------------------
  // uploadImg : 사진 추가 메소드
  const uploadImg = () => {
    const imgRef = ref(storage, `images/${uuidv4()}`);
    const imgDataUrl = localStorage.getItem("imgDataUrl");
    localStorage.clear();
    let downloadUrl;
    if (imgDataUrl) {
      uploadString(imgRef, imgDataUrl, "data_url")
        .then((response) => {
          downloadUrl = getDownloadURL(response.ref).then((response) => {
            setFireURL(response);
            console.log("FireURL : ", fireURL);
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  //----------------------------------------
  // onFileChange : 사진 업로드 (사진의 onChange이벤트 )
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    // console.log("theFile : ", theFile);
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const imgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem("imgDataUrl", imgDataUrl);
      document.getElementById("boardImg").src = imgDataUrl;
      setFireCheck(imgDataUrl);
    };
  };

  // function onChangeHandler(event) {}

  return (
    <div>
      <form onSubmit={onSubmitHandler} style={{ postion: "relative" }}>
        <div className="rightTag">
          <InputBox
            type="text"
            id="user"
            value={user}
            onChange={onUserChange}
            placeholder="반려동물이름"
          />
          <InputBox
            type="password"
            id="pw"
            value={pw}
            onChange={onPWChange}
            placeholder="비밀번호"
          />
          <InputBox
            type="text"
            id="title"
            value={title}
            onChange={onTitleChange}
            placeholder="제목을 입력해주세요"
          />
          <textarea
            id="content"
            value={content}
            onChange={onContentChange}
            placeholder="내용을 입력해주세요"
            style={{
              padding: "10px",
              width: "80%",
              height: "180px",
              margin: "10px",
              border: "2px solid #ff8c00",
              borderRadius: "16px",
            }}
          />
        </div>
        <div id="imgUrl"></div>
        <div
          style={{
            transform: "translate(-183px, -200px)",
            width: "50px",
            padding: "20px",
            display: "flex",
            fontSize: "15px",
            flexDirection: "column",
            alignItems: "center",
            justfyContent: "center",
          }}
        >
          <div>
            <SideContentWrapper>
              <p>나만 볼 수 없어</p>
              <p> 소중한</p>
            </SideContentWrapper>
            <input
              type="text/"
              style={{
                borderRadius: "10px",
                border: "1px solid #ff8c00",
                width: "100px",
              }}
              value={test}
              disabled
            />
          </div>
        </div>
        <ButtonBox>
          <input
            type="file"
            onChange={onFileChange}
            className="inputFile"
            ref={imgInput}
          />
          <button className="submitButton">글 등록하기</button>
        </ButtonBox>
        <ImgBox
          src="/assets/animal_world_logo.png"
          id="boardImg"
          alt="boardImg"
        />
      </form>
    </div>
  );
};

export default BoardInput;
const SideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 0px;
`;
const ImgBox = styled.img`
  transform: translate(-444px, -660px);
  margin: 50px;
  width: 250px;
  height: 250px;
  max-width: 200px;
  max-height: 200px;
`;

const InputBox = styled.input`
  padding: 5px;
  border-radius: 16px;
  border: 2px solid #ff8c00;
  width: 80%;
  margin: 10px;
  height: 25px;
`;

const ButtonBox = styled.div`
  transform: translate(95px, -187px);
  width: 430px;
  background-color: #f1f8fe;
  border: 1px solid #f1f8fe;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
