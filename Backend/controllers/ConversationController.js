const Conversation = require("../models/ConversationModel");
const Counter = require("../models/CounterModel");

const createConversation = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "autovalConversations" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newConversation = await Conversation.create({
      id: counter.seq,
      userId: req.body.userId,
      patientId: req.body.patientId,
      messages: req.body.messages || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json(newConversation);
  } catch (error) {
    console.error("Error creating conversation:", error.message);
    res.status(400).json({ error: error.message });
  }
};

const updateConversation = async (req, res) => {
  const { convId } = req.params;
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { convId: convId },
      { $set: { ...req.body, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedConversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json({
      conversation: updatedConversation,
      message: "Conversation updated successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error updating conversation:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteConversation = async (req, res) => {
  const { convId } = req.params;
  try {
    const deletedConversation = await Conversation.findOneAndDelete({
      convId: convId,
    });
    if (!deletedConversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.status(200).json({
      conversation: deletedConversation,
      message: "Conversation deleted successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error deleting conversation:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getConversationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({ userId: userId });

    res.status(200).json({
      status: "success",
      message: "Conversations retrieved successfully",
      conversations: conversations,
    });
  } catch (error) {
    console.error("Error retrieving conversations:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createConversation,
  updateConversation,
  deleteConversation,
  getConversationsByUserId,
};
