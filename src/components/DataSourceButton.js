import React, { memo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const DataSourceButton = ({
  title = "",
  isSelected = false,
  onPress = () => {},
  loading = false,
}) => {
  const buttonStyle = [
    styles.button,
    isSelected && styles.selectedButton,
    loading && styles.disabledButton, // Apply a disabled style if loading
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={() => !loading && onPress()} // Prevent press during loading
      disabled={loading} // Disable the button when loading
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    backgroundColor: "#4D8DD0", // Default color
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#003C7A", // Darker color for selected state
  },
  disabledButton: {
    opacity: 0.7, // Visual feedback for disabled state
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default memo(DataSourceButton);
