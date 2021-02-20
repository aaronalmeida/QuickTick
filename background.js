chrome.runtime.onInstalled.addListener((details) => {
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    const reason = details.reason;

    console.log("Previous Version: ${previousVersion }");
    console.log("Current Version: ${currentVersion }");
    var map = {};
    map["Finviz"] = "https://finviz.com/quote.ashx?t=";
    map["Yahoo"] = "https://finance.yahoo.com/quote/";

    switch (reason) {
        case "install" || "update":
            console.log("New User installed the extension.");
            console.log("hello");
            chrome.storage.local.set({ listOfSites: map }, function () {});
            chrome.storage.local.set({ chosenSites: map }, function () {});
            break;
    }
});
