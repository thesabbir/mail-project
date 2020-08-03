import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentMail } from "../redux/mailSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const mails = useSelector((store) => store.mails);
  const data = useSelector((store) => store.setup);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.email || !data.host || !data.password) {
      return navigate("/setup");
    }
    dispatch(fetchRecentMail(data));
  }, []);

  return (
    <div>
      <p>Home Page</p>
      <div>
        <ul>
          {mails.messages.map((message) => (
            <p>{message.subject}</p>
          ))}
        </ul>
      </div>
    </div>
  );
}
