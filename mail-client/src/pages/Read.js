import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMailDetails } from "../redux/mailSlice";
import { useParams } from "react-router-dom";
import useSetup from "../useSetup";
import SuspenseLoader from "../components/SuspenseLoader";

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
    <div>
      {mails.loading && <SuspenseLoader />}
      <p>Read Mail</p>
      <p>{detail.from}</p>
      <p>{detail.subject}</p>
      <p>{detail.text}</p>
    </div>
  );
}
