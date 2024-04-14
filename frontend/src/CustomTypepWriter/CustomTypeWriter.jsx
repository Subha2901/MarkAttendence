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

    if (signIn && userName) {
      typewriter
        .pauseFor(200)
        .typeString(
          `<span style="color: #77B0AA">-|</span><strong>Hii ${userName}</strong>, Welcome Back!`
        )
        .pauseFor(300)
        .deleteChars(15)
        .typeString("! Hope you are doing well.")
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
  }, []);

  return <span id="CUstom"></span>;
};

export default CustomTypeWriter;
