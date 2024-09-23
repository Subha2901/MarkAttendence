import React, { useEffect } from "react";
import Typewriter from "typewriter-effect/dist/core";
import "./CustomTypeWriter.css";

const CustomTypeWriter = ({ userName, signIn, loading }) => {
  useEffect(() => {
    var app = document.getElementById("CUstom");

    var typewriter = new Typewriter(app, {
      loop: true,
      delay: 75,
    });

    if (signIn) {
      typewriter
        .pauseFor(200)
        .typeString(
          `<span style="color: #77B0AA">-|</span><strong>Hii ${userName}</strong style="color: #77B0AA">, Welcome to <span class = "logo_css">MarkYourAttendence</span>!`
        )
        .pauseFor(300)
        .deleteChars(30)
        .typeString(
          "<span style='color: #77B0AA'>! Hope you are doing well.</span>"
        )
        .pauseFor(300)
        .deleteAll()
        .typeString(
          `<span style="color: #77B0AA">-|</span>${userName}<span style="color: #77B0AA"> - Please <span class = "logo_css">MarkYourAttendence</span></span>`
        )
        .pauseFor(10000000)
        .start();
    } else {
      typewriter
        .pauseFor(200)
        .typeString(
          `<span style="color: #77B0AA">-|</span><strong>Hii </strong>, Welcome to <span class = "logo_css">MarkYourAttendence</span>!`
        )
        .pauseFor(300)
        .deleteAll()
        .typeString(
          `<span style="color: #77B0AA">-|Please </span>Login/SignUp<span style="color: #77B0AA"> - to <span class = "logo_css">MarkYourAttendence</span></span>`
        )
        .pauseFor(2500)
        .deleteAll()
        .typeString(`.|<span class = "logo_css" style='color: #77B0AA'>MarkYourAttendence</span>`)
        .pauseFor(10000000)
        .start();
    }
  }, [signIn, userName]);

  return <span id="CUstom"></span>;
};

export default CustomTypeWriter;
