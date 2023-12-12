const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  if (req.query.is_showing === "true") {
    const data = await service.inTheaters();
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

async function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function listTheaters(req, res, next) {
  res.json({ data: await service.listTheaters(req.params.movieId) });
}

async function listReviews(req, res, next) {
  res.json({ data: await service.listReviews(req.params.movieId) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  inTheaters: [asyncErrorBoundary(this.inTheaters)],
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [asyncErrorBoundary(listTheaters)],
  listReviews: [asyncErrorBoundary(listReviews)],
};
