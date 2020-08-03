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
  const hideCompose = () =>
    location.pathname.includes("compose") ||
    location.pathname.includes("setup");

  return (
    <header className={styles.header}>
      <h3 className={styles.logo} onClick={toHome}>
        SweetBox
      </h3>
      <div>
        <Condition check={!hideCompose()}>
          <Button onClick={toCompose}>Compose</Button>
        </Condition>
      </div>
    </header>
  );
}
