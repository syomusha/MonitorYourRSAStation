# MonitorYourRSAStation

MonitorYourRSAStation is a Chrome extension designed to monitor RSA (Road Safety Authority) test centers for driving tests. The extension periodically checks for the availability of test bookings by refreshing the browser and and notifies the user by sending an email when a booking is available.

## Features

- **Email Test:** Test the email notification functionality by sending a test email to the specified recipient.
- **Email Notification:** Receive an email notification when a booking becomes available at your selected RSA test center.
- **Browser Refresh:** The extension periodically refreshes the browser to check for test availability.

## Getting Started

Follow these steps to get started with the MonitorYourRSAStation extension:

1. **Installation:**

   - Download the extension files.
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the folder containing the extension files.

2. **Sign into your RSA account**

   - Navigate to the booking portal, ie https://myroadsafety.rsa.ie/portal/booking/e5bbe47a-3f94-e911-a2be-0050568fd8e0/d2dc5f8c-2506-ea11-a2c3-0050568fd8e0

3. **Run the Extension:**
   - Click on the extension icon in the Chrome toolbar to open the popup.
   - Enter your email address and click the "Send Test Email" button to verify email functionality.
   - Ensure this email is received!
4. **Monitor Test Center:**
   - The extension will automatically monitor the specified RSA test center for booking availability.
   - The extension will refresh every ~10 seconds and check availability.
   - When a booking becomes available, an email notification will be sent to the email specified.

## Files and Structure

- **popup.js:** Contains the JavaScript code for the extension's main functionality, including email sending and browser refreshing.

- **popup.html:** The HTML file for the extension popup, where the user can input their email and initiate a test email.

- **manifest.json:** Configuration file for the extension, specifying permissions, icons, and other settings.

- **index.html:** A simple HTML file that seems unused. Consider removing if unnecessary.

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
