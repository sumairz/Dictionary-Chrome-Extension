# Dictionary-Chrome-Extension
Chrome extension to find selected word meaning

The extension uses Free api from Pearson Dictionary library. It allows for aroun 300,000 api request per month.
http://developer.pearson.com/apis/dictionaries

The main source code is inside 
scripts/pearson.dictionary.js

Update: 21-01-2017
------------------
* Added permission for "notification"
* Added context Menu(right click menus) to get instant definition a word.
* Right click on a selected word click option "Define This" and get a notification with the selected word definition.


Problem / TODO
---------------
* I tried message passing between background js file to extension js file but It didn't work without opening up the extension popup because the listener at the extension js file won't activate on page load it activates only if popup page is opened.

* So I am still trying to figure out a way to start a listener at popup side so that I don't have to wite function for ajax call on both side I want one place to handle that.

ANY HELP will appreciated.

Thanks