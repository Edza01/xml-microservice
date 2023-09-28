const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'xmldatadb', 
  password: 'root',
  port: 5432, // PostgreSQL default port
});

async function fetchAndProcessSupplierData() {
  try {
    // Fetch URLs from the PostgreSQL database
    const dbQuery = 'SELECT link FROM xmldatatable'; // Replace with your table name
    const dbResponse = await pool.query(dbQuery);
    
    if (dbResponse.rows.length > 0) {
      // Iterate through the rows and fetch/process data for each URL
      for (const row of dbResponse.rows) {
        const supplierXMLUrl = row.link;
        
        // Fetch XML data from the supplier
        const response = await axios.get(supplierXMLUrl);
    
        if (response.status === 200) {
          // Parse the XML data using xml2js
          const xmlParser = new xml2js.Parser();
          const parsedData = await xmlParser.parseStringPromise(response.data);
          
          // Store the parsed data in a JSON file (you may want to store it differently)
          const jsonData = JSON.stringify(parsedData);
          fs.writeFileSync('supplierData.json', jsonData);
    
          console.log('XML data fetched, parsed, and stored successfully for URL:', supplierXMLUrl);
        } else {
          console.error('Failed to fetch XML data for URL:', supplierXMLUrl, 'Status code:', response.status);
        }
      }
    } else {
      console.error('No URLs found in the database.');
    }
  } catch (error) {
    console.error('Error fetching, parsing, and storing XML data:', error.message);
  }
}

module.exports = fetchAndProcessSupplierData;
