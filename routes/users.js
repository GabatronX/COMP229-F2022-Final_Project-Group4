let express = require("express");
let router = express.Router();
let usersController = require("../controllers/user");

//For test, checking users
router.get("/", usersController.getUsers);
// Routes for sign-up
router.post("/signup", usersController.signup);

// Routes for sign-in
router.post("/signin", usersController.signin);

module.exports = router;
