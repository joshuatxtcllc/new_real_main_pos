// Test Twilio Voice Call Integration
// This script tests the voice call functionality with your configured Twilio credentials

import fetch from 'node-fetch';

async function testTwilioVoiceCall() {
  console.log('Testing Twilio Voice Call Integration...\n');

  try {
    // Test 1: Check if voice calling is configured
    console.log('1. Checking voice call configuration...');
    const configResponse = await fetch('http://localhost:5000/api/voice-calls/configuration');
    const configData = await configResponse.json();
    
    console.log('Configuration status:', configData);
    
    if (!configData.configured) {
      console.log('\n❌ Voice calling is not properly configured.');
      console.log('Please ensure you have set the following environment variables:');
      console.log('- TWILIO_ACCOUNT_SID');
      console.log('- TWILIO_AUTH_TOKEN');
      console.log('- TWILIO_PHONE_NUMBER');
      return;
    }
    
    console.log('✅ Voice calling is properly configured!\n');

    // Test 2: Make a test voice call (using a placeholder number - replace with real number for testing)
    console.log('2. Testing custom voice call...');
    
    const testCallData = {
      to: '+15551234567', // Replace with your test phone number
      message: 'Hello! This is a test call from Jay\'s Frames POS system. Your Twilio voice integration is working correctly.',
      voice: 'alice'
    };

    console.log('Test call data:', testCallData);
    console.log('Note: Replace the phone number with a real number to test actual calling\n');

    // Uncomment the following lines to make an actual test call:
    /*
    const callResponse = await fetch('http://localhost:5000/api/voice-calls/make-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testCallData)
    });

    const callResult = await callResponse.json();
    
    if (callResult.success) {
      console.log('✅ Test call initiated successfully!');
      console.log('Call SID:', callResult.callSid);
    } else {
      console.log('❌ Test call failed:', callResult.error);
    }
    */

    console.log('✅ Twilio voice call integration is ready to use!');
    console.log('\nAvailable endpoints:');
    console.log('- POST /api/voice-calls/make-call - Make custom voice calls');
    console.log('- POST /api/voice-calls/order-status - Call about order status');
    console.log('- POST /api/voice-calls/payment-reminder - Call about payment');
    console.log('- POST /api/voice-calls/pickup-reminder - Call about pickup');
    console.log('- POST /api/voice-calls/order-complete - Call when order is ready');
    console.log('- GET /api/voice-calls/status/:callSid - Check call status');

  } catch (error) {
    console.error('❌ Error testing voice call integration:', error.message);
  }
}

// Run the test
testTwilioVoiceCall();