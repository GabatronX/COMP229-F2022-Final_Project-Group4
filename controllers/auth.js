let passport = require('passport');
let UserModel = require('../models/user');
const Ticket = require('../models/tickets').Ticket

function getErrorMessage(err) {    
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

// helper function for guard purposes
exports.requireAuth = function(req, res, next)
{
    passport.authenticate('tokencheck', { session: false }, 
        function(err, user, info) {
            if (err) return res.status(401).json(
            { 
                success: false, 
                message: getErrorMessage(err)
            }
            );
            if (info) return res.status(401).json(
            { 
                success: false, 
                message: info.message
            }
            );
            
            req.payload = user;
            next();
      })(req, res, next);
}


// Validates the owner of the item.
exports.isAllowed = async function (req, res, next){
console.log("isAllowed running")
    try {
        let id = req.params.id
        let ticketItem = await Ticket.findById(id);   
        console.log("ticket item", ticketItem)
        
        // If there is no item found.
        if(ticketItem == null){
            throw new Error('Item not found.') // Express will catch this on its own.
        }
        else {
                console.log("payload ID"+ req.payload.id)
                
                let currentUser = await UserModel.findOne({_id: req.payload.id}, 'admin');
                console.log("Current User", currentUser)

                if(currentUser.admin != true){ // If the user is not a Admin
                    
                    console.log('====> Not authorized');
                    return res.status(403).json(
                        { 
                            success: false, 
                            message: 'User is not authorized to modify this item.'
                        }
                    );
                }     
        }
        console.log("end of if statement")

        // If it reaches this point, runs the next middleware.
        next();    
    } catch (error) {
        console.log("isAllowed failed",error);
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
    
}