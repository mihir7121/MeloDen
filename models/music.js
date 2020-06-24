var mongoose = require("mongoose");
var musicSchema = new mongoose.Schema({
    name: String,
    video: String,
    image: String,
    description: String,
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
        },
        username: String
     },
    comments:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
 });

 module.exports = mongoose.model("Music", musicSchema);

