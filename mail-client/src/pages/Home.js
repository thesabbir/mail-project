import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentMail } from "../redux/mailSlice";
import useSetup from "../useSetup";
import { Link } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader";

export default function Home() {
  const dispatch = useDispatch();
  const mails = useSelector((store) => store.mails);
  const data = useSelector((store) => store.setup);
  useSetup();

  useEffect(() => {
    dispatch(fetchRecentMail(data));
  }, []);

  return (
    <div>
      <p>Home Page</p>
      <div>
        {mails.loading && <SuspenseLoader />}
        <ul>
          {mails.messages.map((message) => (
            <li>
              <Link to={`/read/${message.sequence}`}>{message.subject}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
