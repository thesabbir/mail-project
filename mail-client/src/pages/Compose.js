import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import showdown from "showdown";
import { sendMail } from "../redux/mailSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Buttons";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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
    <React.Fragment>
      <div className={styles.pageContainer}>
        <Header />

        <div className={styles.contents}>
          <div className={styles.splitCompose}>
            <div>
              <ReactMarkdown className="preview" source={mailData.markdown} />
            </div>
            <div className={styles.composeInputs}>
              <TextField
                fullWidth
                type="email"
                placeholder="send@exampl.com"
                name="to"
                onChange={handleChange}
              />
              <br />
              <TextField
                fullWidth
                type="text"
                placeholder="Subject"
                name="subject"
                onChange={handleChange}
              />
              <br />

              <TextareaAutosize
                rowsMin={10}
                name="markdown"
                onChange={handleChange}
                value={mailData.markdown}
              />
              <Button onClick={onSubmit}>send</Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
}
