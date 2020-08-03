import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMailDetails } from "../redux/mailSlice";
import { useParams } from "react-router-dom";
import useSetup from "../useSetup";
import SuspenseLoader from "../components/SuspenseLoader";
import styles from "./styles.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Read() {
  useSetup();
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((store) => store.setup);
  const mails = useSelector((store) => store.mails);
  const detail = mails.detail[params.sequence] || {};

  useEffect(() => {
    dispatch(
      fetchMailDetails({
        ...data,
        ...params,
      })
    );
  }, []);

  return (
    <React.Fragment>
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.mailContents}>
          {mails.loading && <SuspenseLoader />}
          <p>From: {detail.from}</p>
          <p>Subject: {detail.subject}</p>

          <p dangerouslySetInnerHTML={{ __html: detail.html }} />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
