document.addEventListener("DOMContentLoaded", documentEvents, false);

// function myAction(input) {
//     var lines = input.value.split("\n").slice(0, -1);
//     //currentStorage = JSON.parse(localStorage["sites"])
//     localStorage["sites"] = JSON.stringify(lines);
//     //console.log(JSON.parse(localStorage["sites"]));
// }

// function documentEvents() {
//     var arr = JSON.parse(localStorage["sites"]);
//     document.getElementById("sites").textContent = arr.join("\n");
//     const input = document.querySelector("#sites");
//     input.addEventListener("keyup", function (e) {
//         if (e.keyCode === 13) {
//             myAction(document.getElementById("sites"));
//         }
//     });
// }

function documentEvents() {
    addTags();

    document.getElementById("list").addEventListener("change", getSelectValue);

    for (var i in map) {
        $("#list").append("<option value=" + i + ">" + i + "</option>");
    }
    $("#tags").on("click", "span", function () {
        var name = $(this).text();
        removeTags(name);
        $(this).remove();
    });
}

function getSelectValue() {
    var selectedValue = document.getElementById("list").value;
    existingSites = JSON.parse(localStorage.getItem("existingSites")) || [];
    alreadyAdded = !!existingSites.filter((x) => x.title === selectedValue)
        .length;
    if (!alreadyAdded) {
        var entry = {
            title: selectedValue,
            text: map[selectedValue],
        };
        existingSites.push(entry);
        localStorage.setItem("existingSites", JSON.stringify(existingSites));
        $(".taglist").append($("<span/>", { text: entry.title }));
    }
}

function addTags() {
    existingSites = JSON.parse(localStorage.getItem("existingSites")) || [];
    for (var i = 0; i < existingSites.length; i++) {
        var obj = existingSites[i];
        $(".taglist").append($("<span/>", { text: obj.title }));
    }
}

function removeTags(value) {
    existingSites = JSON.parse(localStorage.getItem("existingSites")) || [];
    existingSites = existingSites.filter((x) => x.title != value);
    localStorage.setItem("existingSites", JSON.stringify(existingSites));
    console.log(JSON.parse(localStorage.getItem("existingSites")));
}

var map = {};
map["Finviz"] = "https://finviz.com/quote.ashx?t=";
map["Yahoo"] = "https://finance.yahoo.com/quote/";
