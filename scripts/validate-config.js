import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';
import { parse } from 'jsonc-parser';

// Create AJV instance with format support
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Paths
const schemaPath = 'src/config/portfolio.schema.json';
const configPath = 'src/config/portfolio.jsonc';

console.log('🔍 Validating portfolio configuration...');

try {
  // Read schema and data
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Parse JSONC content
  const data = parse(configContent);
  if (!data) {
    throw new Error('Invalid JSONC syntax in portfolio.jsonc');
  }

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
