const Message = require("../../models/Message");
const User = require("../../models/User");


const getMessages = async (req, res) => {
    try {
        const messages = await Message.find()
        return res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
const createMessage = async (req, res) => {
    try {
        const { senderId, content } = req.body;

        if (!senderId || !content) {
            return res.status(400).json({
                success: false,
                message: "Sender ID and content are required",
            });
        }
        // Check if the sender exists
        const sender = await User.findById(senderId);
        if (!sender) {
            return res.status(404).json({
                success: false,
                message: "Sender not found",
            });
        }

        const newMessage = new Message({
            senderId,
            content,
        });

        await newMessage.save();

        return res.status(201).json({
            success: true,
            message: "Message created successfully",
            data: newMessage,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.body;
        const message = await Message.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Message deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = { getMessages, createMessage, deleteMessage };