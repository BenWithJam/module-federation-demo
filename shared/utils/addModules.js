const fs = require('fs');
const path = require('path');

// Specify the path to the node_modules directory
const nodeModulesPath = path.join(__dirname, 'node_modules');

// Specify the missing dependencies
const missingDependencies = {
  "@mui/material": "7.1.1"
};

// Recursively add missing dependencies to package.json files
function addMissingDependencies(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      addMissingDependencies(filePath);
    } else if (file === 'package.json') {
      let packageJson;

      try {
        packageJson = require(filePath);
      } catch (error) {
        // If the package.json file doesn't exist, create a new one
        packageJson = {};
      }

      // Add missing dependencies
      packageJson.dependencies = {
        ...packageJson.dependencies,
        ...missingDependencies
      };

      // Add version if not exists
      if (!packageJson.version) {
        packageJson.version = "1.0.0";
      }

      // Write the updated package.json back to the file
      fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
    }
  }
}

addMissingDependencies(nodeModulesPath);
