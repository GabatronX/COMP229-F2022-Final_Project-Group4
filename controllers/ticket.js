// //to use for database 

let landingModel = require('../models/tickets').Ticket;

// module.exports.landingOpentkt = function(req, res, next) {  
//     landingModel.find((err, landingOpentkt) => {
//         console.log(landingOpentkt);
//         if(err)
//         {
//             return console.error(err);
//         }
//         else
//         {
//             res.render('landing/opentkt', {
//                 title: 'landing Opentkt', 
//                 landingOpentkt: landingOpentkt,
//                 userName: req.user ? req.user.username : ''
//             })            
//         }
//     });
// }


// // Gets a landing by id and renders the details page.
// module.exports.details = (req, res, next) => {
    
//     let id = req.params.id;

//     landingModel.findById(id, (err, landingToShow) => {
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             //show the edit view
//             res.render('landing/details', {
//                 title: 'Ticket Details', 
//                 landing: landingToShow
//             })
//         }
//     });
// }


module.exports.displayEditPage = (req, res, next) => {
    
    let id= req.params.id;

    landingModel.findById(id, (err, itemToEdit) => {
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
    
    console.log(req.body);

    let updatedlanding = landingModel({
        _id: req.body.id,
        date: req.body.date,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });


    landingModel.updateOne({_id: id}, updatedlanding, (err) =>{
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
    const deleteTicket = await landingModel.findById(id).findOneAndRemove()

    //we redirect user to to home
    res.json('Successfully deleted')


}


// module.exports.displayOpenTicket = (req, res, next) => {
 
//     let newItem = landingModel();
    
//     res.render('landing/opentkt',{
//         title: 'Open a New Ticket',
//         landing: newItem,
//         userName: req.user ? req.user.username : ''
//     })

// }


// module.exports.processOpenTicket = (req, res, next) => {

//     console.log(req.body);

//     let newItem = landingModel({
//         _id: req.body.id,
//         date: req.body.date,
//         description: req.body.description,
//         complete: req.body.complete ? true : false
//     });
    
//     landingModel.create(newItem, (err, landing) =>{
//         if(err)
//         {
//             console.log(err);
//             res.end(err);
//         }
//         else
//         {
//             console.log(landing);
//             res.redirect('/landing/opentkt');
//         }

//     });
// }