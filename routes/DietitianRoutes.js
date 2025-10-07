const {
  createDietitian,
  updateDietitian,
  getDietitians,
  register,
  login,
} = require("../controllers/DietitianController");
const router = require("express").Router();
const upload = require("../middleware/upload");

router.get("/", getDietitians);
router.post("/create", upload.single("profileImage"), createDietitian);
router.post("/update", upload.single("profileImage"), updateDietitian);

/* Authentication */
router.post("/register", register);
router.post("/login", login);

module.exports = router;
