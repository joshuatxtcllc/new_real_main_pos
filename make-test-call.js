// Make a Test Voice Call using your Twilio system
// Replace the phone number below with your actual phone number to test

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

async function makeTestCall() {
  console.log('Making a test voice call with your configured Twilio system...\n');

  // Test call configuration - REPLACE WITH YOUR PHONE NUMBER
  const testCall = {
    to: '+15551234567', // REPLACE THIS with your actual phone number (format: +1234567890)
    message: 'Hello! This is a test call from your Jay\'s Frames POS system. Your Twilio voice integration is working perfectly. Thank you for testing!',
    voice: 'Polly.Amy',
    recordCall: true
  };

  console.log('Call Details:');
  console.log('- Phone Number:', testCall.to);
  console.log('- Voice:', testCall.voice);
  console.log('- Recording:', testCall.recordCall ? 'Yes' : 'No');
  console.log('- Message Preview:', testCall.message.substring(0, 50) + '...\n');

  try {
    // Make the API call to initiate voice call
    const response = await fetch(`${BASE_URL}/api/voice-calls/make-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testCall)
    });

    const result = await response.json();

    if (result.success) {
      console.log('SUCCESS! Voice call initiated successfully!');
      console.log('Call SID:', result.callSid);
      console.log('Message:', result.message);
      console.log('\nYour phone should ring shortly with the test message.');
      
      // Wait a moment then check call status
      console.log('\nWaiting 10 seconds to check call status...');
      setTimeout(async () => {
        try {
          const statusResponse = await fetch(`${BASE_URL}/api/voice-calls/status/${result.callSid}`);
          const statusResult = await statusResponse.json();
          console.log('Call Status:', statusResult.status || 'checking...');
        } catch (error) {
          console.log('Could not retrieve call status:', error.message);
        }
      }, 10000);
      
    } else {
      console.log('FAILED to initiate call');
      console.log('Error:', result.error);
    }

  } catch (error) {
    console.error('Error making test call:', error.message);
  }
}

// Demonstration of TwiML URL-based call
async function makeTwiMLCall() {
  console.log('\n--- TwiML URL-Based Call Demo ---');
  
  const twimlCall = {
    to: '+15551234567', // REPLACE THIS with your actual phone number
    url: `${BASE_URL}/api/twiml/order-complete/ORD-DEMO?customerName=TestUser&orderNumber=ORD-DEMO`,
    recordCall: false
  };

  console.log('TwiML Call using URL:', twimlCall.url);
  console.log('This call will include background music and professional messaging.\n');

  // Uncomment the lines below to make the TwiML call:
  /*
  try {
    const response = await fetch(`${BASE_URL}/api/voice-calls/make-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(twimlCall)
    });

    const result = await response.json();
    console.log('TwiML Call Result:', result);
  } catch (error) {
    console.error('TwiML Call Error:', error.message);
  }
  */
}

console.log('Twilio Voice Call Test Script');
console.log('=============================');
console.log('IMPORTANT: Replace +15551234567 with your actual phone number before running!\n');

// Uncomment the line below to make an actual test call:
// makeTestCall();

// Uncomment the line below to test TwiML URL-based calling:
// makeTwiMLCall();

console.log('To make a test call:');
console.log('1. Edit this file and replace +15551234567 with your phone number');
console.log('2. Uncomment the makeTestCall() line');
console.log('3. Run: node make-test-call.js');
console.log('\nYour Twilio voice calling system is ready to use!');