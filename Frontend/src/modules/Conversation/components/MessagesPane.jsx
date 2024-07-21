import React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesHeader from "./MessagesHeader";
import axiosRequest from "../../../utils/AxiosConfigModelApi";

export default function MessagesPane(props) {
  const { chat } = props;
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState("");

  React.useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  const handleSendMessage = async () => {
    const newId = (chatMessages.length + 1).toString();
    const userMessage = {
      id: newId,
      sender: "You",
      content: textAreaValue,
      timestamp: "Just now",
    };

    // Update chat with the user's message
    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    setTextAreaValue("");

    try {
      // Call the translation API
      const response = await axiosRequest.post("/translate", {
        text: textAreaValue,
        direction: "fr-en",
      });

      // Make sure to use the correct key for the translated text
      const translatedMessage = response.data.translated_text;

      const newMessage = {
        id: (chatMessages.length + 2).toString(),
        sender: {
          name: "AI",
          avatar: "https://example.com/avatar.jpg",
        },
        content: translatedMessage,
        timestamp: "Just now",
      };

      // Update chat with the translated message
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error translating message:", error);
      // Handle error if needed
    }
  };

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", lg: "100dvh" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      <MessagesHeader sender={chat.sender} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chatMessages.map((message, index) => {
            const isYou = message.sender === "You";
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? "row-reverse" : "row"}
              >
                {message.sender !== "You" && (
                  <Avatar size="sm" src={message.sender.avatar} />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  {...message}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={handleSendMessage}
      />
    </Sheet>
  );
}
