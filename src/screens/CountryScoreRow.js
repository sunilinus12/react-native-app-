import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CountryScoreRow = ({ name, averageScore }) => {
  // Assuming 250 is the maximum possible score for scaling the bar width
  const maxScore = 250;
  const barWidth = Math.min((averageScore / maxScore) * 100, 100); // Ensure the width does not exceed 100%

  return (
    <View style={styles.row}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{averageScore}</Text>
      <View
        style={[
          styles.blueBar,
          { width: `${barWidth}%` }, // Dynamic width based on averageScore
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  blueBar: {
    height: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default CountryScoreRow;
