// //to use for database 

let {Ticket} = require('../models/tickets');

module.exports.displayEditPage = (req, res, next) => {
    
    let id= req.params.id;

    ticketModel.findById(id, (err, itemToEdit) => {
        if(err)
        {
        console.log(err);
        res.end(err);
        }
        else
        {   
        res.render('addTicket', {
            title: 'Edit Ticket',
            ticket: itemToEdit,
            userName: req.user ? req.user.username : ''
            })
        }
    
    });
}


module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id
    console.log(id)
    
    console.log(req.body);

    let updatedTicket = Ticket({
        _id: id,
        date: req.body.date,
        priority: req.body.priority,
        description: req.body.description,
        status: req.body.status 
    });


    Ticket.updateOne({_id: id}, updatedTicket, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json("Updated Successfully");

        }
    });

}


// Deletes a ticket based on its id.
module.exports.performDelete = async (req, res, next) => {

    let id = req.params.id

    console.log("I came here")

    //we find the to do first using the id and then remove it
    const deleteTicket = await ticketModel.findById(id).findOneAndRemove()

    //we redirect user to to home
    res.json('Successfully deleted')


}
