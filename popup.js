let quit = false;
let emailAddress; // Declare emailAddress outside the event listeners

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOMContentLoaded");


  // Add event listener for the email input box
  document.getElementById('emailInput').addEventListener('change', function () {
      // Get the entered email address
      emailAddress = document.getElementById('emailInput').value.trim();

      // Check if the entered email is valid
      if (isValidEmail(emailAddress)) {
          // Start the main loop with the entered email
          mainLoop(emailAddress); // starts mainloop
      } else {
          console.error("Invalid email address");
          // Provide feedback to the user about the invalid email address
      }
  });

  function isValidEmail(email) {
    // You can implement a more robust email validation if needed
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  // Function to update the result in the popup
  function updateResultAndSendEmail(message, emailAddress) {
      try {
          var resultElement = document.getElementById('result');
          if (resultElement) {
              if (message != null && message != undefined) {
                  resultElement.textContent = message;
                  var availability = message.substring(23);
                  if (availability != "No availability" && availability != "null") {
                      sendEmail("Your default station is now available", "Be quick!\n" + message);
                      quit = true;
                  } else {
                      console.log(message);
                  }
              } else {
                  console.error(chrome.runtime.lastError);
              }
          } else {
              console.error("Error: resultElement not found");
          }
      } catch (error) {
          console.error("Unexpected error:", error);
      }
  }


  // Function to click a specific element within a button with a specific XPath after the page has loaded
  function clickElementByXPath(xpath) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript({
        code: `
          var element = document.evaluate('${xpath}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (element) { 
            element.click();
            console.log('Element clicked successfully');
          } else {
            console.log('Element not found');
          }
        `
      });
    });
  }

  // Function to wait for one second and retrieve the value of a specific element by XPath
  function getValueByXPathAfterDelay(xpath, delay, callback) {
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript({
          code: `
            try {
              var element = document.evaluate('${xpath}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
              if (element) {
                var value = element.textContent.trim();
                value;
              } else {
                null;
              }
            } catch (error) {
              null;
            }
          `
        }, function (result) {
          callback(result[0]);
        });
      });
    }, delay);
  }


  // Function to refresh the page after a delay
  function refreshPage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
      console.log('Page refreshed successfully');
    });
  }


  // Function to get the current time in HH:mm:ss format
  function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function isBrowserLoaded(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.get(tabs[0].id, function (tab) {
        if (tab.status === 'complete') {
          callback(true);
        } else {
          callback(false);
        }
      });
    });
  }

  // Function to send an email using Gmail API
  function sendEmail(subject, body) {
    getAuthToken(function (token) {
      console.log("Sending email with token:", token);

      fetch("https://www.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          raw: btoa(`From: andrewsyomush@gmail.com\r\nTo: ${emailAddress}\r\nSubject: ${subject}\r\n\r\n${body}`)
        })
      })
        .then(response => {
          console.log("Response status:", response.status);
          if (!response.ok) {
            throw new Error("Error sending email: " + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log("Email sent successfully:", data);
        })
        .catch(error => {
          console.error("Error sending email:", error.message);
        });
    });
  }

  // Function to get the OAuth token
  function getAuthToken(callback) {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      if (!token) {
        console.error("Error: Unable to get authorization token.");
        return;
      }

      console.log("Token obtained:", token);
      callback(token);
    });
  }
  
  document.getElementById('sendEmailButton').addEventListener('click', function () {
      // Get the entered email address
      var emailAddress = document.getElementById('emailInput').value.trim();

      // Check if the entered email is valid
      if (isValidEmail(emailAddress)) {
          // Call the function to send a test email with the entered email address
          sendEmail(emailAddress, "You're all set up! You'll receive an email as soon as theres a spot opened up :)");
      } else {
          console.error("Invalid email address");
          // Provide feedback to the user about the invalid email address
      }
  });
    


  function mainLoop(emailAddress) {
    if (quit) {
      console.log("Gracefully stopping the program.");
      return;
    }
    
    // Wait until the browser is fully loaded
    isBrowserLoaded(function (loaded) {
      if (!loaded) {
        // If not loaded, wait and check again
        setTimeout(isBrowserLoaded, 1000);
        return;
      }
      // Call the function when the extension popup is opened
      clickElementByXPath('//*[@id="button3"]/span[1]/div/div[2]');   
      // Get the value of the specified element along with the current time
      getValueByXPathAfterDelay('//*[@id="mat-menu-panel-0"]/div/button[3]/div[1]/div[3]/span[2]', 2000, function (result) {
      var currentTime = getCurrentTime();
      // Availability found, update the extension popup
      updateResultAndSendEmail(`Time: ${currentTime}, Value: ${result}`);
      refreshPage()
      });
      setTimeout(function () {
        mainLoop(emailAddress);
        }, 10000);
    });
}
  
  // Start the main loop
  // mainLoop(emailAddress);
});