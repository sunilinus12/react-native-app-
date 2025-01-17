import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CountryScoreRow = ({ countryName, averageScore }) => {
  const barWidth = Math.max(2 * averageScore, 10); // Ensure the width is at least 10px
  return (
    <View style={styles.row}>
      <Text style={styles.countryName}>{countryName}</Text>
      <Text style={styles.score}>
        {averageScore !== null ? averageScore : "-"}
      </Text>
      {averageScore !== null && (
        <View
          style={[
            styles.blueBar,
            {
              width: barWidth,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 18,
    backgroundColor: "#fff", // White background for each row
    borderRadius: 12, // Rounded corners for a modern look
    borderWidth: 1, // Subtle border for separation
    borderColor: "#E0E0E0", // Light grey border color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6, // Android shadow
    transition: "background-color 0.3s ease", // Smooth transition for background color change
  },
  countryName: {
    flex: 2,
    fontSize: 20,
    fontWeight: "500",
    color: "#2C3E50", // Darker shade for better contrast
    letterSpacing: 0.5,
    textTransform: "capitalize",
  },
  score: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#34495E", // Darker grey for the score
    textAlign: "center",
  },
  blueBar: {
    height: 10,
    backgroundColor: "#3498DB", // Soft blue shade
    borderRadius: 6, // Rounded corners for a sleek look
    marginLeft: 12,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)", // Subtle shadow for depth
  },
});

export default CountryScoreRow;
