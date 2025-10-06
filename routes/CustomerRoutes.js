const {
  getCustomers,
  createCustomer,
  updateCustomer,
  singleCustomer,
  deleteCustomer,
  register,
  login,
} = require("../controllers/CustomerController");

const router = require("express").Router();
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getCustomers);
router.post("/create", upload.single("profileImage"), createCustomer);
router.post("/update", upload.single("profileImage"), updateCustomer);
router.get("/:id/reviews", getCustomers);
router.get("/:id", singleCustomer);
router.post("/delete", deleteCustomer);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
