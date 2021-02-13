document.addEventListener("DOMContentLoaded", documentEvents, false);

function myAction(input) {
    var lines = input.value.split("\n").slice(0, -1);
    //currentStorage = JSON.parse(localStorage["sites"])
    localStorage["sites"] = JSON.stringify(lines);
    //console.log(JSON.parse(localStorage["sites"]));
}

function documentEvents() {
    var arr = JSON.parse(localStorage["sites"]);
    document.getElementById("sites").textContent = arr.join("\n");
    const input = document.querySelector("#sites");
    input.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            myAction(document.getElementById("sites"));
        }
    });
}
