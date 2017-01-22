//Global API URL variable
var apiURL = "http://api.pearson.com/v2/dictionaries/entries?headword="; 

// Seleted word global variable
var selection = "";


// Create contextMenu
function loadContextMenu() {
    if (Notification.permission == "granted"){
        chrome.contextMenus.create({
            "title": "Define This",
            "contexts": ["page", "selection"],
            "onclick" : clickHandler
        });
    }
}

// callback function for contextMenu.create
function clickHandler(e) {    
    selection = e.selectionText;
    sendAjaxRequest('GET',apiURL+selection);        
}


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function notifyUser(selectedWord,definition) {
    chrome.notifications.create(
        'definition-in-notification',
        {   
            type: 'basic',                 
            iconUrl: 'icon.png',
            title: "Definition of '"+selectedWord+"'", 
            message: definition.capitalizeFirstLetter()
        },
    function() {} 
    );
}

/*
* Send ajax requests
* @Param
* requestType: GET or POST
* apiURL: URL to api request
*/
function sendAjaxRequest(requestType,apiURL) {
    var xhr = new XMLHttpRequest();
    xhr.open(requestType, apiURL);
    xhr.responseType = 'json';

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {    
            handleAjaxResponse(xhr);
        }
    }
    xhr.send();
}

/*
* handle the returned response from ajax request
* @Param
* apiResponse: Response from Ajax request
*/
function handleAjaxResponse(apiResponse) {
    var responseCount = apiResponse.response.count;
    var response = apiResponse.response.results;   

    for (i = 0; i < responseCount; i++) {
        if(response[i].headword != "" && typeof response[i].senses[0].definition != "undefined") {
            var meaning = response[i].senses[0].definition; 
            break;
        }
        else{
            var meaning = "No definition found";
        }
    } 
    

    notifyUser(selection,meaning);
}


loadContextMenu();
