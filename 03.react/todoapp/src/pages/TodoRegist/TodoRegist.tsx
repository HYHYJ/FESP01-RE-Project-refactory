import { useState } from "react";
import axios from "axios";

const TodoRegist = () => {
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleRegistButton = async () => {
    const response: TodoResponse = await axios.post(
      `http://localhost:33088/api/todolist`,
      {
        title: title,
        content: content,
      }
    );
    if (response.data.ok === 0) {
      console.log(response);
    }
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setTitle(event.target.value);
    }
  };
  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target instanceof HTMLTextAreaElement)
      setContent(event.target.value);
  };

  return (
    <section>
      <div
        style={{ display: show ? "block" : "none" }}
        className="regist-container"
      >
        <form action="">
          <div className="button-container">
            <button
              onClick={handleRegistButton}
              className="regist-buttons save"
            >
              저장
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShow(false);
              }}
              className="regist-buttons cancel"
            >
              취소
            </button>
          </div>
          <input
            type="text"
            placeholder="TODO 제목을 입력하세요"
            className="regist-title"
            maxLength={25}
            value={title}
            onChange={onChangeTitle}
          />
          <textarea
            className="regist-content"
            placeholder="TODO 상세 내용을 입력하세요"
            value={content}
            onChange={onChangeContent}
          ></textarea>
        </form>
      </div>
      ;
    </section>
  );
};

export default TodoRegist;
