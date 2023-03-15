/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "resources/css/header.css";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname.split("/");
    path = path[path.length - 1];
    for (let i = 0;i < document.querySelector(".main-header").childElementCount; i++) {
      document
        .querySelector(".main-header")
        .children[i].classList.remove("active");
    }
    if (document.getElementById(path)) {
      document.getElementById(path).classList.add("active");
    } else {
      document.getElementById("index").classList.add("active");
    }
  }, [location]);

  return (
    <header>
      <div className="fixed-header">
        <div className="main-header">
          <Link to="/" className="logo">
            Maplestory
          </Link>
          <Link to="/" className="active" id="index">
            홈
          </Link>
          <Link to="/v/guild" id="guild">
            길드
          </Link>
          {/* <Link to="/v/union" id="union">
            유니온
          </Link> 보류 */}
          <Link to="/v/cube" id="cube">
            큐브
          </Link>
          <Link to="/v/posting" id="posting">
            게시판
          </Link>
        </div>
        <div className="side-header">
          <div className="login-modal-btn" onClick={openModal}>
            로그인
          </div>
        </div>
        <Modal isOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </header>
  );
}
function Modal({ isOpen, closeModal }) {
  const inputFocus = (e) => {
    e.currentTarget.classList.add("on");
    e.currentTarget.previousSibling.classList.add("on");
  };
  const inputBlur = (e) => {
    e.currentTarget.classList.remove("on");
    e.currentTarget.previousSibling.classList.remove("on");
  };
  const [id, setId] = useState([]);
  const [pw, setPw] = useState([]);
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPwHandler = (event) => {
    setPw(event.currentTarget.value);
  };
  let data = {
    mbId: id,
    mbPw: pw,
  };
  const serverURL = window.location.href.replace('3000', '8080');
  const onLoginHandler = () => {
    axios
      .post(`${serverURL}api/auth/login`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        alert("로그인되었습니다.");
      })
      .catch((error) => {
        switch (error.response.data) {
          case "id_no_match":
            alert("존재하지 않는 아이디입니다.");
            break;
          case "pw_no_match":
            alert("비밀번호가 일치하지 않습니다.");
            break;
          case "no_value":
            alert("아이디, 비밀번호를 모두 입력해주세요.");
            break;
          default:
            alert(error.response.data);
        }
      });
  };
  const onSignUpHandler = () => {
    axios
      .post(`${serverURL}api/auth/signup`, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        alert("회원가입되었습니다.");
      })
      .catch((error) => {
        switch (error.response.data) {
          case "id_exist":
            break;
          case "no_value":
            alert("아이디, 비밀번호를 모두 입력해주세요.");
            break;
          default:
            alert(error.response.data);
        }
      });
  };

  return (
    <div className={isOpen ? "modal-container on" : "modal-container"}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="login-modal">
        <img
          className="modal-close"
          src={require("resources/images/cancel.png")}
          onClick={closeModal}
        />
        <div className="modal-content">
          <div
            style={{
              marginBottom: "70px",
              textAlign: "center",
            }}
          >
            Maplestory
          </div>
          <div
            style={{
              marginBottom: "35px",
            }}
          >
            <label htmlFor="user_id">아이디</label>
            <input
              type="text"
              id="user_id"
              onChange={onIdHandler}
              onFocus={inputFocus}
              onBlur={inputBlur}
            ></input>
          </div>
          <div>
            <label htmlFor="user_pw">비밀번호</label>
            <input
              type="password"
              id="user_pw"
              onChange={onPwHandler}
              onFocus={inputFocus}
              onBlur={inputBlur}
            ></input>
          </div>
          <div>
            <button
              type="button"
              className="login-btn"
              onClick={onLoginHandler}
            >
              로그인
            </button>
            <button
              type="button"
              className="signup-btn"
              onClick={onSignUpHandler}
            >
              회원가입
            </button>
          </div>
          <p className="login-des">
            회원가입 버튼을 누르면, 위에 입력된 정보로 가입됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
