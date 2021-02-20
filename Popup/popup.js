document.addEventListener("DOMContentLoaded", documentEvents, false);

function myAction(input) {
    console.log("input value is : " + input.value);
    chrome.storage.local.get("chosenSites", function (values) {
        obj = values.chosenSites;
        for (var name in obj) {
            site = obj[name] + input.value;
            chrome.tabs.create({
                url: site,
            });
        }
    });
}

function documentEvents() {
    chrome.storage.local.get("listOfSites", function (values) {
        obj = values.listOfSites;
        for (var name in obj) {
            console.log(obj[name]);
        }
    });
    const input = document.querySelector("#ticker");
    input.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            myAction(document.getElementById("ticker"));
        }
    });
}
