import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import Imap from "imap";

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.json(
    {
      hello: "world",
    },
    200
  );
});

/**
 * List recent emails
 */
app.post("/api/mails", async (req, res) => {
  const user = req.body.email;
  const password = req.body.password;
  const host = req.body.host;
  const port = req.body.port || 993;

  const imap = new Imap({
    user,
    password,
    host,
    port,
    tls: true,
    authTimeout: 100000,
    connTimeout: 100000,
    tlsOptions: { rejectUnauthorized: false },
  });

  const openInbox = (cb) => {
    console.log("Opening inbox");
    imap.openBox("INBOX", true, cb);
  };

  imap.once("ready", () => {
    console.log("Ready");
    openInbox((error, inbox) => {
      let messages = [];
      if (error) throw error;
      // fetch last 10
      const fetch = imap.seq.fetch(inbox.messages.total - 10 + ":*", {
        bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
        struct: true,
      });
      fetch.on("message", (message, sequence) => {
        console.log("Reading inbox");
        message.on("body", (stream) => {
          let buffer = "";
          stream.on("data", (chunk) => {
            buffer += chunk.toString("UTF-8");
          });
          stream.once("end", () => {
            const from = Imap.parseHeader(buffer).from[0];
            const date = Imap.parseHeader(buffer).date[0];
            const subject = Imap.parseHeader(buffer).subject[0];

            const message = {
              sequence,
              date,
              from,
              subject,
            };
            messages.push(message);
          });
        });
      });
      fetch.once("error", (err) => res.send("Error" + err));
      fetch.once("end", () => {
        imap.end();
        messages = messages.reverse();
        return res.status(200).json({
          messages,
          error: false,
        });
      });
    });
  });
  imap.once("error", (error) => {
    console.error(error);
    res.status(500).json({
      error: true,
      message: "IMAP connection error",
    });
  });

  imap.once("end", function () {
    console.log("IMAP Connection ended");
  });
  imap.connect();
});

export default app;
