# Project Title

Provide a concise and descriptive title for your project.

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

---

## Introduction

This project aims to provide a dynamic and responsive application designed for data visualization and interaction. It allows users to search, sort, and analyze information effectively while ensuring accessibility and a seamless user experience. The purpose is to solve challenges related to managing and visualizing data efficiently.

---

## Features

The key features of the project include:
- **Dynamic Data Handling**: Supports both static datasets for testing and dynamic datasets fetched from an API.
- **Error Handling and Loading States**: Displays appropriate error messages and loading placeholders to enhance user experience.
- **Responsive UI Design**: Adapts to various screen sizes, ensuring a consistent appearance on all devices.
- **Search Functionality**: Enables users to search and filter results dynamically based on the input criteria.
- **Interactive UI Elements**: Includes rows displaying country names, scores, and a blue bar for visual representation.

---

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd <project-directory>

# Install dependencies
yarn install # Ensure Yarn version is 3.6.2

# Start the development server
yarn start

# Run the project on an Android device
yarn android
```

---

## Usage

### Dynamic Data Handling

This project supports two types of data sources:
- **Test Data**: A static dataset for development and testing purposes.
- **API Data**: A dynamic dataset fetched from an API to display real-time information.

### Features Implemented

1. **Error Handling and Loading States**:
   - Displays an error message if data fetching fails.
   - Shows a loading spinner or placeholder while awaiting the API response.

2. **Responsive UI Design**:
   - Layouts adapt to screen sizes using percentages and text scaling.
   - For screens narrower than 300 pixels, layouts switch from rows to columns.

3. **Search Functionality**:
   - Allows users to search for countries by name.
   - Dynamically updates the list to show only matching countries and their scores.
   - If no match is found, the score field displays a "-" symbol.

4. **UI Elements**:
   - Each row includes:
     - Country Name
     - Score
     - Blue Bar for visual representation

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For further inquiries or contributions, please contact:
- **Email**: (mailto:www.suniljaunwal2@gmail.com)
- **GitHub**: ([https://github.com/your-profile](https://github.com/sunilinus12))

