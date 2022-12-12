//for simplicity and time I am posting both the route and controller for adding ticket here we will later change it to specific controllers to handle request

var express = require('express');
var router = express.Router();

let ticketController = require('../controllers/ticket');
let authController = require('../controllers/auth');

const Ticket = require('../models/tickets').Ticket




  
// // Helper function for guard purposes
// function requireAuth(req, res, next)
// {
//     // check if the user is logged in
//      // ADD YOUR CODE HERE 
//      // we are using passport isAuthenticated function to state to go next if authentication is good else redirect to signin page
//     if (req.isAuthenticated()) {
//         return next ();
//     } else {
//           //else we redirect user to signin
//           res.redirect('/users/signin') 
//     }
          

// }
/* GET list of items */
// router.get('/list', inventoryController.inventoryList);

// /* GET add ticket page. */
router.get('/add', authController.requireAuth, function(req, res, next) {

   // we create blank to do to pass to add screen
   let newTicket = Ticket({
    _id: "",
    date: "",
    priority: "",
    description: "",
});
  res.render('addTicket', {page:'addTicket', title: 'Add Ticket', ticket: newTicket, menuId:'addTicket'});
});


//Add new ticket
router.post('/add', authController.requireAuth, (req, res) => {
    //destructuring  from form body
    const {date, priority, description} = req.body;


     //We initialize newTicket as Ticket from our model
    const newTicket = new Ticket ({
      date,
      record,
      priority,
      description,
      status: "new"
    });

    //save Ticket which gives us a promise, so we handle error with console err
    newTicket.save()
    .then(ticket => {
      //if successfully we redirect to home as new ticket addition is completed
      console.log(newTicket);

      res.json('New ticket added');
    })
    .catch(err => console.log(err))

    return res.json("Error: ", err)

})


// Routers for edit I have divded the router and controller here unlike above - will do above soonish

// router.put('/edit/:id', authController.requireAuth, authController.isAllowed, ticketController.processEditPage);
router.put('/edit/:id', authController.requireAuth, ticketController.processEditPage);

router.get('/delete/:id', authController.requireAuth, ticketController.performDelete);


module.exports = router;