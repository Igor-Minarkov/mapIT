import React from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PeopleAltOutlined,
  ProductionQuantityLimitsOutlined,
  ReceiptLongOutlined,
  EmailOutlined,
  ThumbUpAltOutlined,
  ForumOutlined,
  SummarizeOutlined,
  AssessmentOutlined,
  AutoGraphOutlined,
  ManageAccountsOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">{t("Dashboard")}</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              {t("Home")}
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              {t("Analytics")}
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              {t("Sales")}
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">{t("Quick Menu")}</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PeopleAltOutlined className="sidebarIcon" />
                {t("Users")}
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <ProductionQuantityLimitsOutlined className="sidebarIcon" />
                {t("Products")}
              </li>
            </Link>
            <li className="sidebarListItem">
              <ReceiptLongOutlined className="sidebarIcon" />
              {t("Transactions")}
            </li>
            <li className="sidebarListItem">
              <SummarizeOutlined className="sidebarIcon" />
              {t("Reports")}
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">{t("Notifications")}</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <EmailOutlined className="sidebarIcon" />
              {t("Mail")}
            </li>
            <li className="sidebarListItem">
              <ThumbUpAltOutlined className="sidebarIcon" />
              {t("Feedback")}
            </li>
            <li className="sidebarListItem">
              <ForumOutlined className="sidebarIcon" />
              {t("Messages")}
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">{t("Staff")}</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <ManageAccountsOutlined className="sidebarIcon" />
              {t("Manage")}
            </li>
            <li className="sidebarListItem">
              <AutoGraphOutlined className="sidebarIcon" />
              {t("Analytics")}
            </li>
            <li className="sidebarListItem">
              <AssessmentOutlined className="sidebarIcon" />
              {t("Reports")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
