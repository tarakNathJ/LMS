const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps: true
});
module.exports = mongoose.model("Message", MessageSchema);

