const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import your modules
const fetchXMLData = require('./fetchXMLData');

// Define a route to trigger data synchronization
app.get('/fetch-supplier-data', async (req, res) => {
  try {
    await fetchXMLData(); // Call the function to fetch and process supplier data
    res.send('Fetching and processing supplier data. Check console for details.');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
