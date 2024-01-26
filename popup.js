document.addEventListener('DOMContentLoaded', function () {
  console.log("DOMContentLoaded");

  // Function to update the result in the popup
  function updateResultAndSendMail(message) {
    try {
      var resultElement = document.getElementById('result');
      if (resultElement) {
        if (message != null && message != undefined) {
          resultElement.textContent = message;
          var availability = message.substring(23);
          if(availability != "No availability" && availability != "null")
          {
            sendEmail(message, "test available on " + availability)
          }
          else{
            console.log(message)
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
  function refreshPageAfterDelay(delay) {
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
        console.log('Page refreshed successfully');
      });
    }, delay);
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

  // sendEmail("Test Subject", "This is a test email body.");
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
          raw: btoa("From: andrewsyomush@gmail.com\r\nTo: andrewsyomush@gmail.com\r\nSubject: " + subject + "\r\n\r\n" + body)
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
    // Call the function to send a test email
    sendEmail("Test email", "This is a test email body. You're all set up!");
  });
  


  firstTime = true
  function mainLoop() {
    if (!firstTime) {
      // Wait until the browser is fully loaded
      isBrowserLoaded(function (loaded) {
        if (!loaded) {
          // If not loaded, wait and check again
          setTimeout(mainLoop, 10000);
          return;
        }

        // Call the function when the extension popup is opened
        clickElementByXPath('//*[@id="button3"]/span[1]/div/div[2]');

        // Wait for a short delay before getting the value of the specified element
        setTimeout(function () {
          // Get the value of the specified element along with the current time
          getValueByXPathAfterDelay('//*[@class="float-right text-primary text-right ng-star-inserted"]', 1000, function (result) {
            var currentTime = getCurrentTime();

            // Availability found, update the extension popup
            updateResultAndSendMail(`Time: ${currentTime}, Value: ${result}`);
            refreshPageAfterDelay(30000);  // Refresh after 30 seconds

            // Call the main loop again after a delay
            setTimeout(mainLoop, 30000);
          });
        }, 2000); // Adjust this delay as needed
        firstTime = false;
      });
    } else {
      // Call the function when the extension popup is opened
      clickElementByXPath('//*[@id="button3"]/span[1]/div/div[2]');

      // Wait for one second before getting the value of the specified element
      setTimeout(function () {
        // Get the value of the specified element along with the current time
        getValueByXPathAfterDelay('//*[@class="float-right text-primary text-right ng-star-inserted"]', 0, function (result) {
          var currentTime = getCurrentTime();

          // Availability found, update the extension popup
          updateResultAndSendMail(`Time: ${currentTime}, Value: ${result}`);
          refreshPageAfterDelay(30000);  // Refresh after 30 seconds

          // Call the main loop again after a delay
          setTimeout(mainLoop, 30000);
        });
      }, 1000);
      firstTime = false;
    }
  }

  // Start the main loop
  mainLoop();
  console.log("done");
});
