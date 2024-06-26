const expressAsyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Message = require("../models/messageModel")
const Blacklist = require("../models/blacklistModel")
const ObjectId = require("mongoose").Types.ObjectId

const socketSendMessage = expressAsyncHandler(
	async (socket, data, callback, io) => {
		const Receiver = await User.findById(data.receiver).select("-password")
		const Sender = await User.findById(socket.user.id).select("-password")
		const { text, isEdited, isForwarded, status, type, usersRelated } = data
		const sender = Sender.id,
			receiver = Receiver.id
		const Blocked = await Blacklist.findOne({
			relatedUser: Receiver._id,
			blacklistUser: socket.user.id,
		})
		const message = await Message.create({
			sender,
			receiver,
			text,
			isEdited,
			isForwarded,
			status,
			type,
			usersRelated,
			isReceiverDeleted: Blocked ? true : false,
		})
		if (Receiver.isConnected && sender !== receiver && !Blocked) {
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
const socketDeleteMessage = expressAsyncHandler(
	async (socket, data, callback, io) => {
		try {
			const { message, deleteForEveryone } = data
			const { _id } = message
			const deleteUpdateObject =
				deleteForEveryone || message.sender === message.receiver
					? { isDeleted: true }
					: socket.user.id === message.sender
					? { isSenderDeleted: true }
					: {
							isReceiverDeleted: true,
					  }
			const deletedMessage = await Message.findOneAndUpdate(
				{
					_id,
					$or: [
						{ receiver: socket.user.id },
						{ sender: socket.user.id },
					],
				},
				deleteUpdateObject,
				{ new: true }
			)
			if (deletedMessage) {
				const Receiver = await User.findById(
					deletedMessage.receiver
				).select("-password")
				const Sender = await User.findById(
					deletedMessage.sender
				).select("-password")
				if (deleteForEveryone) {
					const OtherUser =
						socket.user.id === message.sender ? Receiver : Sender
					const Blocked = await Blacklist.findOne({
						relatedUser: OtherUser._id,
						blacklistUser: socket.user.id,
					})
					if (
						OtherUser.isConnected &&
						Receiver._id.toString() !== Sender._id.toString() &&
						!Blocked
					) {
						io.to(OtherUser.socketID).emit("deleteMessage", {
							...deletedMessage._doc,
							receiver_user: Receiver,
							sender_user: Sender,
						})
					}
				}
				callback({ success: true })
			} else {
				callback({ success: false })
			}
		} catch (error) {
			callback({ success: false })
			console.log(error)
			throw new Error(`Something went wrong ${error}`)
		}
	}
)
const socketDeleteAllMessages = expressAsyncHandler(
	async (socket, data, callback, io) => {
		try {
			const { OtherUserID, deleteForEveryone } = data
			if (OtherUserID !== socket.user.id) {
				await Message.updateMany(
					{
						$or: [
							{
								receiver: socket.user.id,
								sender: OtherUserID,
								isReceiverDeleted: { $ne: true },
							},
							{
								receiver: OtherUserID,
								sender: socket.user.id,
								isSenderDeleted: { $ne: true },
							},
							{
								receiver: socket.user.id,
								sender: socket.user.id,
								isDeleted: { $ne: true },
							},
						],
					},
					[
						{
							$set: {
								isReceiverDeleted: {
									$or: [
										{
											$eq: [
												"$receiver",
												new ObjectId(socket.user.id),
											],
										},
										{
											$eq: ["$isReceiverDeleted", true],
										},
									],
								},
								isSenderDeleted: {
									$or: [
										{
											$eq: [
												"$sender",
												new ObjectId(socket.user.id),
											],
										},
										{
											$eq: ["$isSenderDeleted", true],
										},
									],
								},
								isDeleted: {
									$or: [
										{
											$and: [
												{
													$eq: [
														"$sender",
														new ObjectId(
															socket.user.id
														),
													],
												},
												{
													$eq: [
														"$receiver",
														new ObjectId(
															socket.user.id
														),
													],
												},
											],
										},
										{
											$eq: [deleteForEveryone, true],
										},
										{
											$eq: ["$isDeleted", true],
										},
									],
								},
							},
						},
					]
				)
				if (deleteForEveryone) {
					const OtherUser = await User.findById(OtherUserID)
					const Blocked = await Blacklist.findOne({
						relatedUser: OtherUser._id,
						blacklistUser: socket.user.id,
					})
					if (
						OtherUser.isConnected &&
						OtherUserID !== socket.user.id &&
						!Blocked
					)
						io.to(OtherUser.socketID).emit("deleteAllMessages", {
							OtherUserID: socket.user.id,
						})
				}
				callback({ success: true })
			} else {
				await Message.updateMany(
					{
						receiver: socket.user.id,
						sender: socket.user.id,
					},
					{
						isDeleted: true,
						isSenderDeleted: true,
						isReceiverDeleted: true,
					}
				)
				callback({ success: true })
			}
		} catch (error) {
			callback({ success: false })
			console.log(error)
			throw new Error(`Something went wrong ${error}`)
		}
	}
)
const socketEditMessage = expressAsyncHandler(
	async (socket, data, callback, io) => {
		try {
			const { id, text } = data
			const updatedMesssage = await Message.findOneAndUpdate(
				{
					_id: id,
					$or: [
						{ receiver: socket.user.id },
						{ sender: socket.user.id },
					],
				},
				{ text },
				{ new: true }
			)
			if (updatedMesssage) {
				const Receiver = await User.findById(
					updatedMesssage.receiver
				).select("-password")
				const Sender = await User.findById(
					updatedMesssage.sender
				).select("-password")
				const OtherUser =
					socket.user.id === updatedMesssage.sender.toString()
						? Receiver
						: Sender
				const Blocked = await Blacklist.findOne({
					relatedUser: OtherUser._id,
					blacklistUser: socket.user.id,
				})
				if (
					OtherUser.isConnected &&
					Receiver._id.toString() !== Sender._id.toString() &&
					!Blocked
				) {
					io.to(OtherUser.socketID).emit("editMessage", {
						...updatedMesssage._doc,
						receiver_user: Receiver,
						sender_user: Sender,
					})
				}
				callback({ success: true })
			} else callback({ success: false })
		} catch (error) {
			callback({ success: false })
			console.log(error)
			throw new Error(`Something went wrong ${error}`)
		}
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

module.exports = {
	socketSendMessage,
	socketDeleteMessage,
	socketDeleteAllMessages,
	socketEditMessage,
	socketDisconnect,
	socketCheckConnection,
}
