const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(review_id) {
  console.log("ID", review_id);
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  delete: destroy,
};
