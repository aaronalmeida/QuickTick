document.addEventListener("DOMContentLoaded", documentEvents, false);

function documentEvents() {
    addTags();
    removeTags();
    renderList();
}

//-------------------------------Dropdown/Listing ------------------------------------//
async function renderList() {
    document.getElementById("list").addEventListener("change", getSelectValue);
    let listOfSites = await getListOfSites();
    for (var name in listOfSites) {
        $("#list").append("<option value=" + name + ">" + name + "</option>");
    }
}

async function getSelectValue() {
    var selectedValue = document.getElementById("list").value;

    let listOfSites = await getListOfSites();
    let chosenSites = await getChosenSites();

    alreadyAdded = selectedValue in chosenSites;
    if (!alreadyAdded) {
        chosenSites[selectedValue] = listOfSites[selectedValue];
        setChosenSites(chosenSites);
        $(".taglist").append($("<span/>", { text: selectedValue }));
    }
}

//-------------------------------Tag Manipulation------------------------------------//

async function addTags() {
    let chosenSites = await getChosenSites();
    for (var name in chosenSites) {
        $(".taglist").append($("<span/>", { text: name }));
    }
}

async function removeTags() {
    $("#tags").on("click", "span", async function () {
        var name = $(this).text();
        let chosenSites = await getChosenSites();
        delete chosenSites[name];
        setChosenSites(chosenSites);
        $(this).remove();
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

function setChosenSites(obj) {
    chrome.storage.local.set({ chosenSites: obj }, function () {});
}

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
