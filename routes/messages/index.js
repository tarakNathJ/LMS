const express = require("express");
const {
    getMessages ,
    createMessage ,
    deleteMessage


} = require("../../controllers/messages-controller/index.js");

const router = express.Router();

router.get("/getAllMessages", getMessages);

router.post("/createMessages", createMessage);
router.post("/deleteMessges", deleteMessage);


module.exports = router;
