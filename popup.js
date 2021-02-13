document.addEventListener("DOMContentLoaded", documentEvents, false);

function myAction(input) {
    //console.log("input value is : " + input.value);
    var sites = JSON.parse(localStorage["sites"]);
    var i;
    for (i = 0; i < sites.length; i++) {
        chrome.tabs.create({
            url: sites[i] + input.value,
        });
    }
}

function hatsToRats() {
    var html = document.body;
    //console.log(html);
}

function documentEvents() {
    const input = document.querySelector("#ticker");
    console.log(input);
    input.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            myAction(document.getElementById("ticker"));
        }
    });
}
