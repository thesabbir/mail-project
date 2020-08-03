import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setupSlice } from "../redux/setupSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./styles.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "../components/Buttons";

export default function Setup() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const navigate = useNavigate();
  const onSubmit = () => {
    dispatch(setupSlice.actions.addUser(values));
    navigate("/");
  };
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.contents}>
          <div className={styles.setupPageForm}>
            <p>Please provide setup credentials</p>
            <TextField
              fullWidth
              label="Email"
              onChange={onChange}
              type="text"
              placeholder="email"
              name="email"
              spaced
            />
            <TextField
              fullWidth
              spaced
              label="Password"
              onChange={onChange}
              type="password"
              placeholder="password"
              name="password"
            />
            <br />
            <TextField
              spaced
              fullWidth
              label="IMAP Host"
              onChange={onChange}
              type="text"
              placeholder="imap/pop3 host"
              name="host"
            />

            <br />
            <TextField
              spaced
              fullWidth
              label="SMTP Host"
              onChange={onChange}
              type="text"
              placeholder="smtp host"
              name="smtp"
            />
            <br />
            <br />
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>

        <Footer />
      </div>
    </React.Fragment>
  );
}
