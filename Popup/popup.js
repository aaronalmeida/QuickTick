document.addEventListener("DOMContentLoaded", documentEvents, false);

async function myAction(input) {
    let ticker = input.value.toUpperCase();
    let chosenSites = await getChosenSites();
    let tickerMap = await getTickerMap();
    let exchange = tickerMap[ticker];

    for (var name in chosenSites) {
        Url = chosenSites[name]
            .replace("{symbol}", ticker)
            .replace("{exchange}", exchange);
        chrome.tabs.create({
            url: Url,
        });
    }
}

async function documentEvents() {
    const input = document.querySelector("#ticker");
    input.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            myAction(document.getElementById("ticker"));
        }
    });
}

//----------------------------Getters and Setters -------------------------------------------//

function getChosenSites() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("chosenSites", function (result) {
            if (Object.values(result) != undefined) {
                resolve(result.chosenSites);
            } else {
                reject();
            }
        });
    });
}

function getTickerMap() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("tickerMap", function (result) {
            if (Object.values(result) != undefined) {
                resolve(result.tickerMap);
            } else {
                reject();
            }
        });
    });
}
