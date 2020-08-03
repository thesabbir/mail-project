import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";


const app = express();

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/api', (req, res) => {
    res.json({
        hello: 'world'
    }, 200)
});

export default app;
