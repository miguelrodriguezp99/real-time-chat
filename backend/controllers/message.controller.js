import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    console.log;

    //Buscamos si existe alguna conversación entre el usuario que envía el mensaje y el usuario que lo recibe
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, //Busca una conversacion que tenga todos esos campos
    });

    //Si no existe una conversación entre los dos usuarios, la creamos
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
    }

    // await conversation.save();
    // await newMessage.save();
    // Optimización de lo de arriba para que se ejecute en paralelo
    await Promise.all([conversation.save(), newMessage.save()]);

    // ---- SOCKET IO -----------------------------------------------------------------
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // -------------------------------------------------------------------------------

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal server error2" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
