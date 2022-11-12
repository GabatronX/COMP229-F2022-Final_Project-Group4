//for simplicity and time I am posting both the route and controller for adding ticket here we will later change it to specific controllers to handle request

var express = require('express');
var router = express.Router();

//we bring the User model from models
const Ticket = require('../models/tickets').Ticket

//we use this as controller object
let ticketController = require('../controllers/ticket');

/* GET add ticket page. */
router.get('/add', function(req, res, next) {

   // we create blank to do to pass to add screen
   let newTicket = Ticket({
    _id: "",
    date: "",
    description: "",
    complete: false
});
  res.render('addTicket', {page:'addTicket', title: 'Add Ticket', ticket: newTicket, menuId:'addTicket'});
});

//Add new ticket
router.post('/add', (req, res) => {
    //destructuring  from form body
    const {date, description, complete} = req.body;


     //We initialize newTicket as Ticket from our model
    const newTicket = new Ticket ({
      date,
      description,
      complete
    });

    //save Ticket which gives us a promise, so we handle error with console err
    newTicket.save()
    .then(ticket => {
      //if successfully we redirect to home as new ticket addition is completed
      console.log(newTicket);
      res.redirect('/');
    })
    .catch(err => console.log(err))

})


// Routers for edit I have divded the router and controller here unlike above - will do above soonish
router.get('/edit/:id',  ticketController.displayEditPage);
router.post('/edit/:id',  ticketController.processEditPage);

router.get('/delete/:id',  ticketController.performDelete);


module.exports = router;