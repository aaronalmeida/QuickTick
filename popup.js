document.addEventListener("DOMContentLoaded", documentEvents, false);

function myAction(input) {
    console.log("input value is : " + input.value);
    chrome.tabs.create({
        url: "https://ca.finance.yahoo.com/quote/" + input.value,
    });
    chrome.tabs.create({
        url: "https://finviz.com/quote.ashx?t=" + input.value,
    });
}

function documentEvents() {
    const input = document.querySelector("#ticker");
    input.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            myAction(document.getElementById("ticker"));
        }
    });
}
