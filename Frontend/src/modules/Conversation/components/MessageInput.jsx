import React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function MessageInput({
  textAreaValue,
  setTextAreaValue,
  onSubmit,
}) {
  const handleClick = () => {
    if (textAreaValue.trim()) {
      onSubmit();
      setTextAreaValue("");
    }
  };

  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl fullWidth>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          onChange={(e) => setTextAreaValue(e.target.value)}
          value={textAreaValue}
          minRows={1}
          maxRows={10}
          endDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              sx={{ py: 1, borderTop: "1px solid", borderColor: "divider" }}
            >
              <Stack direction="row" spacing={0.5}>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatBoldRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatItalicRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <StrikethroughSRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatListBulletedRoundedIcon />
                </IconButton>
              </Stack>
              <Button
                size="sm"
                color="primary"
                sx={{ borderRadius: "sm" }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleClick}
              >
                Send
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            "& textarea": {
              minHeight: 72,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
