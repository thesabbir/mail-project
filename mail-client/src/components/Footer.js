import React from "react";
import styles from "./components.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerNote}>
        © {new Date().getFullYear()} by SweetMail
      </p>
    </footer>
  );
}
