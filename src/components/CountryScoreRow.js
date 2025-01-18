import React, { memo } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { fontResizer, Rfh, Rfw, screenWidth } from "../helper";

const CountryScoreRow = ({ countryName, averageScore }) => {
  const barWidth = Math.max(2 * averageScore, 10);
  const isSmallWidth = Platform.OS == "web" ? screenWidth() < 500 : false;
  return (
    <View style={[styles.row, isSmallWidth && styles.smallRow]}>
      <Text style={styles.countryName}>{countryName}</Text>
      <Text style={[styles.score, isSmallWidth && { flex: 2 }]}>
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
  smallRow: {
    flexDirection: "column",
    flex: 0.2,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Rfh(2),
    paddingHorizontal: Rfw(5),
    marginBottom: Rfw(4),
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: Rfw(0.1),
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: Rfh(2) },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    transition: "background-color 0.3s ease",
  },
  countryName: {
    flex: 2,
    fontSize: fontResizer(12),
    fontWeight: "500",
    color: "#2C3E50",
    letterSpacing: 0.5,
    textTransform: "capitalize",
  },
  score: {
    flex: 1,
    fontSize: fontResizer(12),
    fontWeight: "500",
    color: "#34495E",
    textAlign: "center",
  },
  blueBar: {
    height: 10,
    backgroundColor: "#3498DB",
    borderRadius: 6,
    marginLeft: Rfw(2),
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
  },
});

export default memo(CountryScoreRow);
