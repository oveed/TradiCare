const express = require("express");
const router = express.Router();
const {
  createConversation,
  updateConversation,
  deleteConversation,
  getConversationsByUserId,
} = require("../controllers/ConversationController");

router.post("/add", createConversation);
router.patch("/edit/:conversationId", updateConversation);
router.delete("/delete/:conversationId", deleteConversation);
router.get("/get-conversations/:userId", getConversationsByUserId);

module.exports = router;
