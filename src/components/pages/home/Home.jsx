import React from "react";
import FeaturedInfo from "../../featuredInfo/FeaturedInfo";
import Chart from "../../chart/Chart";
import WidgetSm from "../../../components/widgetSm/WidgetSm";
import WidgetLg from "../../../components/widgetLg/WidgetLg";
import "./home.css";
import { userData } from "../../../dummyData";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
