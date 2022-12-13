/* exports.home = function(req, res, next) {
    //console.log('===> Original URL: ' + req.session.url);
    res.render('index', { 
        title: 'Home',
        userName: req.user ? req.user.username : ''
    });
}; */


// // create a reference to the model
// let TicketModel = require('../models/tickets');

// // Gets all tickets from the Database and renders the page to list them all.
// module.exports.home = function(req, res, next) {  

//     TicketModel.find((err, tickets) => {
//         //console.log(todoList);
//         if(err)
//         {
//             return console.error(err);
//         }
//         else
//         {
//             res.render('index', {
//                 title: 'Home', 
//                 ticketData: tickets,
//                 userName: req.user ? req.user.username : ''
//             })    
                   
//         }
//     });
// }


//we use this controller to load conactsData

var fetchModel= require('../models/tickets');
module.exports={
 
    fetchData:function(req, res){
      
      fetchModel.fetchData(function(data){
          res.json({Tickets: data})
      })

    }
}