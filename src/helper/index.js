import { Dimensions } from "react-native";

function screenWidth() {
  return Dimensions.get("screen").width;
}
function screenHeight() {
  return Dimensions.get("screen").height;
}

export { screenWidth, screenHeight };
