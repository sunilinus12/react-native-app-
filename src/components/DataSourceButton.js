import React, { memo } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { fontResizer, Rfh } from "../helper";

const DataSourceButton = ({
  title = "",
  isSelected = false,
  onPress = () => {},
  loading = false,
}) => {
  const buttonStyle = [
    styles.button,
    isSelected && styles.selectedButton,
    loading && styles.disabledButton,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={() => !loading && onPress()}
      disabled={loading}
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
    // paddingVertical: Rfh(2),
    marginHorizontal: Rfh(2),
    backgroundColor: "#4D8DD0",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: Rfh(10),
  },
  selectedButton: {
    backgroundColor: "#003C7A",
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: fontResizer(10),
    fontWeight: "600",
  },
});

export default memo(DataSourceButton);
