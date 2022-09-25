const createError = require("http-errors");
const cors = require('cors');
const compression = require("compression");
const express  = require("express");
const dotenv = require("dotenv");
//const "./fetch-polyfill.js";


const app = express();
dotenv.config();

const corsConfig = {
  origin:
    process.env.NODE_ENV === "production"
      ? [
          "https://straps.vercel.app",
          "https://straps.spheron.app/",
          "http://localhost:3000",
        ]
      : "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};
const PORT = process.env.PORT || 3050;

app.use(cors(corsConfig));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(compression());

app.use("/straps", require('./src/notification'));
app.use("/messaging", require('./src/messaging'))
app.use("/products", require('./src/products'))
//Catch 404 and forard to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    status: "ERROR",
    message: err.message,
    payload: { ...err },
  });
});

app.listen(PORT, () =>
  console.log(
    `Straps backend server started on port http://0.0.0.0.:${PORT}`
  )
);

















































// import createError from "http-errors";
// import cors from "cors";
// import compression from "compression";
// import express from "express";
// import * as dotenv from "dotenv";
// import "./fetch-polyfill.js";
// import Straps from './src/supply-chain.js';

// const app = express();
// dotenv.config();

// const corsConfig = {
//   origin:
//     process.env.NODE_ENV === "production"
//       ? [
//           "https://straps.vercel.app",
//           "https://straps.spheron.app/",
//           "http://localhost:3000",
//         ]
//       : "http://localhost:3000",
//   optionsSuccessStatus: 200,
//   credentials: true,
// };
// const PORT = process.env.PORT || 3050;

// app.use(cors(corsConfig));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(compression());

// app.use("/straps", Straps);

// //Catch 404 and forard to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send({
//     status: "ERROR",
//     message: err.message,
//     payload: { ...err },
//   });
// });

// app.listen(PORT, () =>
//   console.log(
//     `Straps backend server started on port http://0.0.0.0.:${PORT}`
//   )
// );

