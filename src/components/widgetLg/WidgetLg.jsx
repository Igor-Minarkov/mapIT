import React from "react";
import "./widgetLg.css";

export default function WidgetLg() {
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://media.istockphoto.com/photos/fuji-mountain-and-cherry-blossoms-in-spring-japan-picture-id1137578281?k=20&m=1137578281&s=612x612&w=0&h=xUs8Td53ZJihlXjf_6TrFAC2NJ8a6R25RTo3I69gN3k="
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Susan Carol</span>
            </td>
            <td className="widgetLgDate">08/28/2022</td>
            <td className="widgetLgAmount">$122.00</td>
            <td className="widgetLgStatus">
              <button className={"widgetLgButton Pending"}>Pending</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
