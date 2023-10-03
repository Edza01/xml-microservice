const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path'); // Import the 'path' module for file operations
const { Pool } = require('pg');
const fetchAndProcessSupplierData = require('./fetchXMLData');
const compareXML = require('./compareXMLData');
const updateXML = require('./updateXMLData');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'xmldatadb',
  password: 'root',
  port: 5432, // PostgreSQL default port
});

// Define a route to trigger data synchronization
app.get('/fetch-supplier-data', async (req, res) => {
  try {
    const dbQuery = 'SELECT * FROM xmldata'; // Replace with your table name
    const dbResponse = await pool.query(dbQuery);

    if (dbResponse.rows.length > 0) {
      // Iterate through the rows and fetch/process data for each URL
      for (const row of dbResponse.rows) {
        let supplierXMLUrl = row.link;
        let xmlFileName = `${row.name}.xml`;

        const oldXmlFilePath = path.join(path.join(__dirname, 'xml_files', 'xml_old'), xmlFileName);
        const newXmlFilePath = path.join(path.join(__dirname, 'xml_files', 'xml_new'), xmlFileName);

        // Call the function to fetch and process supplier data
        await fetchAndProcessSupplierData(supplierXMLUrl, oldXmlFilePath, newXmlFilePath); 
        res.send('Fetching and processing supplier data. Check console for details.');

        if (await compareXML(oldXmlFilePath, newXmlFilePath)) {
          console.log('compareXML returned true. There are changes. xml_old and xml_new are not equal');
          await updateXML(oldXmlFilePath, newXmlFilePath);
        }
      }
    } else {
      console.error('No data was found in the database.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
