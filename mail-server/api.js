import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import Imap from "imap";
import MailParser from "mailparser";
import nodemailer from "nodemailer";

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
  let messages = [];

  const openInbox = (cb) => {
    console.log("Opening inbox");
    imap.openBox("INBOX", true, cb);
  };

  imap.once("ready", () => {
    console.log("Ready");
    openInbox((error, inbox) => {
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
      });
    });
  });
  imap.once("error", (error) => {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "IMAP connection error",
    });
  });

  imap.once("end", function () {
    console.log("IMAP Connection ended");
    messages = messages.reverse();
    return res.status(200).json({
      messages,
      error: false,
    });
  });
  imap.connect();
});

/**
 * Read single email
 */

app.post("/api/mail", (req, res) => {
  const user = req.body.email;
  const password = req.body.password;
  const sequence = req.body.sequence;
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

  let mailHolder = {};

  const openInbox = (cb) => {
    imap.openBox("INBOX", true, cb);
  };

  imap.once("ready", () => {
    openInbox((error) => {
      if (error) throw error;
      // fetch mail
      const fetch = imap.seq.fetch(sequence, {
        bodies: ["HEADER", "TEXT", ""],
        struct: true,
      });

      fetch.on("message", (message) => {
        message.on("body", (stream, info) => {
          let buffer = "";
          stream.on("data", (chunk) => {
            buffer += chunk.toString("UTF-8");
            MailParser.simpleParser(buffer, (err, mail) => {
              mailHolder.text = mail.text;
              mailHolder.html = mail.html;
            });
          });
          stream.once("end", () => {
            if (info.which !== "TEXT") {
              const from = Imap.parseHeader(buffer).from[0];
              const date = Imap.parseHeader(buffer).date[0];
              const subject = Imap.parseHeader(buffer).subject[0];
              mailHolder.sequence = sequence;
              mailHolder.from = from;
              mailHolder.date = date;
              mailHolder.subject = subject;
            }
          });
        });
      });

      fetch.once("end", () => {
        imap.end();
      });
    });
  });

  imap.once("error", (error) => {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "IMAP connection error",
    });
  });

  imap.once("end", () => {
    console.log("IMAP Connection ended");
    return res.status(200).json({
      detail: mailHolder,
      error: false,
    });
  });
  imap.connect();
});

app.post("/api/send", async (req, res) => {
  const user = req.body.email;
  const pass = req.body.password;
  const host = req.body.host;
  const port = req.body.port || 587;
  const secure = port === 465;
  const to = req.body.to;
  const subject = req.body.subject;
  const text = req.body.text;
  const html = req.body.html;

  try {
    // SCALE: need a Q [redis/rabbit] to speed things up here
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const results = await transporter.sendMail({
      from: user,
      to,
      subject,
      text,
      html,
    });

    return res.status(201).json({
      error: false,
      message: "Mail sent",
      id: results.messageId,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: true,
      message: "Server error!",
    });
  }
});

export default app;
