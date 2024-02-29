import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    //Buscamos si existe alguna conversación entre el usuario que envía el mensaje y el usuario que lo recibe
    const conversation = await Conversation.findOne({
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

    // SOCKET IO WILL GO HERE

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userToChatWithId = req.params.id;
    const senderId = req.user._id; //esto viene del middleware de protectRoute.js

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatWithId] },
    }).populate("messages"); //populates nos da también todos los datos de cada mensaje de la conversación

    if (!conversation) return res.status(200).json({ messages: [] });

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
