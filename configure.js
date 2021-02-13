document.addEventListener("DOMContentLoaded", documentEvents, false);

function myAction(input) {
    var lines = input.value.split("\n").slice(0, -1);
    localStorage["sites"] = JSON.stringify(lines);
    console.log(JSON.parse(localStorage["sites"]));
}

function documentEvents() {
    const input = document.querySelector("#sites");
    input.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            myAction(document.getElementById("sites"));
        }
    });
}
