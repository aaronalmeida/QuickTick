document.addEventListener("DOMContentLoaded", documentEvents, false);

async function myAction(input) {
    let chosenSites = await getChosenSites();
    for (var name in chosenSites) {
        site = chosenSites[name] + input.value;
        chrome.tabs.create({
            url: site,
        });
    }
}

function documentEvents() {
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
