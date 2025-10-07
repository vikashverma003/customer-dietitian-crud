const {
  getCustomers,
  createCustomer,
  updateCustomer,
  singleCustomer,
  deleteCustomer,
  register,
  login,
  createCustomerByOther,
  getAllCustomerByOthers,
  getSingleCustomerByOthers,
} = require("../controllers/CustomerController");

const router = require("express").Router();
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");

/* Start Role specific access of the routes*/
router.get(
  "/getAllCustomer",
  protect,
  authorizeRole("dietitian", "advisor"),
  getAllCustomerByOthers
);

/*END*/

router.get("/", protect, getCustomers);
router.post("/create", upload.single("profileImage"), createCustomer);
router.post("/update", upload.single("profileImage"), updateCustomer);
router.get("/:id/reviews", getCustomers);
router.get("/:id", singleCustomer);
router.post("/delete", deleteCustomer);
router.post("/register", register);
router.post("/login", login);

router.post(
  "/createCustomerByOther",
  protect,
  authorizeRole("advisor", "admin"),
  createCustomerByOther
);

router.get(
  "/:id/getSingleCustomerByOthers",
  protect,
  getSingleCustomerByOthers
);

module.exports = router;
