chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'writeToFile') {
    // Write the content to a file (output.txt)
    chrome.storage.local.get({ content: '' }, function (data) {
      var updatedContent = data.content + request.message + '\n';
      chrome.storage.local.set({ content: updatedContent });
    });
  }
});
