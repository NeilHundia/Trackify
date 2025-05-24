/**
 * Test script to check server connectivity
 * Run this with: node testConnection.js
 */

const testServerConnection = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/test-connection');
    const data = await response.json();
    console.log('Connection successful!', data);
    return { success: true, data };
  } catch (error) {
    console.error('Connection failed:', error.message);
    return { success: false, error: error.message };
  }
};

// If this file is run directly
if (typeof window === 'undefined') {
  console.log('Running server connection test...');
  testServerConnection()
    .then(result => {
      console.log('Test result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(err => {
      console.error('Test error:', err);
      process.exit(1);
    });
}

export default testServerConnection; 