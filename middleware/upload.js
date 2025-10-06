const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Dynamic storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.baseUrl.split("/").pop(); // customers, dietitians, advisors
    const dir = `uploads/${folder}`;

    // Ensure directory exists
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Pass the directory to the callback to store the file

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });
module.exports = upload;
