import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setupSlice } from "../redux/setupSlice";
import { useNavigate } from "react-router-dom";

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
    <div>
      <p>Please provide IMAP credentials</p>
      <input onChange={onChange} type="text" placeholder="email" name="email" />
      <br />
      <input
        onChange={onChange}
        type="password"
        placeholder="password"
        name="password"
      />
      <br />
      <input
        onChange={onChange}
        type="text"
        placeholder="imap/pop3 host"
        name="host"
      />
      <br />

      <input
        onChange={onChange}
        type="text"
        placeholder="smtp host"
        name="smtp"
      />
      <br />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
