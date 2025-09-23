import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';

// Create AJV instance with format support
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Paths
const schemaPath = 'src/config/portfolio.schema.json';
const configPath = 'src/config/portfolio.json';

console.log('🔍 Validating portfolio configuration...');

try {
  // Read schema and data
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  // Validate
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    console.log('✅ Portfolio configuration is valid!');
    process.exit(0);
  } else {
    console.error('❌ Portfolio configuration validation failed:');
    console.error('');
    
    validate.errors.forEach((error, index) => {
      const path = error.instancePath || 'root';
      const message = error.message;
      const expected = error.schemaPath;
      
      console.error(`${index + 1}. ${path}: ${message}`);
      if (expected) {
        console.error(`   Expected: ${expected}`);
      }
      console.error('');
    });
    
    console.error(`Total errors: ${validate.errors.length}`);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error during validation:', error.message);
  process.exit(1);
}
