var browser = browser || chrome;

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({'accounts': document.querySelector("#accounts").value}, function() {
      console.log('tsmash info: ' + value);
    });
  }
  
  function restoreOptions() {

    browser.storage.sync.get(['accounts'], function(result) {
      document.querySelector("#accounts").value = result.accounts || "";
    });
   
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);
  