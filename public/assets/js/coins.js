let currencyIsoCode = null;
let isAZeroDecimalCurrency = null;
let priceOfHundredRevamleCoins = null;

switch (document.querySelector("html").getAttribute("lang").substring(3, 5)) {
    case "":
    case "US":
        currencyIsoCode = "USD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 0.99;

        break;
    case "AG":
        currencyIsoCode = "XCD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 2.69;

        break;
    case "AU":
        currencyIsoCode = "AUD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 1.49;

        break;
    case "BN":
        currencyIsoCode = "BND";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 1.39;

        break;
    case "BG":
        currencyIsoCode = "BGN";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 1.89;

        break;
    case "CA":
        currencyIsoCode = "CAD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 1.29;

        break;
    case "NZ":
        currencyIsoCode = "NZD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 1.69;

        break;
    case "GY":
        currencyIsoCode = "GYD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 204.99;

        break;
    case "HK":
        currencyIsoCode = "HKD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 7.79;

        break;
    case "KE":
        currencyIsoCode = "KES";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 119.99;

        break;
    case "MT":
    case "IE":
        currencyIsoCode = "EUR";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 0.99;

        break;
    case "NG":
        currencyIsoCode = "NGN";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 429.99;

        break;
    case "PK":
        currencyIsoCode = "PKR";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 219.99;

        break;
    case "PH":
        currencyIsoCode = "PHP";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 59.99;

        break;
    case "QA":
        currencyIsoCode = "QAR";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 3.59;

        break;
    case "SG":
        currencyIsoCode = "SGD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 1.39;

        break;
    case "ZA":
        currencyIsoCode = "ZAR";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 17.89;

        break;
    case "LK":
        currencyIsoCode = "LKR";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 359.99;

        break;
    case "TZ":
        currencyIsoCode = "TZS";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 2309.99;

        break;
    case "GM":
        currencyIsoCode = "GMD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 54.99;

        break;
    case "TT":
        currencyIsoCode = "TTD";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 6.69;

        break;
    case "GB":
        currencyIsoCode = "GBP";
        isAZeroDecimalCurrency = false;
        priceOfHundredRevamleCoins = 0.89;

        break;
}

