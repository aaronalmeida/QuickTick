chrome.runtime.onInstalled.addListener((details) => {
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    const reason = details.reason;

    console.log("Previous Version: ${previousVersion }");
    console.log("Current Version: ${currentVersion }");
    var map = {};
    map["Finviz"] = "https://finviz.com/quote.ashx?t={symbol}";
    map["Yahoo"] = "https://finance.yahoo.com/quote/{symbol}";
    map["TradingView"] = "https://www.tradingview.com/symbols/{symbol}";
    map["MarketWatch"] = "https://www.marketwatch.com/investing/stock/{symbol}";

    switch (reason) {
        case "install":
            console.log("New User installed the extension.");
            chrome.storage.local.set({ listOfSites: map }, function () {});
            chrome.storage.local.set({ chosenSites: map }, function () {});
            break;
    }

    fetchExchangeTickers("TSX").then(function (response) {
        json = response.reduce((json, value, key) => {
            json[value] = "TSX";
            return json;
        }, {});

        fetchExchangeTickers("NYSE").then(function (response2) {
            json2 = response2.reduce((json2, value, key) => {
                json2[value] = "NYSE";
                return json2;
            }, {});

            fetchExchangeTickers("AMEX").then(function (response3) {
                json3 = response3.reduce((json3, value, key) => {
                    json3[value] = "AMEX";
                    return json3;
                }, {});

                fetchExchangeTickers("NASDAQ").then(function (response4) {
                    json4 = response4.reduce((json4, value, key) => {
                        json4[value] = "NASDAQ";
                        return json4;
                    }, {});

                    const result = {
                        ...json,
                        ...json2,
                        ...json3,
                        ...json4,
                    };
                    setTickerMap(result);
                });
            });
        });
    });
});

function setTickerMap(obj) {
    chrome.storage.local.set({ tickerMap: obj }, function () {});
}

async function fetchExchangeTickers(exchange) {
    return new Promise((resolve, reject) =>
        fetch(
            "https://dumbstockapi.com/stock?format=tickers-only&exchange=" +
                exchange
        )
            .then((response) => response.json())
            .then((responseData) => {
                return resolve(responseData);
            })
            .catch((error) => console.warn(error))
    );
}
