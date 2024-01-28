# MonitorYourRSAStation

MonitorYourRSAStation is a Chrome extension designed to monitor RSA (Road Safety Authority) test centers for driving tests. The extension periodically checks for the availability of test bookings by refreshing the browser and and notifies the user by sending an email when a booking is available.

## Features

- **Email Test:** Test the email notification functionality by sending a test email to the specified recipient.
- **Email Notification:** Receive an email notification when a booking becomes available at your selected RSA test center.
- **Browser Refresh:** The extension periodically refreshes the browser to check for test availability.

## Getting Started

Follow this video or the steps steps below to get started with the MonitorYourRSAStation extension:

[![VIDEO WALKTHROUGH]](https://www.youtube.com/watch?v=yBA5moe7zkw&ab_channel=AndrewSyomushkin.)

1. **Installation:**

   - Download the repo files.
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the folder containing the extension files.

2. **Go to google https://console.cloud.google.com/**

   - Create a browser extension.
   - In manifest.json, edit the "client_id" from your google console browser extension.
   - On line 146 of popup.js, change my email to your google cloud console's email.
   - Enter the browser extension id from your extension tab to the extension id tab inside google cloud console tab, click save.

3. **Sign into your RSA account**

   - Navigate to the booking portal, ie https://myroadsafety.rsa.ie/portal/booking/e5bbe47a-3f94-e911-a2be-0050568fd8e0/d2dc5f8c-2506-ea11-a2c3-0050568fd8e0

4. **Run the Extension:**
   - If your default test site is not the third row on the dropdown menu, change the XPATH thats passed into the getValueByXPathAfterDelay('**YOUR COLMN**') function.
   - Click on the extension icon in the Chrome toolbar to open the popup.
   - Enter your email address and click the "Send Test Email" button to verify email functionality.
   - Ensure this email is received!
     
5. **Monitor Test Center:**
   - The extension will automatically monitor the specified RSA test center for booking availability.
   - The extension will refresh every ~10 seconds and check availability.
   - When a booking becomes available, an email notification will be sent to the email specified.

## Files and Structure

- **popup.js:** Contains the JavaScript code for the extension's main functionality, including email sending and browser refreshing.

- **popup.html:** The HTML file for the extension popup, where the user can input their email and initiate a test email.

- **manifest.json:** Configuration file for the extension, specifying permissions, icons, and other settings.

## Permissions

The extension requires the following permissions:

- `storage`: To store extension-related data.
- `activeTab`: To interact with the currently active tab.
- `https://apis.google.com/`: To use the Gmail API for sending emails.
- `identity`: To obtain the OAuth token for Gmail API.

## Gmail API Integration

The extension integrates with the Gmail API for sending email notifications. Make sure to set up the Gmail API credentials in the `manifest.json` file.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute the code.

## Acknowledgments

- Special thanks to the developers and contributors to the libraries and APIs used in this extension.

**Note:** Ensure that your Gmail API credentials are properly set up, and the extension has the necessary permissions for sending emails.
