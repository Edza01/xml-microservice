// const axios = require('axios');
// const xml2js = require('xml2js');
// const fs = require('fs');
// const path = require('path'); // Import the 'path' module for file operations
// const { Pool } = require('pg');
// const diff = require('diff'); // Import the 'diff' package

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'xmldatadb',
//   password: 'root',
//   port: 5432, // PostgreSQL default port
// });

// async function fetchAndProcessSupplierData() {
//   try {
//     // Fetch URLs from the PostgreSQL database
//     const dbQuery = 'SELECT * FROM xmldata'; // Replace with your table name
//     const dbResponse = await pool.query(dbQuery);

//     if (dbResponse.rows.length > 0) {
//       // Iterate through the rows and fetch/process data for each URL
//       for (const row of dbResponse.rows) {
//         const supplierXMLUrl = row.link;
//         const xmlFileName = `${row.name}.xml`;
//         const xmlDestinationDir = path.join(__dirname, 'xml_files', 'xml_old');

//         // Check if there's already a file with the same name in the xml_old directory
//         if (fs.existsSync(path.join(xmlDestinationDir, xmlFileName))) {
//           // Read the existing XML file from xml_old
//           const existingXmlData = fs.readFileSync(path.join(xmlDestinationDir, xmlFileName), 'utf8');

//           // Fetch XML data from the supplier
//           const response = await axios.get(supplierXMLUrl);

//           if (response.status === 200) {
//             // Compare the new XML data with the existing XML data
//             const newXmlData = response.data;
//             const differences = diff.diffChars(existingXmlData, newXmlData);

//             // Determine if there are differences
//             if (differences.some(part => part.added || part.removed)) {
//               console.log(`XML data has changed for URL: ${supplierXMLUrl}`);

//               // Save the new XML data to xml_new
//               const xmlNewDestinationDir = path.join(__dirname, 'xml_files', 'xml_new');
//               fs.writeFileSync(path.join(xmlNewDestinationDir, xmlFileName), newXmlData);
//             } else {
//               console.log(`XML data for URL: ${supplierXMLUrl} is the same as the existing file.`);
//             }
//           } else {
//             console.error('Failed to fetch XML data for URL:', supplierXMLUrl, 'Status code:', response.status);
//           }
//         } else {
//           // File doesn't exist in xml_old, download it to xml_new
//           const response = await axios.get(supplierXMLUrl);
//           if (response.status === 200) {
//             const xmlNewDestinationDir = path.join(__dirname, 'xml_files', 'xml_new');
//             fs.writeFileSync(path.join(xmlNewDestinationDir, xmlFileName), response.data);
//             console.log('XML data fetched and stored in xml_new for URL:', supplierXMLUrl);
//             console.log(1111);
//           } else {
//             console.error('Failed to fetch XML data for URL:', supplierXMLUrl, 'Status code:', response.status);
//           }
//         }
//       }
//     } else {
//       console.error('No URLs found in the database.');
//     }
//   } catch (error) {
//     console.error('Error fetching, parsing, and storing XML data:', error.message);
//   }
// }

// module.exports = fetchAndProcessSupplierData;





const axios = require('axios');
const fs = require('fs');
const path = require('path'); // Import the 'path' module for file operations
const { Pool } = require('pg');
const diff = require('diff'); // Import the 'diff' package

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
    const dbQuery = 'SELECT * FROM xmldata'; // Replace with your table name
    const dbResponse = await pool.query(dbQuery);

    if (dbResponse.rows.length > 0) {
      // Iterate through the rows and fetch/process data for each URL
      for (const row of dbResponse.rows) {

        const supplierXMLUrl = row.link;
        const xmlFileName = `${row.name}.xml`;
        const xmlDestinationDir = path.join(__dirname, 'xml_files', 'xml_old');
        const xmlFilePath = path.join(xmlDestinationDir, xmlFileName);

        if (!fs.existsSync(xmlFilePath)) {
          // Check if the file already exists in xml_old directory
          const response = await axios.get(supplierXMLUrl);

          if (response.status === 200) {
            fs.writeFileSync(xmlFilePath, response.data);
            console.log('XML data fetched and stored in xml_old for URL:', supplierXMLUrl);
          } else {
            console.error('Failed to fetch XML data for URL:', supplierXMLUrl, 'Status code:', response.status);
          }
        } else {
          // File already exists in xml_old
          const newXmlDestinationDir = path.join(__dirname, 'xml_files', 'xml_new');
          const newXmlFilePath = path.join(newXmlDestinationDir, xmlFileName);
          const response = await axios.get(supplierXMLUrl);

          if (response.status === 200) {
            fs.writeFileSync(newXmlFilePath, response.data);
            console.log('XML data fetched and stored in xml_new for URL:', supplierXMLUrl);
          } else {
            console.error('Failed to fetch XML data for URL:', supplierXMLUrl, 'Status code:', response.status);
          }
        }
      }
    } else {
      console.error('No data was found in the database.');
    }
  } catch (error) {
    console.error('Error fetching, parsing, and storing XML data:', error.message);
  }
}

module.exports = fetchAndProcessSupplierData;
