import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMailDetails } from "../redux/mailSlice";
import { useParams } from "react-router-dom";
import useSetup from "../useSetup";
import SuspenseLoader from "../components/SuspenseLoader";
import styles from "./styles.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Condition from "../components/Condition";

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
          <Condition check={mails.loading}>
            <SuspenseLoader />
          </Condition>
          <Condition check={!mails.loading}>
            <p>From: {detail.from}</p>
            <p>Subject: {detail.subject}</p>
            <p dangerouslySetInnerHTML={{ __html: detail.html }} />
          </Condition>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
