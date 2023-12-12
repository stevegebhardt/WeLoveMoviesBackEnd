const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then(() =>
      knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .then((data) => {
          return data.map((review) => {
            const newReview = {
              ...review,
              critic: {
                preferred_name: review.preferred_name,
                surname: review.surname,
                organization_name: review.organization_name,
              },
            };
            delete newReview.preferred_name;
            delete newReview.surname;
            delete newReview.organization_name;

            return newReview;
          })[0];
        })
    );
}

module.exports = {
  read,
  update,
  delete: destroy,
};
