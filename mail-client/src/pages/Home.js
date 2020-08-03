import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentMail } from "../redux/mailSlice";
import useSetup from "../useSetup";
import { Link } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader";
import styles from "./styles.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Condition from "../components/Condition";

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
          <Condition check={mails.loading}>
            <SuspenseLoader />
          </Condition>
          <h3>Inbox</h3>
          <ul className={styles.mailList}>
            {mails.messages.map((message) => (
              <Link to={`/read/${message.sequence}`}>
                <li>{message.subject}</li>
              </Link>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
