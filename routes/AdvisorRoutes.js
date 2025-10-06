const {
  getAdvisors,
  createAdvisor,
  updateAdvisor,
} = require("../controllers/AdvisorController");

const router = require("express").Router();
const upload = require("../middleware/upload");

router.get("/", getAdvisors);
router.post("/create", upload.single("profileImage"), createAdvisor);
router.post("/update", upload.single("profileImage"), updateAdvisor);

module.exports = router;
