const {
  getCustomers,
  createCustomer,
  updateCustomer,
  singleCustomer,
  deleteCustomer,
} = require("../controllers/CustomerController");

const router = require("express").Router();
const upload = require("../middleware/upload");

router.get("/", getCustomers);
router.post("/create", upload.single("profileImage"), createCustomer);
router.post("/update", upload.single("profileImage"), updateCustomer);
router.get("/:id/reviews", getCustomers);
router.get("/:id", singleCustomer);
router.post("/delete", deleteCustomer);

module.exports = router;
