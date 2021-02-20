document.addEventListener("DOMContentLoaded", documentEvents, false);

function documentEvents() {
    addTags();

    document.getElementById("list").addEventListener("change", getSelectValue);

    chrome.storage.local.get("listOfSites", function (values) {
        obj = values.listOfSites;
        for (var name in obj) {
            $("#list").append(
                "<option value=" + name + ">" + name + "</option>"
            );
        }
    });
    $("#tags").on("click", "span", function () {
        var name = $(this).text();
        removeTags(name);
        $(this).remove();
    });
}

function getSelectValue() {
    var selectedValue = document.getElementById("list").value;
    chrome.storage.local.get("listOfSites", function (values) {
        listOfSitesObj = values.listOfSites;
        chrome.storage.local.get("chosenSites", function (values) {
            chosenSitesObj = values.chosenSites;
            alreadyAdded = selectedValue in chosenSitesObj;
            console.log(alreadyAdded);
            if (!alreadyAdded) {
                chrome.storage.local.get("chosenSites", function (values) {
                    chosenSitesObj = values.chosenSites;
                    chosenSitesObj[selectedValue] =
                        listOfSitesObj[selectedValue];
                    chrome.storage.local.set(
                        { chosenSites: chosenSitesObj },
                        function () {}
                    );
                });
                $(".taglist").append($("<span/>", { text: selectedValue }));
            }
        });
    });
}

async function addTags() {
    let chosenSites = await getChosenSites();
    for (var name in chosenSites) {
        $(".taglist").append($("<span/>", { text: name }));
    }
}

async function removeTags(value) {
    let chosenSites = await getChosenSites();
    delete chosenSites[value];
    setChosenSites(chosenSites);
}

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
