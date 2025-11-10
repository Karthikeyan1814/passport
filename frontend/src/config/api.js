// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Debug: Log the API URL (remove in production if needed)
if (process.env.NODE_ENV !== 'production') {
  console.log('🔍 API_BASE_URL:', API_BASE_URL);
  console.log('🔍 REACT_APP_API_URL env var:', process.env.REACT_APP_API_URL);
}

export default API_BASE_URL;

