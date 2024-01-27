# MonitorYourRSAStation

MonitorYourRSAStation is a Chrome extension designed to monitor RSA (Road Safety Authority) test centers for driving tests. The extension periodically checks for the availability of test bookings and notifies the user by refreshing the browser and sending an email when a booking is available.

## Features

- **Email Notification:** Receive an email notification when a booking becomes available at your selected RSA test center.
- **Browser Refresh:** The extension periodically refreshes the browser to check for test availability.
- **Email Test:** Test the email notification functionality by sending a test email to the specified recipient.

## Getting Started

Follow these steps to get started with the MonitorYourRSAStation extension:

1. **Installation:**
   - Download the extension files.
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the folder containing the extension files.

2. **Setup Email:**
   - Open `popup.html` in a text editor.
   - Enter your email address in the input field with the id `emailInput`.
   - Save the changes.

3. **Run the Extension:**
   - Click on the extension icon in the Chrome toolbar to open the popup.
   - Enter your email address and click the "Send Test Email" button to verify email functionality.

4. **Monitor Test Center:**
   - The extension will automatically monitor the specified RSA test center for booking availability.
   - When a booking becomes available, the browser will be refreshed, and an email notification will be sent.

## Files and Structure

- **popup.js:** Contains the JavaScript code for the extension's main functionality, including email sending and browser refreshing.

- **popup.html:** The HTML file for the extension popup, where the user can input their email and initiate a test email.

- **manifest.json:** Configuration file for the extension, specifying permissions, icons, and other settings.

- **index.html:** A simple HTML file that seems unused. Consider removing if unnecessary.

## Permissions

The extension requires the following permissions:

- `storage`: To store extension-related data.
- `activeTab`: To interact with the currently active tab.
- `https://apis.google.com/`: To use the 
