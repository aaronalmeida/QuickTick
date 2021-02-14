document.addEventListener("DOMContentLoaded", documentEvents, false);

function myAction(input) {
    console.log("input value is : " + input.value);
    var existingSites = JSON.parse(localStorage["existingSites"]);
    var i;
    for (i = 0; i < existingSites.length; i++) {
        var obj = existingSites[i];
        site = obj.text + input.value;
        console.log(site);
        chrome.tabs.create({
            url: "https://www.google.com/",
        });
    }
}

function hatsToRats() {
    var html = document.body;
    //console.log(html);
}

function documentEvents() {
    const input = document.querySelector("#ticker");
    input.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            myAction(document.getElementById("ticker"));
        }
    });
}
