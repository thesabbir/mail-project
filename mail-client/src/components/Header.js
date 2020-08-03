import React from "react";
import styles from "./components.module.css";
import Button from "./Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import Condition from "./Condition";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const toCompose = () => navigate("/compose");
  const toHome = () => navigate("/");
  const composePage = () => location.pathname.includes("compose");

  return (
    <header className={styles.header}>
      <h3 className={styles.logo} onClick={toHome}>
        SweetBox
      </h3>
      <div>
        <Condition check={!composePage()}>
          <Button onClick={toCompose}>Compose</Button>
        </Condition>
      </div>
    </header>
  );
}
