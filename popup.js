document.addEventListener('DOMContentLoaded', function () {

  // Updated function to include file writing
  function updateResult(message) {
    var resultElement = document.getElementById('result');
    if (resultElement) {
      resultElement.textContent = message;

      // Send a message to background.js to write the result to a file
      chrome.runtime.sendMessage({ action: 'writeToFile', message: message });
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
            console.log('Element Clicked within Button!');
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
            var element = document.evaluate('${xpath}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) { 
              var value = element.textContent.trim();
              value;
            } else {
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

  let firstTime = true;

  // Main loop function
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

        // Wait for one second and then get the value of the specified element along with the current time
        getValueByXPathAfterDelay('//*[@class="float-right text-primary text-right ng-star-inserted"]', 1000, function (result) {
          // Update the extension popup with the retrieved value and current time
          var currentTime = getCurrentTime();
          updateResult(`Time: ${currentTime}, Value: ${result || 'Value not found'}`);

          // Check if the value is found and initiate a refresh after 30 seconds
          if (result) {
            refreshPageAfterDelay(30000);
          }

          // Call the main loop again after a delay
          setTimeout(mainLoop, 30000);
        });
        firstTime = false;
      });
    } else {
      // Call the function when the extension popup is opened
      clickElementByXPath('//*[@id="button3"]/span[1]/div/div[2]');

      // Wait for one second before getting the value of the specified element
      setTimeout(function () {
        // Get the value of the specified element along with the current time
        getValueByXPathAfterDelay('//*[@class="float-right text-primary text-right ng-star-inserted"]', 0, function (result) {
          // Update the extension popup with the retrieved value and current time
          var currentTime = getCurrentTime();
          updateResult(`Time: ${currentTime}, Value: ${result || 'Value not found'}`);

          // Check if the value is found and initiate a refresh after 30 seconds
          if (result) {
            refreshPageAfterDelay(30000);
          }

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
