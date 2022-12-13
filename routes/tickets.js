//for simplicity and time I am posting both the route and controller for adding ticket here we will later change it to specific controllers to handle request

var express = require('express');
var router = express.Router();

let ticketController = require('../controllers/ticket');
let authController = require('../controllers/auth');

const {Ticket} = require('../models/tickets')
const {getNextSequenceValue} = require('../models/counters')


//Add new ticket
router.post('/add', authController.requireAuth, (req, res) => {
    //destructuring  from form body
    const {date, priority, description} = req.body;


     //We initialize newTicket as Ticket from our model
    const newTicket = new Ticket ({
      date,
      record: date+"-"+getNextSequenceValue("ticket_id"),
      priority,
      description,
      status: "new"
    });

    //save Ticket which gives us a promise, so we handle error with console err
    return newTicket.save()
    .then(ticket => {
      //if successfully we redirect to home as new ticket addition is completed
      console.log(newTicket);

      res.json('New ticket added');
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err)
    })

})


// Routers for edit I have divded the router and controller here unlike above - will do above soonish

router.put('/edit/:id', authController.requireAuth, authController.isAllowed, ticketController.processEditPage);
// router.put('/edit/:id', authController.requireAuth, ticketController.processEditPage);

router.get('/delete/:id', authController.requireAuth, ticketController.performDelete);


module.exports = router;