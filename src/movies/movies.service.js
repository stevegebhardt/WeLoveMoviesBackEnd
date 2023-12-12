const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function inTheaters() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*")
    .where({ is_showing: true })
    .groupBy("movies.movie_id");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listTheaters(movieId) {
  return knex("movies_theaters")
    .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
    .select("*")
    .where({ movie_id: movieId });
}

function listReviews(movieId) {
  return knex("reviews")
    .join("movies", "reviews.movie_id", "movies.movie_id")
    .join("critics", "reviews.critic_id", "critics.critic_id")
    .select("*")
    .where({ "movies.movie_id": movieId })
    .then((data) => {
      return data.map((review) => {
        const newReview = {
          ...review,
          critic: {
            critic_id: review.critic_id,
            preferred_name: review.preferred_name,
            surname: review.surname,
            organization_name: review.organization_name,
          },
        };
        delete newReview.critic_id;
        delete newReview.preferred_name;
        delete newReview.surname;
        delete newReview.organization_name;

        return newReview;
      });
    });
}

module.exports = {
  list,
  inTheaters,
  read,
  listTheaters,
  listReviews,
};
