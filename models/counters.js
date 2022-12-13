
const mongoose = require('mongoose');


const CountersSchema = new mongoose.Schema(
    {
   sequence_value: {
        type: Number,
        required: false
    }
},
{
    collection: "counters"
}
  );


const Counters = mongoose.model('Counter', CountersSchema);

//we are exporting ticket data directly so we can use in our table
module.exports = {Counters}

 module.exports.getNextSequenceValue=(sequenceName)=>{
    var sequenceDocument = Counters.findOneAndUpdate(sequenceName,
        
        {$inc:{sequence_value:1}},
        {new:true}
     );
     return sequenceDocument.sequence_value;
 }