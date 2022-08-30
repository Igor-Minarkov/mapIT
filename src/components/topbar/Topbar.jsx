import React from "react";
import { NotificationsNone, Language } from "@mui/icons-material";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import i18next from "i18next";
import "./topbar.css";

export default function Topbar() {
  const [lng] = React.useState("");

  const handleChange = (event) => {
    i18next.changeLanguage(event.target.value);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <Link to="/">
              <img
                src="data:image/png;base64,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"
                alt="logo"
              />
            </Link>
          </span>
        </div>
        <div className="topbarRight">
          <div className="topbarIconContainer">
            <NotificationsNone className="notificationIcon" />
            <span className="topIconBadge">7</span>
          </div>
          <div className="topbarIconContainer">
            <Box>
              <Select
                className="customSelect"
                sx={{ width: 65 }}
                defaultValue=""
                displayEmpty
                labelId="lng"
                id="lng"
                value={lng}
                label="lng"
                onChange={handleChange}
                renderValue={(value) => {
                  return (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Language />
                      {value}
                    </Box>
                  );
                }}
              >
                <MenuItem value="en">en</MenuItem>
                <MenuItem value="mk">mk</MenuItem>
              </Select>
            </Box>
          </div>
          <Link to="/user/1">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
              alt=""
              className="topAvatar"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
