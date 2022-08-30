import React from "react";
import "./widgetSm.css";
import { VisibilityOutlined } from "@mui/icons-material";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://media.istockphoto.com/photos/fuji-mountain-and-cherry-blossoms-in-spring-japan-picture-id1137578281?k=20&m=1137578281&s=612x612&w=0&h=xUs8Td53ZJihlXjf_6TrFAC2NJ8a6R25RTo3I69gN3k="
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software engineer</span>
          </div>
          <button className="widgetSmButton">
            <VisibilityOutlined className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
