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

function addTags() {
    chrome.storage.local.get("chosenSites", function (values) {
        obj = values.chosenSites;
        for (var name in obj) {
            $(".taglist").append($("<span/>", { text: name }));
        }
    });
}

function removeTags(value) {
    chrome.storage.local.get("chosenSites", function (values) {
        obj = values.chosenSites;
        delete obj[value];
        chrome.storage.local.set({ chosenSites: obj }, function () {});
    });
}
