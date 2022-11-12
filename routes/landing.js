
let landingModel = require('../models/tickets');

module.exports.landingOpenTicket = function(req, res, next) {  
    landingModel.find((err, landingOpenTicket) => {
   
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('landing/openticket', {
                title: 'landing openticket', 
                landingOpenTicket: landingOpenTicket,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}


module.exports.opentkt = (req, res, next) => {
    
    let id = req.params.id;

    landingModel.findById(id, (err, landingToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('landing/opentkt', {
                title: 'Open a New Ticket', 
                landing: landingToShow
            })
        }
    });
}

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
        res.render('landing/add_edit', {
            title: 'Edit Item',
            landing: itemToEdit,
            })
        }
    
    });
}




module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id
    
    console.log(req.body);

    let updatedlanding = landingModel({
        _id: req.body.id,
        task: req.body.task,
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
            res.redirect('/landing/openticket');

        }
    });

}


module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;
    

    landingModel.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/landing/openticket');
        }
    });

}


module.exports.displayAddPage = (req, res, next) => {

    
    let newItem = landingModel();
    
    res.render('landing/add_edit',{
        title: 'Add a new item',
        landing: newItem,
        userName: req.user ? req.user.username : ''
    })

}

module.exports.processAddPage = (req, res, next) => {

    console.log(req.body);

    let newItem = landingModel({
        _id: req.body.id,
        task: req.body.task,
        description: req.body.description,
        complete: req.body.complete ? true : false
    });
    
    landingModel.create(newItem, (err, landing) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(landing);
            res.redirect('/landing/openticket');
        }

    });
}