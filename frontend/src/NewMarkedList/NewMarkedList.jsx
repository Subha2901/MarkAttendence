import React from "react";
import "./NewMarkedList.sass";

const NewMarkedList = ({ value, timeRange }) => {
  // Format the date
  const options = { day: "2-digit", month: "long", year: "numeric" };

  const formattedValue = value.map((date, index) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);
    const formattedTimeRange =
      timeRange && timeRange[index]
        ? `${timeRange[index][0]} - ${timeRange[index][1]}`
        : "";

    return {
      date: formattedDate,
      timeRange: formattedTimeRange,
    };
  });

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        paddingLeft: "30px",
      }}
    >
      <ol
        className="style_1"
        style={{
          textAlign: "left",
          fontSize: "14px",
          fontWeight: "100",
          color: "#fff2f285",
        }}
      >
        {formattedValue.map((item, index) => (
          <li key={index}>
            {item.date}
            {item.timeRange && <br />}
            {item.timeRange && <small>{item.timeRange}</small>}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NewMarkedList;
