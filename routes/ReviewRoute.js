const { createReview, getReviews } = require("../controllers/ReviewController");

const router = require("express").Router();

router.get("/", getReviews);
router.post("/create", createReview);

module.exports = router;
