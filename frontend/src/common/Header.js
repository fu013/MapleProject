/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/guild">길드관리</Link>
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
              onFocus={inputFocus}
              onBlur={inputBlur}
            ></input>
          </div>
          <div>
            <label htmlFor="user_pw">비밀번호</label>
            <input
              type="password"
              id="user_pw"
              onFocus={inputFocus}
              onBlur={inputBlur}
            ></input>
          </div>
          <div>
            <button type="button" className="login-btn">
              로그인
            </button>
          </div>
          <p className="login-des">
            가입 정보가 없다면, 입력하신 정보로 자동 가입됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
