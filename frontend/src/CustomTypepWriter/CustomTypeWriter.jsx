import React, { useEffect } from "react";
import Typewriter from "typewriter-effect/dist/core";
import './CustomTypeWriter.css'

const CustomTypeWriter = ({ userName, signIn }) => {
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
          `<span style="color: #77B0AA">-|</span><strong>Hii ${userName}</strong style="color: #77B0AA">, Welcome to MarkAttendence!`
        )
        .pauseFor(300)
        .deleteChars(26)
        .typeString("<span style='color: #77B0AA'>! Hope you are doing well.</span>")
        .pauseFor(300)
        .deleteAll()
        .typeString(
          `<span style="color: #77B0AA">-|</span>${userName}<span style="color: #77B0AA"> - Please mark your attendance</span>`
        )
        .pauseFor(10000000)
        .start();
    } else {
      typewriter
        .pauseFor(200)
        .typeString(
          `<span style="color: #77B0AA">-|</span><strong>Hii </strong>, Welcome to MarkAttendence!`
        )
        .pauseFor(300)
        .deleteAll()
        .typeString(
          `<span style="color: #77B0AA">-|Please </span>Login/SignUp<span style="color: #77B0AA"> - to mark your attendance</span>`
        )
        .pauseFor(2500)
        .deleteAll()
        .typeString(".|<strong style='color: #77B0AA'>MarkYourAttendence")
        .pauseFor(10000000)
        .start();
    }
  }, [signIn]);

  return <span id="CUstom"></span>;
};

export default CustomTypeWriter;
