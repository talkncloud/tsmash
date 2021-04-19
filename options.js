function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
      accounts: document.querySelector("#accounts").value
    });
  }
  
  function restoreOptions() {
  
    function setCurrentChoice(result) {
      document.querySelector("#accounts").value = result.accounts || "";
    }
  
    function onError(error) {
      console.log(`Error: ${error}`);
    }
  
    let getting = browser.storage.local.get("accounts");
    getting.then(setCurrentChoice, onError);    
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);
  