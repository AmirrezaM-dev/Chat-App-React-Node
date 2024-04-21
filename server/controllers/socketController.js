const expressAsyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Message = require("../models/messageModel")

const socketSendMessage = expressAsyncHandler(
	async (socket, data, callback, io) => {
		const Receiver = await User.findById(data.receiver).select("-password")
		const Sender = await User.findById(socket.user.id).select("-password")
		const { text, isEdited, isForwarded, status, type, usersRelated } = data
		const sender = Sender.id,
			receiver = Receiver.id
		const message = await Message.create({
			sender,
			receiver,
			text,
			isEdited,
			isForwarded,
			status,
			type,
			usersRelated,
		})
		if (Receiver.isConnected && sender !== receiver) {
			const receiverSocketID = Receiver.socketID
			io.to(receiverSocketID).emit("receiveMessage", {
				...message._doc,
				sender,
				receiver,
				receiver_user: Receiver,
				sender_user: Sender,
			})
		}
		callback({
			...message._doc,
			receiver_user: Receiver,
			sender_user: Sender,
		})
	}
)
const socketDisconnect = expressAsyncHandler(async (socket) => {
	try {
		await User.updateOne({ socketID: socket.id }, { isConnected: false })
		console.log(`User with id (${socket.id}) disconnected`)
	} catch (error) {
		console.log("Something went wrong while disconnecting the user")
	}
})
const socketCheckConnection = expressAsyncHandler(async (socket, callback) => {
	try {
		callback(socket.connected)
	} catch (error) {
		callback(false)
		console.log("Something went wrong while disconnecting the user")
	}
})

module.exports = { socketSendMessage, socketDisconnect, socketCheckConnection }
