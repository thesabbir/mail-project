import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentMail } from "../redux/mailSlice";
import useSetup from "../useSetup";
import { Link } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader";
import styles from "./styles.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const mails = useSelector((store) => store.mails);
  const data = useSelector((store) => store.setup);
  useSetup();

  useEffect(() => {
    dispatch(fetchRecentMail(data));
  }, []);

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.contents}>
          {mails.loading && <SuspenseLoader />}
          <ul>
            {mails.messages.map((message) => (
              <li>
                <Link to={`/read/${message.sequence}`}>{message.subject}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
