import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function useSetup() {
  const data = useSelector((store) => store.setup);
  const navigate = useNavigate();
  useEffect(() => {
    if (!data.email || !data.host || !data.password || !data.smtp) {
      return navigate("/setup");
    }
  }, [data]);
}
