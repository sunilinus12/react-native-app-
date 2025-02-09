import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
} from "react-native";
import { CountryScoreRow, DataSourceButton } from "./src/components"; // Import reusable component
import { fontResizer, Rfh, Rfw } from "./src/helper";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
    Keyboard.dismiss();
    setDataSource(source);
  };

  // Fetch data dynamically from server
  const fetchDataFromServer = async () => {
    setIsLoading(true);
    setError(null); // Reset any previous errors
    try {
      const response = await fetch(
        "https://assessments.reliscore.com/api/cric-scores/"
      );
      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`); // Handle HTTP errors
      }
      const data = await response.json();
      const aggregatedData = aggregateScores(data);
      setCountries(aggregatedData);
      handleSearchResultAfterSource(aggregatedData);
    } catch (error) {
      console.error("Error fetching server data:", error);
      setError("Failed to fetch data. Please try again later."); // Set an error message for the user
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearchResultAfterSource = (data) => {
    if (countryName != "") {
      handleInputChange(countryName, data);
    }
  };

  // Fetch appropriate data when dataSource changes
  useEffect(() => {
    if (dataSource === "Server Data") {
      fetchDataFromServer();
    } else {
      const aggregatedData = aggregateScores(testData);
      setCountries(aggregatedData);
      handleSearchResultAfterSource(aggregatedData);
    }
  }, [dataSource]);

  const handleInputChange = (name, data) => {
    setCountryName(name);

    // Look for exact match of country
    const country = (data ?? countries).find(
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
          loading={isLoading}
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
      {error !== null && (
        <View>
          <Text>
            Oops, got unexpected issue , click the Server Data button again to
            load data
          </Text>
        </View>
      )}
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
    padding: Rfw(4),
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: fontResizer(19),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: Rfh(5),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: Rfh(1.1),
    fontSize: fontResizer(10),
    backgroundColor: "#fff",
    fontWeight: "400",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Rfh(5),
  },
});

export default App;
