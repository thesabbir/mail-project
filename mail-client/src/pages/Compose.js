import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import showdown from "showdown";
import { sendMail } from "../redux/mailSlice";
import { useDispatch, useSelector } from "react-redux";
const converter = new showdown.Converter();

export default function Compose() {
  const dispatch = useDispatch();
  const setup = useSelector((store) => store.setup);
  const [mailData, setMailData] = useState({
    markdown: "",
    to: "",
  });
  const handleChange = (e) => {
    setMailData({
      ...mailData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    const { markdown, to, subject } = mailData;
    const text = markdown;
    const html = converter.makeHtml(markdown);

    const { email, smtp: host, password } = setup;

    dispatch(
      sendMail({
        email,
        password,
        host,
        to,
        subject,
        html,
        text,
      })
    );
  };

  return (
    <div>
      <input
        type="email"
        placeholder="send@exampl.com"
        name="to"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        placeholder="Subject"
        name="subject"
        onChange={handleChange}
      />{" "}
      <br />
      <div
        style={{
          display: "flex",
          justifyContents: "center",
        }}
      >
        <textarea
          cols={30}
          rows={30}
          name="markdown"
          onChange={handleChange}
          value={mailData.markdown}
        />
        <ReactMarkdown className="preview" source={mailData.markdown} />
      </div>
      <button onClick={onSubmit}>send</button>
    </div>
  );
}
