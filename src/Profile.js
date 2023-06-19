import React, { useState } from "react";
import './index.css';

function App() {
  const [profilePic, setProfilePic] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [goal, setGoal] = useState("");

  // 프로필 사진 업데이트 함수
  const updateProfilePic = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePic(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  // 소개말 업데이트 함수
  const updateIntroduction = (event) => {
    setIntroduction(event.target.value);
  };

  // 달성 목표 업데이트 함수
  const updateGoal = (event) => {
    setGoal(event.target.value);
  };

  return (
    <div>
      <div className="App">
        <h1>Personal Profile</h1>
        <div>
          <label htmlFor="profile-pic">프로필 사진:</label>
          <input
            type="file"
            id="profile-pic"
            accept=".jpg, .jpeg, .png"
            onChange={updateProfilePic}
          />
          {profilePic && (
            <img src={profilePic} alt="프로필 사진" style={{ width: "200px" }} />
          )}
        </div>
        <div>
          <label htmlFor="introduction">소개말:</label>
          <textarea
            id="introduction"
            value={introduction}
            onChange={updateIntroduction}
            placeholder="소개말을 입력하세요..."
          ></textarea>
        </div>
        <div>
          <label htmlFor="goal">달성 목표:</label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={updateGoal}
            placeholder="달성 목표를 입력하세요..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;
