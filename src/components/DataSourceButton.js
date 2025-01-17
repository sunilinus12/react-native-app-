import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const DataSourceButton = ({ title="", isSelected=false, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#0056b3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DataSourceButton;
