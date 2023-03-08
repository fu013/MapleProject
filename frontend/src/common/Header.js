/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "resources/css/header.css";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <header>
      <div className="fixed-header">
        <div className="main-header">
          <Link to="/" className="logo">
            메이플을 윤택하게
          </Link>
          <Link to="/v/guild">길드관리</Link>
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
  const onLoginHandler = () => {
    axios
      .post("http://localhost:8080/api/auth/login", JSON.stringify(data), {
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
      .post("http://localhost:8080/api/auth/signup", JSON.stringify(data), {
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
            alert("이미 존재하는 아이디입니다.");
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
            메이플을 윤택하게
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
