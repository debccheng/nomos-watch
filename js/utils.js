"use strict";

const CLOCK_HANDS_ROTATION_OFFSET = 180;

/**
 * Create markers on the dial.
 * @typedef CreateMarkersArgs
 * @property {number} totalMarkers
 * @property {string} className
 * @property {Element} parent
 * 
 * @param {CreateMarkersArgs}
 */
export const createMarkers = ({totalMarkers, className, parent}) => { 
  const fragment = document.createDocumentFragment();
  [...new Array(totalMarkers)].forEach(() => {
    const marker = document.createElement("div");
    marker.className = className;
    fragment.appendChild(marker);
  });
  parent.appendChild(fragment);
}

/**
 * Get angle for second hand.
 * @param {Date} date
 * @returns {string}
 */
const getSecondHandAngle = (date) => { 
  const s = date.getSeconds();
  return `${360 / 60 * s + CLOCK_HANDS_ROTATION_OFFSET}deg`;
}

/**
 * Get angle for minute hand.
 * @param {Date} date
 * @returns {string}
 */
const getMinuteHandAngle = (date) => { 
  const min = date.getMinutes();
  const s = date.getSeconds();

  const minOffset = s / 60 * 6;
  return `${360 / 60 * min + minOffset + CLOCK_HANDS_ROTATION_OFFSET}deg`;
}

/**
 * Get angle for hour hand.
 * @param {Date} date
 * @returns {string}
 */
const getHourHandAngle = (date) => { 
  const h = date.getHours();
  const min = date.getMinutes();

  const hOffset = min / 60 * 30;
  return `${360 / 12 * h + hOffset + CLOCK_HANDS_ROTATION_OFFSET}deg`;
}

/**
 * Initialise positions of clock hands.S
 * @typedef ClockHandAngles
 * @property {string} secondHandAngle
 * @property {string} minuteHandAngle
 * @property {string} hourHandAngle
 * 
 * @returns {ClockHandAngles}
 */
export const initialiseClockHands = () => {
  const now = new Date();

  return {
    secondHandAngle: getSecondHandAngle(now),
    minuteHandAngle: getMinuteHandAngle(now),
    hourHandAngle: getHourHandAngle(now)
  }
}

/**
 * Update position of clock hands.
 * @param {Element} secondHand
 * @param {Element} minuteHand 
 * @param {Element} hourHand 
 */
export const setClockHands = (secondHand, minuteHand, hourHand) => {
  const now = new Date();

  secondHand.style.setProperty(
    "--secondHandAngle", getSecondHandAngle(now)
  )

  minuteHand.style.setProperty(
    "--minuteHandAngle", getMinuteHandAngle(now)
  );
  
  hourHand.style.setProperty(
    "--hourHandAngle", getHourHandAngle(now)
  );
}