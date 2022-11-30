// //to use for database

const { Ticket } = require("../models/tickets");
function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  }
  if (err.message) {
    return err.message;
  }
  return "Unknown server error";
}

module.exports.ticketList = async function (req, res, next) {
  try {
    const tickets = await Ticket.find().populate({ path: "owner" });
    res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};
module.exports.processEdit = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Invalid");

    const updatedTicket = Ticket({
      _id: id,
      date: req.body.date,
      description: req.body.description,
      complete: Boolean(req.body.complete),
      owner: req.body.owner ? req.body.owner : req.payload.id,
    });

    Ticket.updateOne({ _id: id }, updatedTicket, (err, result) => {
      if (err || result.modifiedCount === 0) {
        res.status(400).json({
          success: false,
          message: err ? getErrorMessage(err) : "Item Not Found.",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Item updated successfully",
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

// Deletes a ticket based on its id.
module.exports.performDelete = async (req, res, next) => {
  let id = req.params.id;

  console.log("I came here");

  //we find the to do first using the id and then remove it
  const deleteTicket = await landingModel.findById(id).findOneAndRemove();

  //we redirect user to to home
  res.redirect("/");
};
