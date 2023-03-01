"use strict";
import { createMarkers, initialiseClockHands, setClockHands } from "./utils.js"

const clock = document.querySelectorAll(".clock")[0];

const center = document.createElement("div");
center.className = "center";
clock.appendChild(center);

const { secondHandAngle, minuteHandAngle, hourHandAngle } = initialiseClockHands();

const minuteHand = document.createElement("div");
minuteHand.classList.add("hand", "minute-hand");
minuteHand.style.setProperty("--minuteHandAngle", minuteHandAngle);
clock.appendChild(minuteHand);

const hourHand = document.createElement("div");
hourHand.classList.add("hand", "hour-hand");
hourHand.style.setProperty("--hourHandAngle", hourHandAngle);
clock.appendChild(hourHand);


createMarkers({ totalMarkers: 60, className: "main-marker", parent: clock });

let mainMarkerRotation = 0;
let numRotation = 0;

const mainMarkers = document.querySelectorAll(".main-marker");
mainMarkers.forEach((el, index) => {
  el.style.cssText = `
    transform: rotate(${mainMarkerRotation}deg);
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;

  if (index % 15 === 0) {
    el.style.setProperty("--mainMarkerSize", "0.5em");
    const num = index === 0 ? '60' : String(index).padStart(2, 0);
    el.style.setProperty("--mainMarkerContent", `"${num}"`);
    el.style.setProperty("--mainMarkerAngle", `${numRotation}deg`);

  } else if (index % 5 === 0) { 
    const num = index === 0 ? '60' : String(index).padStart(2, 0);
    el.style.setProperty("--mainMarkerSize", "0.375em");
    el.style.setProperty("--mainMarkerContent", `"${num}"`);
    el.style.setProperty("--mainMarkerAngle", `${numRotation}deg`);
    el.style.setProperty("--mainMarkerSpace", "1.875em");
    
  } else { 
    el.style.setProperty("--mainMarkerColor", "#669999");
    el.style.setProperty("--mainMarkerSpace", "1em");
  }

  mainMarkerRotation += (360 / 60);
  numRotation += (360 / 12) + (360 / 60) + 180;
});

const secondDial = document.createElement("div");
secondDial.className = "second-dial";
clock.appendChild(secondDial);

const secondDialCenter = document.createElement("div");
secondDialCenter.className = "second-dial-center";
secondDial.appendChild(secondDialCenter);

const secondHand = document.createElement("div");
secondHand.className = "second-hand";
secondHand.style.setProperty("--secondHandAngle", secondHandAngle);
secondDial.appendChild(secondHand);

createMarkers({ totalMarkers: 6, className: "secondary-marker", parent: secondDial });

let secondaryMarkerRotation = 0;
const secondaryMarkers = document.querySelectorAll(".secondary-marker");
secondaryMarkers.forEach((el, index) => { 
  el.style.cssText = `
    transform: rotate(${secondaryMarkerRotation}deg);
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;

  secondaryMarkerRotation += (360 / 12);
})

setInterval(() => setClockHands(secondHand, minuteHand, hourHand), 1000);
