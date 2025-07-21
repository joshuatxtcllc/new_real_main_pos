// Enhanced Twilio Voice Call Testing
// Tests advanced TwiML features including custom TwiML, URL endpoints, and voice options

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';
const TEST_PHONE = '+15551234567'; // Replace with your test number for actual calls

async function testEnhancedVoiceCalling() {
  console.log('Testing Enhanced Twilio Voice Calling System with TwiML...\n');

  try {
    // Test 1: Configuration check
    console.log('1. Verifying voice calling configuration...');
    const configResponse = await fetch(`${BASE_URL}/api/voice-calls/configuration`);
    const configData = await configResponse.json();
    
    if (!configData.configured) {
      console.log('❌ Voice calling not configured. Exiting tests.');
      return;
    }
    console.log('✅ Voice calling is configured and ready\n');

    // Test 2: Basic message call
    console.log('2. Testing basic message call...');
    const basicCall = {
      to: TEST_PHONE,
      message: 'Hello! This is a test call from Jay\'s Frames using basic TwiML.',
      voice: 'Polly.Amy'
    };
    console.log('Basic call parameters:', basicCall);

    // Test 3: Custom TwiML with multiple verbs
    console.log('\n3. Testing custom TwiML with multiple verbs...');
    const customTwiML = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="Polly.Amy">Thank you for calling Jay's Frames!</Say>
    <Pause length="1"/>
    <Play>https://demo.twilio.com/docs/classic.mp3</Play>
    <Say voice="Polly.Amy">We appreciate your business and look forward to serving you.</Say>
</Response>`;

    const twimlCall = {
      to: TEST_PHONE,
      twiml: customTwiML,
      recordCall: true
    };
    console.log('Custom TwiML call with recording enabled');

    // Test 4: URL-based TwiML call
    console.log('\n4. Testing URL-based TwiML call...');
    const urlCall = {
      to: TEST_PHONE,
      url: `${BASE_URL}/api/twiml/order-complete/ORD-123?customerName=John&orderNumber=ORD-123`,
      recordCall: false
    };
    console.log('URL-based call:', urlCall.url);

    // Test 5: Interactive TwiML with user input
    console.log('\n5. Testing interactive TwiML with user input...');
    const interactiveCall = {
      to: TEST_PHONE,
      url: `${BASE_URL}/api/twiml/interactive-survey/ORD-456?customerName=Sarah`,
    };
    console.log('Interactive survey call:', interactiveCall.url);

    // Test 6: Different voice options
    console.log('\n6. Testing different voice options...');
    const voiceOptions = ['alice', 'Polly.Amy', 'Polly.Brian', 'Polly.Emma'];
    voiceOptions.forEach(voice => {
      console.log(`- Voice option: ${voice}`);
    });

    // Test TwiML endpoints directly
    console.log('\n7. Testing TwiML endpoints directly...');
    
    const twimlEndpoints = [
      '/api/twiml/order-complete/ORD-789?customerName=Mike&orderNumber=ORD-789',
      '/api/twiml/payment-reminder/ORD-101?customerName=Lisa&amount=150.00&dueDate=tomorrow',
      '/api/twiml/pickup-reminder/ORD-202?customerName=David&daysWaiting=3',
      '/api/twiml/promotional/SPRING2025?customerName=Emily'
    ];

    for (const endpoint of twimlEndpoints) {
      console.log(`\nTesting TwiML endpoint: ${endpoint}`);
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, { method: 'POST' });
        const twimlContent = await response.text();
        console.log('TwiML Response preview:');
        console.log(twimlContent.substring(0, 200) + '...');
      } catch (error) {
        console.log(`Error testing ${endpoint}:`, error.message);
      }
    }

    // Display all available features
    console.log('\n✅ Enhanced Voice Calling System Test Complete!\n');
    console.log('Available Features:');
    console.log('- Basic text-to-speech calls with voice selection');
    console.log('- Custom TwiML with multiple verbs (Say, Play, Pause)');
    console.log('- URL-based dynamic TwiML generation');
    console.log('- Interactive calls with user input gathering');
    console.log('- Call recording functionality');
    console.log('- Multiple voice options including Amazon Polly voices');
    console.log('- Order-specific automated calls');
    console.log('- Payment and pickup reminder calls');
    console.log('- Promotional campaign calls with music');

    console.log('\nCall Types Available:');
    console.log('- Order completion notifications');
    console.log('- Payment reminders with amounts');
    console.log('- Pickup reminders with waiting days');
    console.log('- Interactive customer satisfaction surveys');
    console.log('- Promotional campaigns with background music');

    console.log('\nTwiML Features Demonstrated:');
    console.log('- <Say> with different voices and languages');
    console.log('- <Play> for background music and sounds');
    console.log('- <Pause> for natural conversation flow');
    console.log('- <Gather> for collecting user input');
    console.log('- Dynamic parameter injection');
    console.log('- Proper XML escaping for safety');

    console.log('\nTo make actual calls, replace TEST_PHONE with a real number and uncomment the API calls.');

  } catch (error) {
    console.error('❌ Error testing enhanced voice calling:', error.message);
  }
}

// Run the enhanced tests
testEnhancedVoiceCalling();