import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMailDetails } from "../redux/mailSlice";
import { useParams } from "react-router-dom";
import useSetup from "../useSetup";

export default function Read() {
  useSetup();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.setup);
  const detail = useSelector((store) => store.mails.detail);
  const params = useParams();

  useEffect(() => {
    dispatch(
      fetchMailDetails({
        ...data,
        ...params,
      })
    );
  }, []);
  return;
}
