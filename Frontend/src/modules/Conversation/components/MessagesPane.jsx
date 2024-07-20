import React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesHeader from "./MessagesHeader";
import axiosRequest from "../../../utils/AxiosConfig";

export default function MessagesPane(props) {
  const { chat } = props;
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState("");

  React.useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  const handleSendMessage = () => {
    const newId = (chatMessages.length + 1).toString();
    setChatMessages([
      ...chatMessages,
      {
        id: newId,
        sender: "You",
        content: textAreaValue,
        timestamp: "Just now",
      },
    ]);
    setTextAreaValue("");
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
