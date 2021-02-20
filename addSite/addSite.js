document.addEventListener("DOMContentLoaded", documentEvents, false);

function documentEvents() {
    addNewSite();
}

function addNewSite() {
    document
        .getElementById("addCustomDomain")
        .addEventListener("click", async function () {
            const name = document.getElementsByClassName("custom__name")[0]
                .value;
            const domain = document.getElementsByClassName("custom__domain")[0]
                .value;

            let listOfSites = await getListOfSites();

            alreadyAdded = name in listOfSites;
            if (!alreadyAdded) {
                listOfSites[name] = domain;
                setListOfSites(listOfSites);
            }
        });
}

function cleanDomain() {}

//-------------------------Getters and Setters------------------------------------//

function getListOfSites() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("listOfSites", function (result) {
            if (Object.values(result) != undefined) {
                resolve(result.listOfSites);
            } else {
                reject();
            }
        });
    });
}

function setListOfSites(obj) {
    chrome.storage.local.set({ listOfSites: obj }, function () {});
}
