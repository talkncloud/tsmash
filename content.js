// Find all the delete buttons on the page
function findDeleteButton(selector, text) {
    console.log('run delete')
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){
        // Add a click listener to process on click
        RegExp(text).test(element.addEventListener('click', clickDeleteButton));
        // This was more for the newer style react / s3 ui
        if (element.disabled == true) {
            clickDeleteButton()
        }
    });
}

// Found a delete button that was clicked
function clickDeleteButton() {
    Array.prototype.forEach.call(
    document.querySelectorAll('input.awsui-input-type-text, input.awsui-textfield-type-text'), function(e) {
        e.focus();

        // Get intput placeholder text, if two words, use second word, if one word use single word
        console.log(e.placeholder);
        let setWord;
        let placeholder = e.placeholder;
            placeLength = placeholder.split(/\W+/).length
        // DynamoDB
        if (placeholder === "Type delete") {
            let secondWord = placeholder.split(" ");
            setWord = secondWord[1];
        // SNS
        } else if (placeholder === "delete me") {
            let secondWord = placeholder.split(" ");
            setWord = placeholder;
        } 
         else if (placeLength === 1) {
            let firstWord = placeholder.split(" ");
            setWord = firstWord[0];
        } else {
            console.log("no match")
        }

        // What to set the input box to
        if (setWord) {
            e.focus();

            // React needed dispatch
            setTimeout(() => {
                e.value = setWord;
                e.dispatchEvent(new Event('input', { bubbles: true }));    
            });

            // Enable delete button if found
            // Class didn't seem to change
            let deleteButton = document.querySelector("button.GDET2CPCBUB");
            if (deleteButton) {
                deleteButton.disabled = false;
                deleteButton.classList.remove('GDET2CPCBUB');
            }

        }
    });
}

// Is the account stored for bypass?
function accountPref(accountId) {
    function onGot(result) {
        if (result !== null) {
            // Is there an account set to exlcude
            if (typeof result.accounts === 'undefined') {
                // Find the delete buttons and process
                findDeleteButton('button', 'elete')
            } else if (!result.accounts.includes(accountId)) {
                // Find the delete buttons and process
                findDeleteButton('button', 'elete')
            }
                        
        }
      }
    
      function onError(error) {
        console.log(`Error: ${error}`);
      }
    
    let getting = browser.storage.local.get("accounts");
    getting.then(onGot, onError);
}

function accountId() {
    // Store account id here
    let accountIdCheck;

    // Standard? Assume this is like SSO here

    // AWS SSO
    let accountIdSso = document.querySelector('#menu--account *[data-testid="aws-my-account-details"]');
    if (accountIdSso) {
        accountIdCheck = accountIdSso.innerHTML
    };

    // Federated
    let accountIdFed = document.querySelector('#menu--account *[data-testid="account-menu-title"]');
    if (accountIdFed) {
        let splitAcc = accountIdFed.split(":")
        accountIdCheck = splitAcc[1]
    };

    if (accountIdCheck) {
        accountPref(accountIdCheck)
    }

}

// Main run to kick it off
// Query for account ID to compare against excludes (if any)
accountId()