import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { CountryScoreRow } from "./src/screens"; // Import reusable component

const App = () => {
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
        <Button
          title="Use Test Data"
          onPress={() => handleDataSourceChange("Test Data")}
        />
        <Button
          title="Use Server Data"
          onPress={() => handleDataSourceChange("Server Data")}
        />
      </View>

      {/* Country Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Country Name"
        value={countryName} // Show typed input
        onChangeText={handleInputChange}
      />
      {/* Display Country and Average Score */}
      {averageScore === null ? (
        <View style={styles.row}>
          <Text style={styles.text}>{countryName}</Text>
          <Text style={styles.text}>-</Text>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.text}>{countryName}</Text>
          <Text style={styles.text}>{averageScore}</Text>
          {averageScore !== null && (
            <View
              style={[
                styles.blueBar,
                { width: `${2 * averageScore}px` }, // Dynamic width of the bar
              ]}
            />
          )}
        </View>
      )}

      {/* List of All Countries */}
      {countries.map((country, index) => (
        <CountryScoreRow
          key={index}
          name={country.name}
          averageScore={country.averageScore}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
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
  buttonContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default App;
