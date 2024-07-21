import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import MessagesPane from "./MessagesPane";
// import { chats } from '../data'; // Remove if not used

export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState(null);

  React.useEffect(() => {
    if (!selectedChat) {
      // Set a default chat object if necessary
      setSelectedChat({
        id: "default",
        // Add other necessary properties for a default chat
      });
    }
  }, [selectedChat]);
  const chat = {
    sender: {
      name: "John Doe",
      username: "@johndoe",
      avatar: "https://example.com/avatar.jpg",
    },
    messages: [
      {
        id: "1",
        sender: {
          name: "AI",
          avatar: "https://example.com/avatar.jpg",
          online: true,
        },
        content: "Hello! Please enter the text you'd like to translate.",
        timestamp: "10:00 AM",
      },
    ],
  };
  return (
    <Sheet
      sx={{
        flex: 1,
        width: "100%",
        mx: "auto",
        pt: { xs: "var(--Header-height)", sm: 0 },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: " 1fr",
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: "fixed", sm: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
            sm: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 100,
          width: "100%",
          top: 52,
        }}
      >
        {/* If ChatsPane is still needed, adjust props accordingly */}
        {/* <ChatsPane
          selectedChatId={selectedChat?.id}
          setSelectedChat={setSelectedChat}
        /> */}
      </Sheet>
      <MessagesPane chat={chat} />
    </Sheet>
  );
}
