import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
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
    return;
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
    return;
  }
  return (screenHeight() * percentage) / 100;
};
/**
 * Get dynamic font size based on screen width using RFPercentage.
 * @param {number} percentage - The percentage of the screen width for font size (0-100).
 * @returns {number} - The calculated font size in responsive units.
 */
const fontResizer = (percentage) => {
  if (percentage < 0 || percentage > 100) {
    return;
  }
  return RFValue(percentage, 580); // Dynamic font size based on screen percentage
};

export { screenWidth, screenHeight, Rfw, Rfh, fontResizer };
