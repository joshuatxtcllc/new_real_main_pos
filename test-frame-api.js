import http from 'http';

// Test the frames API endpoint
const testFramesAPI = () => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/frames',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        console.log('✅ API Response Status:', res.statusCode);
        console.log('✅ Frames loaded:', result.frames ? result.frames.length : 0);
        if (result.frames && result.frames.length > 0) {
          console.log('✅ Sample frame:', result.frames[0].name);
          console.log('✅ Sample price:', result.frames[0].price);
        } else {
          console.log('❌ No frames found in response');
        }
      } catch (e) {
        console.error('❌ Error parsing JSON:', e.message);
        console.log('Raw response:', data.substring(0, 200));
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Connection error:', e.message);
  });

  req.end();
};

// Wait a moment then test
setTimeout(testFramesAPI, 2000);