const {
  createDietitian,
  updateDietitian,
  getDietitians,
} = require("../controllers/DietitianController");
const router = require("express").Router();
const upload = require("../middleware/upload");

router.get("/", getDietitians);
router.post("/create", upload.single("profileImage"), createDietitian);
router.post("/update", upload.single("profileImage"), updateDietitian);

module.exports = router;
