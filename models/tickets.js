
//Ticket model

//we will be creating the ticket schema here with mongoose
const mongoose = require('mongoose');

const TicketsSchema = new mongoose.Schema(
    {
   date: {
        type: String,
        required: false
    },
    record: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    collection: "tickets"
}
  );


const Ticket = mongoose.model('Ticket', TicketsSchema);

//we are exporting ticket data directly so we can use in our table
module.exports = {

    fetchData:function(callback){
        const ticketData = Ticket.find({});
        ticketData.exec(function(err,data){
            if(err) throw err;
            return callback(data);
        })
    }, 
    Ticket
}