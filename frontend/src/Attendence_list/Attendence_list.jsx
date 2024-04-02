import React, { useEffect, useState } from "react";
import "./Attendence_list.sass";

export default function Attendence_list() {
  var markedDates = JSON.parse(localStorage.getItem("attendenceDatesArr")) || [];
  // console.log("MarkedDates -> ", markedDates);

  var timeRangeArr = JSON.parse(localStorage.getItem("timeRangeArr")) || [];
  // console.log("TimeRangeArr", timeRangeArr);

  // Format the date
  const options = { day: "2-digit", month: "long", year: "numeric" };

  return (
    <div className="container" style={{overflowY: 'scroll', maxHeight: '420px'}}>
      <ol
        className="style_1"
        style={{
          textAlign: "left",
          fontSize: "14px",
          fontWeight: "100",
          color: "#fff2f285",
        }}
      >
        {markedDates.map((date, index) => (
          <li key={index}>
            {new Date(date).toLocaleDateString("en-GB", options)}
            <br />
            <small>
              {timeRangeArr && timeRangeArr[index] && (
                <>
                  {timeRangeArr[index][0]} - {timeRangeArr[index][1]}
                </>
              )}
            </small>
          </li>
        ))}
        {/* <li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3<br/>
			<small>
				Note: Some tost to expand verticle height<br/>
				and some more lines
			</small>
		</li>
		<li>Item 5
			<ol>
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
			</ol>
		</li>
		<li>More Item 6</li>
		<li>More Item 7</li> */}
      </ol>
    </div>
  );
}
