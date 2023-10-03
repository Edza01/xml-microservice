const diff = require('diff');
const fs = require('fs');

async function compareXML(oldXmlFilePath, newXmlFilePath) {
  // Check if both files exist
  if (fs.existsSync(oldXmlFilePath) && fs.existsSync(newXmlFilePath)) {
    // Read the contents of the old and new XML files
    const oldXmlContent = fs.readFileSync(oldXmlFilePath, 'utf8');
    const newXmlContent = fs.readFileSync(newXmlFilePath, 'utf8');

    // Perform the comparison
    const differences = diff.diffLines(oldXmlContent, newXmlContent);

    const addedParts = differences.filter(part => part.added);
    const removedParts = differences.filter(part => part.removed);

    if (addedParts.length === 0 && removedParts.length === 0) {
      console.log('No changes found in XML files.'); // Log message when no changes
    } else {
    //   addedParts.forEach(part => {
    //     console.log('\x1b[32m' + part.value); // Log added parts in green
    //   });

    //   removedParts.forEach(part => {
    //     console.log('\x1b[31m' + part.value); // Log removed parts in red
    //   });
      
      return true;
    }
  } else {
    console.log('Both XML files do not exist.');
  }
}

module.exports = compareXML;