const showTheCoinsPurchaseMenu = function() {
    hideTheLoadingScreen();

    if (document.querySelector("#containers div")) {
        document.querySelector("#containers div").style.animationName = "shrink";

        setTimeout(function() {
            document.querySelector("#containers div").remove();
        }, 200);
    }

    setTimeout(function() {
        document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"coins-purchase-form\"><form><fieldset><label><img alt=\"\" draggable=\"false\" src=\"./public/assets/images/gelt.png\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Брой"; case "en": return "Quantity"; } }() + "</label><div class=\"counter\"><button disabled><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Намаляне"; case "en": return "Decrease"; } }() + "\" draggable=\"false\" src=\"./public/assets/images/minus.png\"></button><input disabled id=\"coins-purchase-form-quantity-input-field\" type=\"text\" value=\"100\"><button><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Увеличаване"; case "en": return "Increase"; } }() + "\" draggable=\"false\" src=\"./public/assets/images/plus.png\"></button></div><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Сума: "; case "en": return "Total: "; } }() + "<span class=\"bold\">" + priceOfHundredRevamleCoins + " " + currencyIsoCode + "</span></p><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Номер на карта"; case "en": return "Card Number"; } }() + "</label><input autocomplete=\"off\" id=\"coins-purchase-form-card-number-input-field\" type=\"text\"><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Дата на изтичане"; case "en": return "Expiration Date"; } }() + "</label><input autocomplete=\"off\" id=\"coins-purchase-form-card-expiration-date-input-field\" type=\"text\"><label>CVC</label><input autocomplete=\"off\" id=\"coins-purchase-form-cvc-input-field\" maxlength=\"4\" spellcheck=\"false\" type=\"text\"></fieldset><button id=\"coins-purchase-form-submit-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Купуване"; case "en": return "Buy"; } }() + "</button><button id=\"coins-purchase-form-cancel-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отмяна"; case "en": return "Cancel"; } }() + "</button></form></div>");

        document.querySelector("#coins-purchase-form").addEventListener("click", function(event) {
            event.stopPropagation();
        });

        document.querySelectorAll("#coins-purchase-form .counter button")[0].addEventListener("click", function(event) {
            event.preventDefault();

            document.querySelector("#coins-purchase-form .counter input").value = Number(document.querySelector("#coins-purchase-form .counter input").value) - 100;

            document.querySelector("#coins-purchase-form .counter + p span").innerHTML = function() { if (!isAZeroDecimalCurrency) { return (Number(document.querySelector("#coins-purchase-form .counter input").value) / 100 * priceOfHundredRevamleCoins).toFixed(2); } else { return (Number(document.querySelector("#coins-purchase-form .counter input").value) / 100 * priceOfHundredRevamleCoins); } }() + " " + currencyIsoCode;

            if (document.querySelector("#coins-purchase-form .counter input").value === "100") {
                document.querySelectorAll("#coins-purchase-form .counter button")[0].disabled = true;
            }

            document.querySelectorAll("#coins-purchase-form .counter button")[1].disabled = false;
        });

        document.querySelectorAll("#coins-purchase-form .counter button")[1].addEventListener("click", function(event) {
            event.preventDefault();

            document.querySelector("#coins-purchase-form .counter input").value = Number(document.querySelector("#coins-purchase-form .counter input").value) + 100;

            document.querySelector("#coins-purchase-form .counter + p span").innerHTML = function() { if (!isAZeroDecimalCurrency) { return (Number(document.querySelector("#coins-purchase-form .counter input").value) / 100 * priceOfHundredRevamleCoins).toFixed(2); } else { return (Number(document.querySelector("#coins-purchase-form .counter input").value) / 100 * priceOfHundredRevamleCoins); } }() + " " + currencyIsoCode;

            if (document.querySelector("#coins-purchase-form .counter input").value === "10000") {
                document.querySelectorAll("#coins-purchase-form .counter button")[1].disabled = true;
            }

            document.querySelectorAll("#coins-purchase-form .counter button")[0].disabled = false;
        });

        new Cleave("#coins-purchase-form-card-number-input-field", {
            "creditCard": true,
            "onCreditCardTypeChanged": function(type) {
                if (type === "unknown" || type === "amex") {
                    document.querySelector("#coins-purchase-form-cvc-input-field").setAttribute("maxlength", "4");
                }
                else {
                    document.querySelector("#coins-purchase-form-cvc-input-field").setAttribute("maxlength", "3");
                }
            }
        });

        $("#coins-purchase-form-card-expiration-date-input-field").inputmask("datetime", { "inputFormat": "mm/yy" });

        switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) {
            case "bg":
                document.querySelector("#coins-purchase-form-card-expiration-date-input-field").setAttribute("placeholder", "мм/гг");
            case "en":
                document.querySelector("#coins-purchase-form-card-expiration-date-input-field").setAttribute("placeholder", "mm/yy");
        }

        document.querySelector("#coins-purchase-form form").addEventListener("submit", function(event) {
            event.preventDefault();

            showTheLoadingScreen();

            $.ajax({
                "data": {
                    "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                    "regionIsoCode": document.querySelector("html").getAttribute("lang").substring(3, 5),
                    // "session_id": null,
                    // "sessionToken": null,
                    "quantity": Number(document.querySelector("#coins-purchase-form-quantity-input-field").value) / 100,
                    "cardNumber": document.querySelector("#coins-purchase-form-card-number-input-field").value,
                    "cardExpirationMonth": document.querySelector("#coins-purchase-form-card-expiration-date-input-field").value.substring(0, 2),
                    "cardExpirationYear": document.querySelector("#coins-purchase-form-card-expiration-date-input-field").value.substring(3, 5),
                    "cvc": document.querySelector("#coins-purchase-form-cvc-input-field").value
                },
                "type": "POST",
                "url": "./coins/purchase/",
                "success": function() {
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                },
                "error": function(data) {
                    setTimeout(function() {
                        hideTheLoadingScreen();

                        processData(data.responseJSON);
                    }, 1000);
                }
            });
        });

        document.querySelector("#coins-purchase-form-cancel-button").addEventListener("click", function(event) {
            event.preventDefault();

            document.querySelector("#curtain").click();
        });
    }, function() { if (document.querySelector("#containers div")) { return 200; } else { return 0; } }());
}