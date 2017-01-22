// Pearson Dictionary API Link
// ----------------------------
// http://developer.pearson.com/apis/dictionaries

//Global API URL variable
var apiURL = "http://api.pearson.com/v2/dictionaries/entries?headword="; 

// getting the selected word from window object
chrome.tabs.executeScript( {
  code: "window.getSelection().toString();"
}, function(selection) {
    var selectedWord = selection;
    getDefinition(selectedWord);
});


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
function showNotification(apiResponse) {
    var responseCount = apiResponse.response.count;
    var response = apiResponse.response.results;   

    sendRequest("createNotification",response[0].senses[0].definition);
}

/*
* handle the returned response from ajax request
* @Param
* apiResponse: Response from Ajax request
*/
function handleAjaxResponse(apiResponse) {
    var responseCount = apiResponse.response.count;
    var response = apiResponse.response.results;   

    loadDefinitions(responseCount,response);
}

/*
* Change the text of status tag
* @Param
* status: Any sentence to change text of status tag
*/
function changeStatusBar(status) {
    var el = document.getElementById('status');
    el.style.display = "block";
    el.innerHTML = status;
}

// use to hide the status bar
function hideStatusBar() {
    var el = document.getElementById('status');
    el.style.display = "none";
}

/*
* Return the html of word and meaning
* @Param
* word: response word
* meaning: meaning of the word
*/
function getHTMLElement(word,meaning){
    var html = "";
    html += "<h5><u>"+word+"</u></h5>";
    html += "<p>"+meaning+"</p>";
    html += "<hr>";

    var e = document.createElement('span');
    e.innerHTML = html;    
    return e;
}

/*
* Put response in the html
* @Param
* status: Any sentence to change text of status tag
*/
function loadDefinitions(count,definitions) {
    var el = document.getElementById('result');
    hideStatusBar();

    for (i = 0; i < count; i++) {
        if(definitions[i].headword != "" && definitions[i].senses[0].definition != undefined) {
            var word = definitions[i].headword;
            var meaning = definitions[i].senses[0].definition;        
            var span = getHTMLElement(word,meaning);
            el.appendChild(span);
        }
    }    
}


function clearResults() {
    var el = document.getElementById('result');
    el.innerHTML = "";
}

/*
* Make calls to get definition of the selected word
* @Param
* word: Selected word fetched from the window
*/
function getDefinition(word) {

    if(word != "" && typeof word != 'undefined') {        
        clearResults();
        changeStatusBar('Finding <b>"' + word + '"</b> definition');
        sendAjaxRequest('GET',apiURL+word,'popup');
    }
    else{
        changeStatusBar('<p style="color:red;">Select a word from the page</p>');
    }
}