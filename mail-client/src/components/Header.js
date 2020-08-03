import React from "react";
import styles from "./components.module.css";
import Button from "./Buttons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const toCompose = () => navigate("/compose");
  return (
    <header className={styles.header}>
      <h3 className={styles.logo}>SweetBox</h3>
      <div>
        <Button onClick={toCompose}>Compose</Button>
      </div>
    </header>
  );
}
