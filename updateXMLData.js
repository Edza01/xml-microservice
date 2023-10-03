const fs = require('fs');

async function updateXML(oldXmlFilePath, newXmlFilePath) {
    // Delete the old file if it exists
    if (fs.existsSync(oldXmlFilePath)) {
        fs.unlinkSync(oldXmlFilePath);
    }
    
    // Move the new file to the old file's location
    fs.renameSync(newXmlFilePath, oldXmlFilePath);
    console.log(oldXmlFilePath, ' is holding most recent XML version');
}

module.exports = updateXML;
