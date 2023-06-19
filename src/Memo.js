import React, { useState } from "react";
import './index.css';


function App() {
  const [memoText, setMemoText] = useState("");
  const [memoList, setMemoList] = useState([]);

  // 메모 추가 함수
  const addMemo = () => {
    // 빈 메모는 추가하지 않음
    if (memoText.trim() === "") {
      return;
    }

    // 새 메모 생성
    const newMemo = {
      id: Date.now(),
      text: memoText
    };

    // 메모 리스트에 새 메모 추가
    setMemoList([...memoList, newMemo]);

    // 입력 필드 초기화
    setMemoText("");
  };

  // 메모 삭제 함수
  const deleteMemo = (id) => {
    // 해당 ID의 메모 필터링
    const updatedMemoList = memoList.filter((memo) => memo.id !== id);

    // 메모 리스트 업데이트
    setMemoList(updatedMemoList);
  };

  return (
    <div>
      <div className="App">
      <h1>Memo</h1>
      <form>
        <textarea
          value={memoText}
          onChange={(e) => setMemoText(e.target.value)}
          placeholder="메모를 입력하세요..."
        ></textarea>
        <button type="button" onClick={addMemo}>메모 추가</button>
      </form>
      <div>
        {memoList.map((memo) => (
          <div key={memo.id}>
            <p>{memo.text}</p>
            <button onClick={() => deleteMemo(memo.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
