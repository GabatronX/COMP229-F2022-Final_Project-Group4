//for simplicity and time I am posting both the route and controller for adding ticket here we will later change it to specific controllers to handle request

var express = require("express");

const { session } = require("passport");
const { request } = require("../app");

var router = express.Router();

//we bring the User model from models
const Ticket = require("../models/tickets").Ticket;

//we use this as controller object
let ticketController = require("../controllers/ticket");

// Helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  // ADD YOUR CODE HERE
  // we are using passport isAuthenticated function to state to go next if authentication is good else redirect to signin page
  if (req.isAuthenticated()) {
    return next();
  } else {
    //else we redirect user to signin
    res.redirect("/users/signin");
  }
}

/* GET add ticket page. */
router.get("/add", requireAuth, function (req, res, next) {
  // we create blank to do to pass to add screen
  let newTicket = Ticket({
    _id: "",
    date: "",
    description: "",
    complete: false,
  });
  res.render("addTicket", {
    page: "addTicket",
    title: "Add Ticket",
    ticket: newTicket,
    menuId: "addTicket",
  });
});

//Add new ticket
router.post("/add", requireAuth, (req, res) => {
  //destructuring  from form body
  const { date, description, complete } = req.body;

  //We initialize newTicket as Ticket from our model
  const newTicket = new Ticket({
    date,
    description,
    complete,
  });

  //save Ticket which gives us a promise, so we handle error with console err
  newTicket
    .save()
    .then((ticket) => {
      //if successfully we redirect to home as new ticket addition is completed
      console.log(newTicket);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

// Routers for edit I have divded the router and controller here unlike above - will do above soonish
// router.get("/edit/:id", requireAuth, ticketController.displayEditPage);
router.post("/edit/:id", requireAuth, ticketController.processEdit);

router.get("/delete/:id", requireAuth, ticketController.performDelete);

module.exports = router;
