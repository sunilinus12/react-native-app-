import { Dimensions } from "react-native";

/**
 * Get the screen's width.
 * @returns {number} - The screen width in pixels.
 */
const screenWidth = () => {
  return Dimensions.get("screen").width;
};

/**
 * Get the screen's height.
 * @returns {number} - The screen height in pixels.
 */
const screenHeight = () => {
  return Dimensions.get("screen").height;
};

/**
 * Calculate dynamic width based on the percentage of the screen width.
 * @param {number} percentage - The percentage of the screen width (0-100).
 * @returns {number} - The calculated width in pixels.
 */
const Rfw = (percentage) => {
  // Ensure percentage is within valid range
  if (percentage < 0 || percentage > 100) {
    throw new Error("Percentage should be between 0 and 100.");
  }
  return (screenWidth() * percentage) / 100;
};

/**
 * Calculate dynamic height based on the percentage of the screen height.
 * @param {number} percentage - The percentage of the screen height (0-100).
 * @returns {number} - The calculated height in pixels.
 */
const Rfh = (percentage) => {
  // Ensure percentage is within valid range
  if (percentage < 0 || percentage > 100) {
    throw new Error("Percentage should be between 0 and 100.");
  }
  return (screenHeight() * percentage) / 100;
};

export { screenWidth, screenHeight, Rfw, Rfh };
