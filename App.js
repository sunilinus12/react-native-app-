import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { CountryScoreRow, DataSourceButton } from "./src/components"; // Import reusable component

// Test Data (Hardcoded)
const testData = [
  ["Pakistan", 23],
  ["Pakistan", 127],
  ["India", 3],
  ["India", 71],
  ["Australia", 31],
  ["India", 22],
  ["Pakistan", 81],
];

const App = () => {
  // State variables
  const [countryName, setCountryName] = useState(""); // User input
  const [averageScore, setAverageScore] = useState(null); // Null for no match
  const [dataSource, setDataSource] = useState("Test Data");
  const [countries, setCountries] = useState([]);

  // Aggregating scores for each country
  const aggregateScores = (data) => {
    const scores = {};

    data.forEach(([country, score]) => {
      if (!scores[country]) {
        scores[country] = { totalScore: 0, count: 0 };
      }
      scores[country].totalScore += score;
      scores[country].count += 1;
    });

    return Object.entries(scores).map(([country, { totalScore, count }]) => ({
      name: country,
      averageScore: totalScore / count,
    }));
  };

  // Handle data source change
  const handleDataSourceChange = (source) => {
    setDataSource(source);
  };

  // Fetch data dynamically from server
  const fetchDataFromServer = async () => {
    try {
      const response = await fetch(
        "https://assessments.reliscore.com/api/cric-scores/"
      );
      const data = await response.json();
      const aggregatedData = aggregateScores(data);
      setCountries(aggregatedData);
    } catch (error) {
      console.error("Error fetching server data:", error);
    }
  };

  // Fetch appropriate data when dataSource changes
  useEffect(() => {
    if (dataSource === "Server Data") {
      fetchDataFromServer();
    } else {
      const aggregatedData = aggregateScores(testData);
      setCountries(aggregatedData);
    }
  }, [dataSource]);

  const handleInputChange = (name) => {
    setCountryName(name);

    // Look for exact match of country
    const country = countries.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    // If country matches, display average score and blue bar, else display "-".
    if (country) {
      setAverageScore(country.averageScore);
    } else {
      setAverageScore(null); // Null indicates no match, so "-" will be shown
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cricket Batsman's Average Scores</Text>
      {/* Data Source Selection Buttons */}
      <View style={styles.buttonContainer}>
        <DataSourceButton
          title="Use Test Data"
          isSelected={dataSource === "Test Data"}
          onPress={() => handleDataSourceChange("Test Data")}
        />
        <DataSourceButton
          title="Use Server Data"
          isSelected={dataSource === "Server Data"}
          onPress={() => handleDataSourceChange("Server Data")}
        />
      </View>
      {/* Country Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Country Name"
        value={countryName} // Show typed input
        onChangeText={handleInputChange}
        placeholderTextColor="#8a8a8a"
      />
      {/* Display Country and Average Score */}
      {countryName && (
        <CountryScoreRow
          countryName={countryName}
          averageScore={averageScore}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  blueBar: {
    height: 12,
    backgroundColor: "#4A90E2",
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  selectedButton: {
    backgroundColor: "#0056b3",
  },
});

export default App;
