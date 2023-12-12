if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);

// app.use((request, _response, next) => {
//   next({ status: 404, message: `Not found: ${request.originalUrl}` });
// });

// // Error handler
// app.use((error, _request, response, _next) => {
//   const { status = 500, message = "Something went wrong!" } = error;
//   response.status(status).json({ error: message });
// });

app.use(notFound);
app.use(errorHandler);

module.exports = app;
