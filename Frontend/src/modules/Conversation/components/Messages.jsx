import React from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CircleIcon from "@mui/icons-material/Circle";

const messages = [
  {
    name: "Steveee E.",
    username: "@steveEberger",
    time: "5 mins ago",
    message: "Hi Olivia, I am currently working on the project.",
    avatar: "/static/images/avatar/2.jpg",
    status: "success",
  },
  {
    name: "Katherine Moss",
    username: "@kathy",
    time: "5 mins ago",
    message: "Hi Olivia, I am thinking about taking a vacation.",
    avatar: "/static/images/avatar/3.jpg",
    status: "neutral",
  },
  {
    name: "Phoenix Baker",
    username: "@phoenix",
    time: "5 mins ago",
    message: "Hey!",
    avatar: "/static/images/avatar/1.jpg",
    status: "success",
  },
  {
    name: "Eleanor Pena",
    username: "@eleanor",
    time: "5 mins ago",
    message:
      "Hey Olivia, I was thinking about doing some home improvement work.",
    avatar: "/static/images/avatar/4.jpg",
    status: "neutral",
  },
  {
    name: "Kenny Peterson",
    username: "@kenny",
    time: "5 mins ago",
    message: "Sup",
    avatar: "/static/images/avatar/5.jpg",
    status: "success",
  },
];

const MainContent = () => {
  return (
    <main>
      <Box className="MainContent MuiBox-root css-1rr4qq7">
        <Box className="MuiSheet-root MuiSheet-variantPlain MuiSheet-colorNeutral css-1uivjhz">
          <Box className="MuiSheet-root MuiSheet-variantPlain MuiSheet-colorNeutral css-1f05m9x">
            <Box className="MuiSheet-root MuiSheet-variantPlain MuiSheet-colorNeutral css-5jlg7o">
              <Box className="MuiStack-root css-1tveafo">
                <Typography
                  variant="body-md"
                  className="MuiTypography-root MuiTypography-body-md css-k7tjzo"
                >
                  Messages
                  <span className="MuiTypography-endDecorator css-styn74">
                    <Badge className="MuiChip-root MuiChip-colorPrimary MuiChip-sizeMd MuiChip-variantSoft css-1ypi1wc">
                      4
                    </Badge>
                  </span>
                </Typography>
                <IconButton
                  aria-label="edit"
                  className="MuiIconButton-root MuiIconButton-variantPlain MuiIconButton-colorNeutral MuiIconButton-sizeSm css-e08t02"
                >
                  <EditNoteRoundedIcon className="MuiSvgIcon-root MuiSvgIcon-fontSizeXl2 css-l6vif8" />
                </IconButton>
                <IconButton
                  aria-label="close"
                  className="MuiIconButton-root MuiIconButton-variantPlain MuiIconButton-colorNeutral MuiIconButton-sizeSm css-zfey1a"
                >
                  <CloseRoundedIcon className="MuiSvgIcon-root MuiSvgIcon-fontSizeXl2 css-l6vif8" />
                </IconButton>
              </Box>
              <Box className="MuiBox-root css-l4i6rb">
                <TextField
                  className="MuiInput-root MuiInput-variantOutlined MuiInput-colorNeutral MuiInput-sizeSm css-1teled2"
                  placeholder="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon className="MuiSvgIcon-root MuiSvgIcon-fontSizeXl2 css-l6vif8" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <List className="MuiList-root MuiList-vertical MuiList-variantPlain MuiList-colorNeutral MuiList-sizeMd css-1swnolw">
                {messages.map((message, index) => (
                  <React.Fragment key={index}>
                    <ListItem className="MuiListItem-root MuiListItem-colorNeutral MuiListItem-variantPlain css-3q61x9">
                      <Box
                        className="MuiListItemButton-root MuiListItemButton-colorNeutral MuiListItemButton-variantPlain css-83yxrd"
                        role="button"
                        tabIndex="0"
                      >
                        <Box className="MuiStack-root css-w6mnnp">
                          <Badge
                            className="MuiBadge-root css-bmusi"
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <CircleIcon
                                className={`MuiBadge-badge MuiBadge-anchorOriginBottomRight MuiBadge-variantSolid MuiBadge-color${message.status} MuiBadge-sizeSm css-1tnk1kx`}
                              />
                            }
                          >
                            <Avatar
                              className="MuiAvatar-root MuiAvatar-variantSoft MuiAvatar-colorNeutral MuiAvatar-sizeSm css-1bxiwce"
                              src={message.avatar}
                            />
                          </Badge>
                          <Box className="MuiBox-root css-1rr4qq7">
                            <Typography className="MuiTypography-root MuiTypography-title-sm css-k55y3c">
                              {message.name}
                            </Typography>
                            <Typography className="MuiTypography-root MuiTypography-body-sm css-1yf1ffq">
                              {message.username}
                            </Typography>
                          </Box>
                          <Box className="MuiBox-root css-2sihua">
                            <Typography className="MuiTypography-root MuiTypography-body-xs MuiTypography-noWrap css-11a2k5f">
                              {message.time}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography className="MuiTypography-root MuiTypography-body-sm css-48e3t4">
                          {message.message}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < messages.length - 1 && (
                      <Divider className="MuiListDivider-root MuiListDivider-horizontal css-1d8q8sy" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </main>
  );
};

export default MainContent;
