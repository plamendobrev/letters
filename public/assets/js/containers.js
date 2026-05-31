console.log(function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "%cВнимание!"; case "en": return "%cAttention!"; } }(), "color: #E60000; font-family: \"Trebuchet MS\"; font-size: 28px;");
console.log(function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "%cИзползвате функция на браузъра, предназначена за разработчици. Ако сте били помолени да копирате или поставите нещо тук, това най-вероятно ще доведе до кражбата на Вашия Revamle ID."; case "en": return "%cYou are using a browser feature intended for developers. If you have been asked to copy or paste something here, it will most likely lead to getting your Revamle ID stolen."; } }(), "font-family: \"Trebuchet MS\"; font-size: 20px;");

window.addEventListener("keydown", function(event) {
    if (event.ctrlKey && (event.keyCode === 83 || event.keyCode === 90 || event.keyCode === 89) || event.metaKey && (event.keyCode === 83 || event.keyCode === 90)) {
        event.preventDefault();
        event.stopPropagation();
    }
});

document.addEventListener("animationstart", function(event) {
    if (!event.target.hasAttribute("data-is-being-relocated")) {
        if (!document.activeElement.hasAttribute("contenteditable")) {
            document.activeElement.blur();
        }

        for (let i = 0; i < document.querySelectorAll("a, button, input, textarea, select").length; i++) {
            document.querySelectorAll("a, button, input, textarea, select")[i].setAttribute("tabindex", -1);
        }
        document.querySelector("#curtain").style.pointerEvents = "none";
    }
});

const restorePageInteractions = function() {
    if (window.getComputedStyle(document.querySelector("#curtain .blur"), null).animationName === "fade-in") {
        for (let i = 0; i < document.querySelectorAll("#containers a, #containers button, #containers input").length; i++) {
            document.querySelectorAll("#containers a, #containers button, #containers input")[i].setAttribute("tabindex", "0");
        }

        if (document.querySelectorAll("#containers > div").length) {
            if (document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelector("input") && document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelector("input").getAttribute("type") !== "checkbox") {
                if (!document.querySelector("#register-form-first-step") || window.getComputedStyle(document.querySelector("#register-form-first-step"), null).animationName !== "grow") {
                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelector("input").focus();
                }
                else {
                    document.querySelector("#register-form-first-step-first-name-input-field").focus();
                }
            }
        }
    }
    else {
        for (let i = 0; i < document.querySelectorAll("a, button, input, textarea, select").length; i++) {
            document.querySelectorAll("a, button, input, textarea, select")[i].setAttribute("tabindex", "0");
        }

        document.querySelectorAll("#containers > div").forEach(function(element) {
            if (document.querySelector("#editor") && (element.getAttribute("id") === "update-document-cover-menu" || element.classList.contains("friends-list"))) {
                element.removeAttribute("style");
            }
            else {
                element.remove();
            }
        });

        document.querySelector("#curtain").style.display = "none";
    }

    document.querySelector("#curtain").style.pointerEvents = "auto";
}

document.addEventListener("animationend", function(event) {
    if (!event.target.hasAttribute("data-is-being-relocated")) {
        if (document.querySelector("#loading-screen")) {
            if (window.getComputedStyle(document.querySelector("#loading-screen .blur"), null).animationName === "fade-out") {
                document.querySelector("#loading-screen").remove();
            }
        }

        if (!document.querySelector("#loading-screen")) {
            restorePageInteractions();
        }
    }
    else {
        event.target.style.removeProperty("animation");
        event.target.style.removeProperty("transform");
    }
});

let sessionStatusCheckSocket = null;

let lettersSocket = null;
let booksSocket = null;
let socketIsClosed = false;
const showTheClosedSocketMessage = function() {
    if (document.querySelector("#letters")) {
        if (!document.querySelector("#editor")) {
            hasLoggedIn = false;

            if ((!document.querySelector("#loading-screen") || !$("#containers > div").length && !document.querySelector("#documents").innerHTML || socketIsClosed) && !$("#containers > div").last().is(":animated") && $("#containers > div button").first().text() !== function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }()) {
                for (let i = 0; i < document.querySelectorAll("#documents div").length; i++) {
                    document.querySelectorAll("#documents div")[i].style.animationName = "fade-out";
                }
                setTimeout(function() {
                    document.querySelectorAll("#documents div").forEach(function(element) {
                        element.remove();
                    });
                }, 200);

                if (window.getComputedStyle(document.querySelector("#curtain .blur"), null).animationName === "fade-out") {
                    hideTheApplication();
                }

                for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                    document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
                }
                setTimeout(function() {
                    document.querySelectorAll("#containers > div").forEach(function(element) {
                        element.remove();
                    });
                    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Не е установена връзка"; case "en": return "No connection established"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Моля, опитайте по-късно."; case "en": return "Please try again later."; } }() + "</p><button disabled>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() + "</button></div>");
                }, function() { if (document.querySelector("#loading-screen") || document.querySelector("#containers div")) { return 200; } else { return 0; } }());

                if (document.querySelector("#loading-screen")) {
                    hideTheLoadingScreen();
                }
            }

            socketIsClosed = true;
        }

        lettersSocket.disconnect();
    }
    if (document.querySelector("#books")) {
        if (!document.querySelector("#book")) {
            hasLoggedIn = false;

            if ((!document.querySelector("#loading-screen") || !$("#containers > div").length && !document.querySelector("#library").innerHTML || socketIsClosed) && !$("#containers > div").last().is(":animated") && $("#containers > div button").first().text() !== function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }()) {
                for (let i = 0; i < document.querySelectorAll("#library a, #library div").length; i++) {
                    document.querySelectorAll("#library a, #library div")[i].style.animationName = "fade-out";
                }
                setTimeout(function() {
                    document.querySelectorAll("#library a, #library div").forEach(function(element) {
                        element.remove();
                    });
                }, 200);

                if (window.getComputedStyle(document.querySelector("#curtain .blur"), null).animationName === "fade-out") {
                    hideTheApplication();
                }

                for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                    document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
                }
                setTimeout(function() {
                    document.querySelectorAll("#containers > div").forEach(function(element) {
                        element.remove();
                    });
                    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Не е установена връзка"; case "en": return "No connection established"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Моля, опитайте по-късно."; case "en": return "Please try again later."; } }() + "</p><button disabled>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() + "</button></div>");
                }, function() { if (document.querySelector("#loading-screen") || document.querySelector("#containers div")) { return 200; } else { return 0; } }());

                if (document.querySelector("#loading-screen")) {
                    hideTheLoadingScreen();
                }
            }

            socketIsClosed = true;
        }

        booksSocket.disconnect();
    }
}

let isActive = true;
let hasLoggedIn = null;
let agreesToTosAndPP = null;

let reportInactivity = null;
const setAnInactivityReportInterval = function() {
    reportInactivity = setInterval(function() {
        isActive = false;
    }, 5000);
}
setAnInactivityReportInterval();

document.addEventListener("mousemove", function() {
    clearInterval(reportInactivity);
    setAnInactivityReportInterval();
    isActive = true;
});

document.addEventListener("click", function(event) {
    clearInterval(reportInactivity);
    setAnInactivityReportInterval();
    isActive = true;

    if (document.querySelector("#context-menu") && event.target !== document.querySelector("#context-menu")) {
        document.querySelector("#editor").removeAttribute("style");
        if (document.querySelector("#letters-toolbar-buttons").childNodes.length !== 2 && (window.getComputedStyle(document.querySelector("#magic-effects-button"), null).opacity === "0.5" || window.getComputedStyle(document.querySelector("#letters-home-and-save-button"), null).opacity === "1")) {
            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] img").length; i++) {
                document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
            }
        }
        else {
            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "0");
            }
            if (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]")) {
                document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").setAttribute("tabindex", "-1");
            }
        }
        if (document.querySelector("#letters-toolbar-buttons").childNodes.length !== 2 && !document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]") && (window.getComputedStyle(document.querySelector("#magic-effects-button"), null).opacity === "0.5" || window.getComputedStyle(document.querySelector("#letters-home-and-save-button"), null).opacity === "1")) {
            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("tabindex", "0");
        }
        for (let i = 0; i < document.querySelectorAll("#editor button, #editor input").length; i++) {
            document.querySelectorAll("#editor button, #editor input")[i].setAttribute("tabindex", "0");
        }
        document.querySelector("#context-menu").remove();
    }
});

document.addEventListener("input", function() {
    clearInterval(reportInactivity);
    setAnInactivityReportInterval();
    isActive = true;
});

const increaseSessionTimeout = function() {
    setTimeout(function() {
        if (hasLoggedIn && isActive) {
            $.ajax({
                "type": "POST",
                "url": "./session/increase-timeout/",
                "success": function() {
                    increaseSessionTimeout();
                }
            });
        }
        else {
            increaseSessionTimeout();
        }
    }, 5000);
}
increaseSessionTimeout();

if (document.querySelector("body > #bar")) {
    sessionStatusCheckSocket = io();
    sessionStatusCheckSocket.on("sessionStatusCheck", function(isLoggedIn) {
        if (hasLoggedIn && !isLoggedIn && window.getComputedStyle(document.querySelector("#curtain .blur"), null).animationName === "fade-in" && window.getComputedStyle(document.querySelector("#containers nav"), null).display === "none" && !document.querySelector("#loading-screen") && $("#containers > div").length && !$("#restore-form-first-step").length && !$("#register-form-first-step").length && !$("#containers > div").last().is(":animated") && $("#containers > div button").first().text() !== function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Влизане"; case "en": return "Log In"; } }()) {
            for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
            }
            setTimeout(function() {
                document.querySelector("#containers nav").style.display = "none";
                document.querySelectorAll("#containers > div").forEach(function(element) {
                    element.remove();
                });
                document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Не сте влезли"; case "en": return "You are not logged in"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Възможното е Вашата сесия да е изтекла. Желаете ли да влезете във Вашия Revamle ID?"; case "en": return "Your session may have expired. Would you like to log in to your Revamle ID?"; } }() + "</p><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Влизане"; case "en": return "Log In"; } }() + "</button><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() + "</button></div>");

                document.querySelector("#containers div").addEventListener("click", function(event) {
                    event.stopPropagation();
                });

                document.querySelectorAll("#containers div button")[0].addEventListener("click", function() {
                    document.querySelector("#containers div").style.animationName = "shrink";
                    setTimeout(function() {
                        document.querySelector("#containers div").remove();
                        showTheLogInForm();
                    }, 200);
                });

                document.querySelectorAll("#containers div button")[1].addEventListener("click", function() {
                    document.querySelector("#curtain").click();
                });
            }, 200);
        }

        hasLoggedIn = isLoggedIn;

        sessionStatusCheckSocket.disconnect();
    });
    sessionStatusCheckSocket.on("connect", function() {
        sessionStatusCheckSocket.emit("sessionStatusCheck");
    });
    sessionStatusCheckSocket.on("disconnect", function() {
        setTimeout(function() {
            if (!sessionStatusCheckSocket.connected) {
                sessionStatusCheckSocket.connect();
            }
        }, 5000);
    });
}
else {
    if (document.querySelector("#documents")) {
        lettersSocket = io();
    }
    if (document.querySelector("#library")) {
        booksSocket = io();
    }
}

let reconnectTheSocketAfterInactivity = null;
const setASocketReconnectionTimeout = function() {
    reconnectTheSocketAfterInactivity = setTimeout(function() {
        if (document.querySelector("body > #bar")) {
            if (!sessionStatusCheckSocket.connected) {
                sessionStatusCheckSocket.connect();
            }
        }
        else {
            if (lettersSocket && !socketIsClosed && !lettersSocket.connected && !document.querySelector("#editor")) {
                lettersSocket.connect();
            }

            if (booksSocket && !socketIsClosed && !booksSocket.connected && !document.querySelector("#book")) {
                booksSocket.connect();
            }
        }
    }, 5000);
}
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        setASocketReconnectionTimeout();

        if (!$("#curtain .blur").is(":animated") && !$("#containers > div").last().is(":animated") && !document.querySelector("#loading-screen")) {
            restorePageInteractions();
        }
    }
    else {
        clearTimeout(reconnectTheSocketAfterInactivity);
    }
});

const showTheLoadingScreen = function() {
    document.querySelector("html body").insertAdjacentHTML("beforeend", "<div id=\"loading-screen\"><div class=\"blur\"><div id=\"spinner-container\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Зареждане"; case "en": return "Loading"; } }() + "\" draggable=\"false\" src=\"./public/assets/images/Spin-1s-200px.svg\"></div></div></div>");
}

const hideTheLoadingScreen = function() {
    document.querySelector("#loading-screen .blur").style.animationName = "fade-out";
    document.querySelector("#spinner-container img").style.animationName = "shrink";
}

const processData = function(data) {
    for (let i = 0; i < document.querySelectorAll("#containers div form fieldset > input").length; i++) {
        if (document.querySelectorAll("#containers div form fieldset > input")[i].nextElementSibling && document.querySelectorAll("#containers div form fieldset > input")[i].nextElementSibling.tagName === "P" && window.getComputedStyle(document.querySelectorAll("#containers div form fieldset > input")[i].nextElementSibling, null).color === "rgb(230, 0, 0)") {
            document.querySelectorAll("#containers div form fieldset > input")[i].nextElementSibling.remove();
        }
    }

    for (let i = 0; i < document.querySelectorAll("#containers div form fieldset select").length; i++) {
        if (document.querySelectorAll("#containers div form fieldset select")[i].nextElementSibling) {
            document.querySelectorAll("#containers div form fieldset select")[i].nextElementSibling.remove();
        }
    }

    if (!data) {
        if (document.querySelector("#containers nav")) {
            document.querySelector("#containers nav").style.animationName = "shrink";
        }
        for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
            document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
        }
        setTimeout(function() {
            if (document.querySelector("#containers nav")) {
                document.querySelector("#containers nav").style.display = "none";
            }
            document.querySelectorAll("#containers > div").forEach(function(element) {
                if (document.querySelector("#editor") && (element.getAttribute("id") === "update-document-cover-menu" || element.classList.contains("friends-list"))) {
                    element.style.display = "none";
                }
                else {
                    element.remove();
                }
            });
            document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Действието не може да бъде извършено"; case "en": return "The action cannot be performed"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Моля, опитайте по-късно."; case "en": return "Please try again later."; } }() + "</p><button" + function() { if (!document.querySelector("body > #bar") && !document.querySelector("#editor") && !document.querySelector("#book")) { return " disabled>"; } else { return ">"; } }() + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() + "</button></div>");

            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].addEventListener("click", function(event) {
                event.stopPropagation();
            });

            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length -1].querySelector("button").addEventListener("click", function() {
                if (!document.querySelector("#editor") && !document.querySelector("#book")) {
                    document.querySelector("#curtain").click();
                }
                else {
                    showTheApplication();

                    if (document.querySelector("#editor")) {
                        if (document.querySelector("#letters-toolbar-buttons").childNodes.length !== 2) {
                            setTimeout(function() {
                                document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                    document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                }

                                const sheetScrollPosition = document.querySelector("#editor-sheet-container .simplebar-content-wrapper").scrollTop;

                                document.querySelector("#editor-sheet div[contenteditable]").focus();
                                setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                                document.querySelector("#editor-sheet-container .simplebar-content-wrapper").scrollTop = sheetScrollPosition;
                            }, 200);
                        }
                        else {
                            setTimeout(function() {
                                for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrappers").length; i++) {
                                    document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrappers")[i].setAttribute("tabindex", "0");
                                }
                            }, 200);
                        }
                    }

                    if (document.querySelector("#book")) {
                        setTimeout(function() {
                            for (let i = 0; i < document.querySelectorAll("#book a, #book button, #book-sheet > div .word-piece-wrapper[data-effect-name][tabindex]").length; i++) {
                                document.querySelectorAll("#book a, #book button, #book-sheet > div .word-piece-wrapper[data-effect-name][tabindex]")[i].setAttribute("tabindex", "0");
                            }
                        }, 200);
                    }
                }
            });
        }, 200);

        if (lettersSocket && !document.querySelector("#editor")) {
            lettersSocket.disconnect();
            socketIsClosed = true;
        }

        if (booksSocket && !document.querySelector("#book")) {
            booksSocket.disconnect();
            socketIsClosed = true;
        }
    }
    else {
        for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].inputFields.length) {
                for (let j = 0; j < data[i].inputFields.length; j++) {
                    document.querySelector("#" + data[i].inputFields[j]).insertAdjacentHTML("afterend", "<p style=\"color: #E60000;\">" + data[i].text.paragraphs[0] + "</p>");
                }

                if (i === 0) {
                    if (!$("#" + data[i].inputFields[0]).closest("div").is(":visible")) {
                        for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                            document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
                        }
                        setTimeout(function() {
                            document.querySelectorAll("#containers > div").forEach(function(element) {
                                if (element.getAttribute("id") === "login-form-second-step" || element.getAttribute("id") === "restore-form-second-step") {
                                    element.remove();
                                }
                                else {
                                    element.style.display = "none";

                                    if (element.getAttribute("id") === "register-form-second-step") {
                                        document.querySelector("#register-form-second-step-agree-to-tos-and-pp-checkbox").checked = false;
                                        document.querySelector("#register-form-second-step-register-button").disabled = true;
                                    }
                                }
                            });

                            $("#" + data[i].inputFields[0]).closest("div").css("animationName", "grow");
                            $("#" + data[i].inputFields[0]).closest("div").show();
                        }, 200);
                    }
                }
            }
            else {
                if (document.querySelector("#containers nav")) {
                    document.querySelector("#containers nav").style.animationName = "shrink";
                }
                for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                    document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
                }
                setTimeout(function() {
                    if (document.querySelector("#containers nav")) {
                        document.querySelector("#containers nav").style.display = "none";
                    }
                    if (!data[i].options.includes(function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }()) && !data[i].options.includes(function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Съгласявам се"; case "en": return "Agree"; } }())) {
                        document.querySelectorAll("#containers > div").forEach(function(element) {
                            if (document.querySelector("#editor") && (element.getAttribute("id") === "update-document-cover-menu" || element.classList.contains("friends-list"))) {
                                element.style.display = "none";
                            }
                            else {
                                element.remove();
                            }
                        });
                    }
                    else {
                        if (data[i].options.length === 2 && !data[i].options.includes(function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Съгласявам се"; case "en": return "Agree"; } }()) && (data[i].options.includes(function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }()) || data[i].options.includes(function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отмяна"; case "en": return "Cancel"; } }())) && !document.querySelector("#coins-purchase-form") && !document.querySelector("#payout-form") && !document.querySelector("#books-review-form") || document.querySelector(".friends-list") && document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1] !== document.querySelector(".friends-list")) {
                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].remove();
                        }
                        for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                            document.querySelectorAll("#containers > div")[i].style.display = "none";
                        }
                    }

                    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + data[i].text.heading + "</h3>" + function() { let paragraphs = ""; for (let j = 0; j < data[i].text.paragraphs.length; j++) { paragraphs += "<p>" + data[i].text.paragraphs[j] + "</p>"; } for (let j = 0; j < data[i].text.emphases.length; j++) { paragraphs = paragraphs.replaceAll(data[i].text.emphases[j].word, function() { if (data[i].text.emphases[j].url) { return "<a draggable=\"false\" href=\"" + data[i].text.emphases[j].url + "\" target=\"_blank\">" + data[i].text.emphases[j].word + "</a>"; } else { return "<span class=\"" + data[i].text.emphases[j].style + "\">" + data[i].text.emphases[j].word + "</span>"; } }()) } let options = ""; for (let j = 0; j < data[i].options.length; j++) { if (data[i].options[j] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отваряне"; case "en": return "Open"; } }() || data[i].options[j] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Избиране на страна"; case "en": return "Region Select"; } }()) { if (data[i].options[j] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отваряне"; case "en": return "Open"; } }()) { options += "<a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "books/\">" + data[i].options[j] + "</a>"; } if (data[i].options[j] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Избиране на страна"; case "en": return "Region Select"; } }()) { options += "<a draggable=\"false\" href=\"./regions/\">" + data[i].options[j] + "</a>"; } } else { if ((!document.querySelector("body > #bar")) && (data[i].options[j] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() || data[i].options[j] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отмяна"; case "en": return "Cancel"; } }())) { if (data[i].options.length === 1 && document.querySelector("#containers div") && !document.querySelector("#register-form-first-step")) { options += "<button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button>"; } else { options += "<button" + function() { if (document.querySelector("#containers div") || document.querySelector("#editor") || document.querySelector("#book")) { return " disabled>"; } else { return ">"; } }() + data[i].options[j] + "</button>"; } } else { options += "<button>" + data[i].options[j] + "</button>"; } } } return paragraphs + options; }() + "</div>");

                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].addEventListener("click", function(event) {
                        event.stopPropagation();
                    });

                    for (let j = 0; j < document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button").length; j++) {
                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[j].addEventListener("click", function() {
                            switch (document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[j].innerHTML) {
                                case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }():
                                    document.querySelector("#curtain").click();

                                    break;
                                case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отмяна"; case "en": return "Cancel"; } }():
                                    document.querySelector("#curtain").click();

                                    break;
                                case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }():
                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.animationName = "shrink";
                                    setTimeout(function() {
                                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].remove();

                                        if (!document.querySelector("body > #bar")) {
                                            showTheLogInForm();
                                        }
                                        else {
                                            if (data[i].options.length > 2) {
                                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].remove();
                                            }
                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.animationName = "grow";
                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.display = "block";
                                        }
                                    }, 200);

                                    break;
                                case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Съгласявам се"; case "en": return "Agree"; } }():
                                    agreeToTosAndPP(false);

                                    break;
                                case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Влизане"; case "en": return "Log In"; } }():
                                    if (!document.querySelector("#editor") && !document.querySelector("#book")) {
                                        document.querySelector("#containers div").style.animationName = "shrink";
                                        setTimeout(function() {
                                            document.querySelector("#containers div").remove();
                                            showTheLogInForm();
                                        }, 200);
                                    }
                                    else {
                                        for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                                            document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
                                        }
                                        setTimeout(function() {
                                            document.querySelectorAll("#containers > div").forEach(function(element) {
                                                if (element.getAttribute("id") === "update-document-cover-menu" || element.classList.contains("friends-list")) {
                                                    element.style.display = "none";
                                                }
                                                else {
                                                    element.remove();
                                                }
                                            });
                                            showTheLogInForm();
                                        }, 200);
                                    }

                                    break;
                                case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Възстановяване"; case "en": return "Restore"; } }():
                                    if (!document.querySelector("#editor") && !document.querySelector("#book")) {
                                        document.querySelector("#containers div").style.animationName = "shrink";
                                        setTimeout(function() {
                                            document.querySelector("#containers div").remove();
                                            showTheRestoreForm();
                                        }, 200);
                                    }
                                    else {
                                        for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                                            document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
                                        }
                                        setTimeout(function() {
                                            document.querySelectorAll("#containers > div").forEach(function(element) {
                                                if (element.getAttribute("id") === "update-document-cover-menu" || element.classList.contains("friends-list")) {
                                                    element.style.display = "none";
                                                }
                                                else {
                                                    element.remove();
                                                }
                                            });
                                            showTheRestoreForm();
                                        }, 200);
                                    }

                                    break;
                                case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Излизане"; case "en": return "Log Out"; } }():
                                    logOut();
                            }
                        });
                    }
                }, 200);
            }
        }
    }
}

const showTheLogInForm = function() {
    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"login-form-first-step\"><form><fieldset><label>Revamle ID</label><input autocomplete=\"off\" id=\"login-form-first-step-username-input-field\" maxlength=\"32\" spellcheck=\"false\" type=\"text\"><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Парола"; case "en": return "Password"; } }() + "</label><input autocomplete=\"on\" id=\"login-form-first-step-password-input-field\" maxlength=\"128\" type=\"password\"></fieldset><button id=\"login-form-first-step-submit-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Влизане"; case "en": return "Log In"; } }() + "</button><button id=\"login-form-first-step-restore-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Възстановяване"; case "en": return "Restore"; } }() + "</button>" + function() { if (document.querySelector("body > #bar")) { return "<button id=\"login-form-first-step-create-a-revamle-id-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Създаване на Revamle ID"; case "en": return "Create a Revamle ID"; } }() + "</button><button id=\"login-form-first-step-close-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() + "</button></form></div>"; } else { return ""; } }());

    document.querySelector("#login-form-first-step").addEventListener("click", function(event) {
        event.stopPropagation();
    });

    $("#login-form-first-step form fieldset > input").on("input", function() {
        if ($(this).next() && $(this).next().prop("tagName") === "P" && $(this).next().css("color") === "rgb(230, 0, 0)") {
            $(this).next().remove();
        }
    });

    for (let i = 0; i < document.querySelectorAll("#login-form-first-step input").length; i++) {
        document.querySelectorAll("#login-form-first-step input")[i].addEventListener("keypress", function(event) {
            if (event.keyCode === 32) {
                event.preventDefault();
            }
        });
    }

    document.querySelector("#login-form-first-step form").addEventListener("submit", function(event) {
        event.preventDefault();

        if (!document.querySelector("#loading-screen")) {
            showTheLoadingScreen();
        }

        if (socketIsClosed) {
            setTimeout(function() {
                showTheClosedSocketMessage();
            }, 1000);
        }
        else {
            $.ajax({
                "data": {
                    "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                    // "session_id": null,
                    // "sessionToken": null,
                    "username": document.querySelector("#login-form-first-step-username-input-field").value,
                    "password": document.querySelector("#login-form-first-step-password-input-field").value,
                    "enteredVerificationCode": null,
                    "toNotBeRequiredVerification": null
                },
                "type": "POST",
                "url": "./log-in/",
                "success": function(data) {
                    if (!Array.isArray(data)) {
                        if (document.querySelector("body > #bar")) {
                            document.querySelector("#navigation-menu-revamle-id-button").click();
                        }
                        else {
                            if (document.querySelector("#editor")) {
                                hideTheLoadingScreen();

                                showTheApplication();

                                if (document.querySelector("#letters-toolbar-buttons").childNodes.length !== 2) {
                                    setTimeout(function() {
                                        document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                            document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                        }

                                        const sheetScrollPosition = document.querySelector("#editor-sheet-container .simplebar-content-wrapper").scrollTop;

                                        document.querySelector("#editor-sheet div[contenteditable]").focus();
                                        setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                                        document.querySelector("#editor-sheet-container .simplebar-content-wrapper").scrollTop = sheetScrollPosition;
                                    }, 200);
                                }
                                else {
                                    setTimeout(function() {
                                        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrappers").length; i++) {
                                            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrappers")[i].setAttribute("tabindex", "0");
                                        }
                                    }, 200);
                                }
                            }

                            if (document.querySelector("#book")) {
                                hideTheLoadingScreen();

                                showTheApplication();

                                setTimeout(function() {
                                    for (let i = 0; i < document.querySelectorAll("#book a, #book button, #book-sheet > div .word-piece-wrapper[data-effect-name][tabindex]").length; i++) {
                                        document.querySelectorAll("#book a, #book button, #book-sheet > div .word-piece-wrapper[data-effect-name][tabindex]")[i].setAttribute("tabindex", "0");
                                    }
                                }, 200);
                            }
                        }
                    }
                    else {
                        setTimeout(function() {
                            hideTheLoadingScreen();

                            processData(data);
                        }, 1000);
                    }
                },
                "error": function(data) {
                    setTimeout(function() {
                        hideTheLoadingScreen();

                        if (data.status === 403) {
                            if (data.responseJSON[0].inputFields[0] === "login-form-second-step-code-input-field") {
                                if (!document.querySelector("#login-form-second-step")) {
                                    if (window.getComputedStyle(document.querySelector("#login-form-first-step"), null).display === "none") {
                                        document.querySelector("#register-form-first-step").style.animationName = "shrink";
                                        document.querySelector("#register-form-second-step").style.animationName = "shrink";
                                    }
                                    document.querySelector("#login-form-first-step").style.animationName = "shrink";
                                    setTimeout(function() {
                                        if (window.getComputedStyle(document.querySelector("#login-form-first-step"), null).display === "none") {
                                            document.querySelector("#register-form-first-step").remove();
                                            document.querySelector("#register-form-second-step").remove();
                                        }
                                        document.querySelector("#login-form-first-step").style.display = "none";
                                        document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"login-form-second-step\"><form><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Код"; case "en": return "Code"; } }() + "</label><input autocomplete=\"off\" id=\"login-form-second-step-code-input-field\" maxlength=\"4\" spellcheck=\"false\" type=\"text\"><p>" + data.responseJSON[0].text.paragraphs[0] + "</p><label class=\"checkbox-container\"><input id=\"login-form-second-step-require-verification-checkbox\" type=\"checkbox\"><span><img alt=\"\" src=\"./public/assets/images/check.png\" draggable=\"false\"></span>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Да не се изисква код за потвърждение на това устройство."; case "en": return "Do not require a verification code on this device."; } }() + "</label></fieldset><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Влизане"; case "en": return "Log In"; } }() + "</button><button id=\"login-form-second-step-resend-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Повторно изпращане"; case "en": return "Resend"; } }() + "</button><button id=\"login-form-second-step-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button>" + function() { if (document.querySelector("body > #bar")) { return "<button id=\"login-form-second-step-close-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() + "</button></form></div>"; } else { return ""; } }());

                                        document.querySelector("#login-form-second-step").addEventListener("click", function(event) {
                                            event.stopPropagation();
                                        });

                                        $("#login-form-second-step-code-input-field").on("input", function() {
                                            if ($(this).next() && $(this).next().prop("tagName") === "P" && $(this).next().css("color") === "rgb(230, 0, 0)") {
                                                $(this).next().remove();
                                            }
                                        });

                                        document.querySelector("#login-form-second-step-code-input-field").addEventListener("keypress", function(event) {
                                            if (event.keyCode === 32) {
                                                event.preventDefault();
                                            }
                                        });

                                        document.querySelector("#login-form-second-step form").addEventListener("submit", function(event) {
                                            event.preventDefault();

                                            showTheLoadingScreen();

                                            if (socketIsClosed) {
                                                setTimeout(function() {
                                                    showTheClosedSocketMessage();
                                                }, 1000);
                                            }
                                            else {
                                                $.ajax({
                                                    "data": {
                                                        "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                        // "session_id": null,
                                                        // "sessionToken": null,
                                                        "username": document.querySelector("#login-form-first-step-username-input-field").value,
                                                        "password": document.querySelector("#login-form-first-step-password-input-field").value,
                                                        "enteredVerificationCode": document.querySelector("#login-form-second-step-code-input-field").value,
                                                        "toNotBeRequiredVerification": document.querySelector("#login-form-second-step-require-verification-checkbox").checked
                                                    },
                                                    "type": "POST",
                                                    "url": "./log-in/",
                                                    "success": function(data) {
                                                        if (!Array.isArray(data)) {
                                                            if (document.querySelector("body > #bar")) {
                                                                document.querySelector("#navigation-menu-revamle-id-button").click();
                                                            }
                                                            else {
                                                                if (document.querySelector("#editor")) {
                                                                    hideTheLoadingScreen();

                                                                    showTheApplication();

                                                                    if (document.querySelector("#letters-toolbar-buttons").childNodes.length !== 2) {
                                                                        setTimeout(function() {
                                                                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                                                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                                                            }

                                                                            const sheetScrollPosition = document.querySelector("#editor-sheet-container .simplebar-content-wrapper").scrollTop;

                                                                            document.querySelector("#editor-sheet div[contenteditable]").focus();
                                                                            setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                                                                            document.querySelector("#editor-sheet-container .simplebar-content-wrapper").scrollTop = sheetScrollPosition;
                                                                        }, 200);
                                                                    }
                                                                    else {
                                                                        setTimeout(function() {
                                                                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrappers").length; i++) {
                                                                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrappers")[i].setAttribute("tabindex", "0");
                                                                            }
                                                                        }, 200);
                                                                    }
                                                                }

                                                                if (document.querySelector("#book")) {
                                                                    hideTheLoadingScreen();

                                                                    showTheApplication();

                                                                    setTimeout(function() {
                                                                        for (let i = 0; i < document.querySelectorAll("#book a, #book button, #book-sheet > div .word-piece-wrapper[data-effect-name][tabindex]").length; i++) {
                                                                            document.querySelectorAll("#book a, #book button, #book-sheet > div .word-piece-wrapper[data-effect-name][tabindex]")[i].setAttribute("tabindex", "0");
                                                                        }
                                                                    }, 200);
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            setTimeout(function() {
                                                                hideTheLoadingScreen();

                                                                processData(data);
                                                            }, 1000);
                                                        }
                                                    },
                                                    "error": function(data) {
                                                        setTimeout(function() {
                                                            hideTheLoadingScreen();

                                                            processData(data.responseJSON);
                                                        }, 1000);
                                                    }
                                                });
                                            }
                                        });

                                        document.querySelector("#login-form-second-step-resend-button").addEventListener("click", function(event) {
                                            event.preventDefault();

                                            document.querySelector("#login-form-first-step-submit-button").click();
                                        });

                                        document.querySelector("#login-form-second-step-back-button").addEventListener("click", function(event) {
                                            event.preventDefault();

                                            document.querySelector("#login-form-second-step").style.animationName = "shrink";
                                            setTimeout(function() {
                                                document.querySelector("#login-form-second-step").remove();
                                                document.querySelector("#login-form-first-step").style.animationName = "grow";
                                                document.querySelector("#login-form-first-step").style.display = "block";
                                            }, 200);
                                        });

                                        if (document.querySelector("#login-form-second-step-close-button")) {
                                            document.querySelector("#login-form-second-step-close-button").addEventListener("click", function(event) {
                                                event.preventDefault();

                                                document.querySelector("#curtain").click();
                                            });
                                        }
                                    }, 200);
                                }
                                else {
                                    if (window.getComputedStyle(document.querySelector("#login-form-second-step-code-input-field").nextElementSibling, null).color === "rgb(230, 0, 0)") {
                                        document.querySelector("#login-form-second-step-code-input-field").nextElementSibling.remove();
                                    }

                                    document.querySelector("#login-form-second-step-code-input-field").nextElementSibling.innerHTML = function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отново бе изпратен четирицифрен код до Вашата електронна поща. За да продължите, моля, поставете го в полето за въвеждане."; case "en": return "You received a four-digit code in your e-mail again. To continue, please enter it in the input field."; } }();
                                }
                            }
                            else {
                                processData(data.responseJSON);
                            }
                        }
                        else {
                            processData(data.responseJSON);
                        }
                    }, 1000);
                }
            });
        }
    });

    document.querySelector("#login-form-first-step-restore-button").addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector("#login-form-first-step").style.animationName = "shrink";
        setTimeout(function() {
            document.querySelector("#login-form-first-step").remove();
            showTheRestoreForm();
        }, 200);
    });

    if (document.querySelector("#login-form-first-step-create-a-revamle-id-button")) {
        document.querySelector("#login-form-first-step-create-a-revamle-id-button").addEventListener("click", function(event) {
            event.preventDefault();

            document.querySelector("#login-form-first-step").style.animationName = "shrink";
            setTimeout(function() {
                document.querySelector("#login-form-first-step").style.display = "none";
                document.querySelector("#login-form-first-step-username-input-field").value = "";
                document.querySelector("#login-form-first-step-password-input-field").value = "";
                document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"register-form-first-step\"><form><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Име"; case "en": return "First Name"; } }() + "</label><input autocomplete=\"off\" id=\"register-form-first-step-first-name-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Фамилия"; case "en": return "Last Name"; } }() + "</label><input autocomplete=\"off\" id=\"register-form-first-step-last-name-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Дата на раждане"; case "en": return "Date of Birth"; } }() + "</label><input autocomplete=\"off\" id=\"register-form-first-step-date-of-birth-input-field\" type=\"text\"></fieldset><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Напред"; case "en": return "Next"; } }() + "</button><button id=\"register-form-first-step-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");
                document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"register-form-second-step\" style=\"display: none;\"><form><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Електронна поща"; case "en": return "E-mail"; } }() + "</label><input autocomplete=\"off\" id=\"register-form-second-step-email-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Потребителско име"; case "en": return "Username"; } }() + "</label><input autocomplete=\"off\" id=\"register-form-second-step-username-input-field\" maxlength=\"32\" spellcheck=\"false\" type=\"text\"><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Това ще бъде потребителското име, необходимо за влизане във Вашия Revamle ID. Препоръчваме Ви да не го споделяте с никого."; case "en": return "This will be the username needed to log in to your Revamle ID. We recommend that you do not share it with anyone."; } }() + "</p><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Парола"; case "en": return "Password"; } }() + "</label><input autocomplete=\"on\" id=\"register-form-second-step-password-input-field\" maxlength=\"128\" type=\"password\"><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Вашата парола трябва да е дълга поне осем знака и да съдържа цифри, главни и малки букви."; case "en": return "Your password must be at least eight characters long and contain digits, uppercase and lowercase letters."; } }() + "</p><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Потвърждаване на паролата"; case "en": return "Confirm Password"; } }() + "</label><input autocomplete=\"on\" id=\"register-form-second-step-confirm-password-input-field\" maxlength=\"128\" type=\"password\"><label class=\"checkbox-container\"><input id=\"register-form-second-step-agree-to-tos-and-pp-checkbox\" type=\"checkbox\"><span><img alt=\"\" src=\"./public/assets/images/check.png\" draggable=\"false\"></span>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Съгласявам се с <a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "terms-of-use/\" target=\"_blank\">Общите условия</a> и <a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "privacy-policy/\" target=\"_blank\">Политиката за поверителност</a>."; case "en": return "I agree to the <a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "terms-of-use/\" target=\"_blank\">Terms of Use</a> and <a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "privacy-policy/\" target=\"_blank\">Privacy Policy</a>."; } }() + "</label></fieldset><button disabled id=\"register-form-second-step-register-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Регистриране"; case "en": return "Register"; } }() + "</button><button id=\"register-form-second-step-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");

                document.querySelector("#register-form-first-step").addEventListener("click", function(event) {
                    event.stopPropagation();
                });

                document.querySelector("#register-form-second-step").addEventListener("click", function(event) {
                    event.stopPropagation();
                });

                $("#register-form-first-step form fieldset > input, #register-form-second-step form fieldset > input").on("input", function() {
                    if ($(this).next() && $(this).next().prop("tagName") === "P" && $(this).next().css("color") === "rgb(230, 0, 0)") {
                        const messageText = $(this).next().text();

                        $(this).next().remove();
                        $("#register-form-first-step form fieldset > input + p, #register-form-second-step form fieldset > input + p").each(function() {
                            if ($(this).text() === messageText) {
                                $(this).remove();
                            }
                        });
                    }
                });

                $("#register-form-first-step-date-of-birth-input-field").inputmask("datetime", function() {
                    switch (document.querySelector("html").getAttribute("lang").substring(3, 5)) {
                        case "":
                        case "ZA":
                            document.querySelector("#register-form-first-step-date-of-birth-input-field").setAttribute("placeholder", "yyyy/mm/dd");
                            return { "inputFormat": "yyyy/mm/dd" };
                        case "AG":
                        case "AU":
                        case "BN":
                        case "GY":
                        case "HK":
                        case "KE":
                        case "MT":
                        case "NZ":
                        case "NG":
                        case "PK":
                        case "PH":
                        case "QA":
                        case "IE":
                        case "SG":
                        case "LK":
                        case "TZ":
                        case "GM":
                        case "TT":
                        case "GB":
                            document.querySelector("#register-form-first-step-date-of-birth-input-field").setAttribute("placeholder", "dd/mm/yyyy");
                            return { "inputFormat": "dd/mm/yyyy" };
                        case "BG":
                            document.querySelector("#register-form-first-step-date-of-birth-input-field").setAttribute("placeholder", "дд/мм/гггг");
                            return { "inputFormat": "dd/mm/yyyy", "placeholder": "дд/мм/гггг" };
                        case "CA":
                        case "US":
                            document.querySelector("#register-form-first-step-date-of-birth-input-field").setAttribute("placeholder", "mm/dd/yyyy");
                            return { "inputFormat": "mm/dd/yyyy" };
                    }
                }());

                for (let i = 0; i < document.querySelectorAll("#register-form-second-step input").length; i++) {
                    document.querySelectorAll("#register-form-second-step input")[i].addEventListener("keypress", function(event) {
                        if (event.keyCode === 32) {
                            event.preventDefault();
                        }
                    });
                }

                document.querySelector("#register-form-second-step-agree-to-tos-and-pp-checkbox").addEventListener("input", function() {
                    if (document.querySelector("#register-form-second-step-register-button").disabled) {
                        document.querySelector("#register-form-second-step-register-button").disabled = false;
                    }
                    else {
                        document.querySelector("#register-form-second-step-register-button").disabled = true;
                    }
                });

                document.querySelector("#register-form-first-step form").addEventListener("submit", function(event) {
                    event.preventDefault();

                    showTheLoadingScreen();

                    $.ajax({
                        "data": {
                            "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                            "regionIsoCode": document.querySelector("html").getAttribute("lang").substring(3, 5),
                            "firstName": document.querySelector("#register-form-first-step-first-name-input-field").value,
                            "lastName": document.querySelector("#register-form-first-step-last-name-input-field").value,
                            "dateOfBirth": document.querySelector("#register-form-first-step-date-of-birth-input-field").value,
                            "emailAddress": null,
                            "username": null,
                            "enteredPassword": null,
                            "reenteredPassword": null,
                            "agreesToTosAndPP": null
                        },
                        "type": "POST",
                        "url": "./register/",
                        "success": function(data) {
                            setTimeout(function() {
                                hideTheLoadingScreen();

                                if (!Array.isArray(data)) {
                                    document.querySelector("#register-form-first-step").style.animationName = "shrink";
                                    setTimeout(function() {
                                        document.querySelector("#register-form-first-step").style.display = "none";
                                        document.querySelector("#register-form-second-step").style.animationName = "grow";
                                        document.querySelector("#register-form-second-step").style.display = "block";
                                    }, 200);
                                }
                                else {
                                    processData(data);
                                }
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

                document.querySelector("#register-form-first-step-back-button").addEventListener("click", function(event) {
                    event.preventDefault();

                    document.querySelector("#register-form-first-step").style.animationName = "shrink";
                    setTimeout(function() {
                        document.querySelector("#register-form-first-step").remove();
                        document.querySelector("#register-form-second-step").remove();
                        document.querySelector("#login-form-first-step").style.animationName = "grow";
                        document.querySelector("#login-form-first-step").style.display = "block";
                    }, 200);
                });

                document.querySelector("#register-form-second-step form").addEventListener("submit", function(event) {
                    event.preventDefault();

                    if (document.querySelector("#register-form-second-step-agree-to-tos-and-pp-checkbox").checked) {
                        showTheLoadingScreen();

                        $.ajax({
                            "data": {
                                "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                "regionIsoCode": document.querySelector("html").getAttribute("lang").substring(3, 5),
                                "firstName": document.querySelector("#register-form-first-step-first-name-input-field").value,
                                "lastName": document.querySelector("#register-form-first-step-last-name-input-field").value,
                                "dateOfBirth": document.querySelector("#register-form-first-step-date-of-birth-input-field").value,
                                "emailAddress": document.querySelector("#register-form-second-step-email-input-field").value,
                                "username": document.querySelector("#register-form-second-step-username-input-field").value,
                                "enteredPassword": document.querySelector("#register-form-second-step-password-input-field").value,
                                "reenteredPassword": document.querySelector("#register-form-second-step-confirm-password-input-field").value,
                                "agreesToTosAndPP": document.querySelector("#register-form-second-step-agree-to-tos-and-pp-checkbox").checked
                            },
                            "type": "POST",
                            "url": "./register/",
                            "success": function(data) {
                                if (!Array.isArray(data)) {
                                    document.querySelector("#login-form-first-step-username-input-field").value = document.querySelector("#register-form-second-step-username-input-field").value;
                                    document.querySelector("#login-form-first-step-password-input-field").value = document.querySelector("#register-form-second-step-password-input-field").value;
                                    document.querySelector("#login-form-first-step-submit-button").click();
                                }
                                else {
                                    setTimeout(function() {
                                        hideTheLoadingScreen();

                                        processData(data);
                                    }, 1000);
                                }
                            },
                            "error": function(data) {
                                setTimeout(function() {
                                    hideTheLoadingScreen();

                                    processData(data.responseJSON);
                                }, 1000);
                            }
                        });
                    }
                });

                document.querySelector("#register-form-second-step-back-button").addEventListener("click", function(event) {
                    event.preventDefault();

                    document.querySelector("#register-form-second-step").style.animationName = "shrink";
                    setTimeout(function() {
                        document.querySelector("#register-form-second-step").style.display = "none";
                        document.querySelector("#register-form-second-step-agree-to-tos-and-pp-checkbox").checked = false;
                        document.querySelector("#register-form-second-step-register-button").disabled = true;
                        document.querySelector("#register-form-first-step").style.animationName = "grow";
                        document.querySelector("#register-form-first-step").style.display = "block";
                    }, 200);
                });
            }, 200);
        });
    }

    if (document.querySelector("#login-form-first-step-close-button")) {
        document.querySelector("#login-form-first-step-close-button").addEventListener("click", function(event) {
            event.preventDefault();

            document.querySelector("#curtain").click();
        });
    }
}

const showTheRestoreForm = function() {
    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"restore-form-first-step\"><form><fieldset><label>Revamle ID</label><input autocomplete=\"off\" id=\"restore-form-first-step-username-input-field\" maxlength=\"32\" spellcheck=\"false\" type=\"text\"></fieldset><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Напред"; case "en": return "Next"; } }() + "</button><button id=\"restore-form-first-step-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");

    document.querySelector("#restore-form-first-step").addEventListener("click", function(event) {
        event.stopPropagation();
    });

    document.querySelector("#restore-form-first-step-username-input-field").addEventListener("input", function() {
        if (this.nextElementSibling && this.nextElementSibling.tagName === "P" && window.getComputedStyle(this.nextElementSibling, null).color === "rgb(230, 0, 0)") {
            this.nextElementSibling.remove();
        }
    });

    document.querySelector("#restore-form-first-step-username-input-field").addEventListener("keypress", function(event) {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    });

    document.querySelector("#restore-form-first-step form").addEventListener("submit", function(event) {
        event.preventDefault();

        showTheLoadingScreen();

        if (socketIsClosed) {
            setTimeout(function() {
                showTheClosedSocketMessage();
            }, 1000);
        }
        else {
            $.ajax({
                "data": {
                    "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                    // "session_id": null,
                    // "sessionToken": null,
                    "username": document.querySelector("#restore-form-first-step-username-input-field").value,
                    "newPassword": null,
                    "reenteredPassword": null,
                    "toNotBeRequiredVerification": null,
                    "recoveryKey": null
                },
                "type": "POST",
                "url": "./restore/",
                "success": function(data) {
                    setTimeout(function() {
                        hideTheLoadingScreen();

                        if (!Array.isArray(data)) {
                            document.querySelector("#restore-form-first-step").style.animationName = "shrink";
                            setTimeout(function() {
                                document.querySelector("#restore-form-first-step").style.display = "none";
                                document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"restore-form-second-step\"><form><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Нова парола"; case "en": return "New Password"; } }() + "</label><input autocomplete=\"on\" id=\"restore-form-second-step-new-password-input-field\" maxlength=\"128\" type=\"password\"><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Вашата парола трябва да е дълга поне осем знака и да съдържа цифри, главни и малки букви."; case "en": return "Your password must be at least eight characters long and contain digits, uppercase and lowercase letters."; } }() + "</p><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Потвърждаване на парола"; case "en": return "Confirm Password"; } }() + "</label><input autocomplete=\"on\" id=\"restore-form-second-step-confirm-password-input-field\" maxlength=\"128\" type=\"password\"><label class=\"checkbox-container\"><input id=\"restore-form-second-step-require-verification-checkbox\" type=\"checkbox\"><span><img alt=\"\" src=\"./public/assets/images/check.png\" draggable=\"false\"></span>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Да не се изисква код за потвърждение на това устройство."; case "en": return "Do not require a verification code on this device."; } }() + "</label></fieldset><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Ключ за възстановяване"; case "en": return "Recovery Key"; } }() + "</label><input autocomplete=\"off\" id=\"restore-form-second-step-recovery-key-input-field\" maxlength=\"24\" spellcheck=\"false\" type=\"text\"></fieldset><button disabled id=\"restore-form-second-step-submit-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Влизане"; case "en": return "Log In"; } }() + "</button><button id=\"restore-form-second-step-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");

                                document.querySelector("#restore-form-second-step").addEventListener("click", function(event) {
                                    event.stopPropagation();
                                });

                                $("#restore-form-second-step form fieldset > input").on("input", function() {
                                    if ($(this).next() && $(this).next().prop("tagName") === "P" && $(this).next().css("color") === "rgb(230, 0, 0)") {
                                        const messageText = $(this).next().text();

                                        $(this).next().remove();
                                        $("#restore-form-second-step form fieldset > input + p").each(function() {
                                            if ($(this).text() === messageText) {
                                                $(this).remove();
                                            }
                                        });
                                    }
                                });

                                for (let i = 0; i < document.querySelectorAll("#restore-form-second-step > input").length; i++) {
                                    document.querySelectorAll("#restore-form-second-step > input")[i].addEventListener("keypress", function(event) {
                                        if (event.keyCode === 32) {
                                            event.preventDefault();
                                        }
                                    });
                                }

                                document.querySelector("#restore-form-second-step-recovery-key-input-field").addEventListener("input", function() {
                                    if (document.querySelector("#restore-form-second-step-recovery-key-input-field").value) {
                                        document.querySelector("#restore-form-second-step-submit-button").disabled = false;
                                    }
                                    else {
                                        document.querySelector("#restore-form-second-step-submit-button").disabled = true;
                                    }
                                });

                                document.querySelector("#restore-form-second-step form").addEventListener("submit", function(event) {
                                    event.preventDefault();

                                    showTheLoadingScreen();

                                    if (socketIsClosed) {
                                        setTimeout(function() {
                                            showTheClosedSocketMessage();
                                        }, 1000);
                                    }
                                    else {
                                        $.ajax({
                                            "data": {
                                                "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                // "session_id": null,
                                                // "sessionToken": null,
                                                "username": document.querySelector("#restore-form-first-step-username-input-field").value,
                                                "newPassword": document.querySelector("#restore-form-second-step-new-password-input-field").value,
                                                "reenteredPassword": document.querySelector("#restore-form-second-step-confirm-password-input-field").value,
                                                "toNotBeRequiredVerification": document.querySelector("#restore-form-second-step-require-verification-checkbox").checked,
                                                "recoveryKey": document.querySelector("#restore-form-second-step-recovery-key-input-field").value
                                            },
                                            "type": "POST",
                                            "url": "./restore/",
                                            "success": function(data) {
                                                if (!Array.isArray(data)) {
                                                    if (document.querySelector("body > #bar")) {
                                                        document.querySelector("#navigation-menu-revamle-id-button").click();
                                                    }
                                                    else {
                                                        if (document.querySelector("#editor")) {
                                                            hideTheLoadingScreen();

                                                            showTheApplication();

                                                            if (document.querySelector("#letters-toolbar-buttons").childNodes.length !== 2) {
                                                                setTimeout(function() {
                                                                    document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                                                    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                                        document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                                                    }

                                                                    const sheetScrollPosition = document.querySelector("#editor-sheet-container .simplebar-content-wrapper").scrollTop;

                                                                    document.querySelector("#editor-sheet div[contenteditable]").focus();
                                                                    setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                                                                    document.querySelector("#editor-sheet-container .simplebar-content-wrapper").scrollTop = sheetScrollPosition;
                                                                }, 200);
                                                            }
                                                            else {
                                                                setTimeout(function() {
                                                                    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrappers").length; i++) {
                                                                        document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrappers")[i].setAttribute("tabindex", "0");
                                                                    }
                                                                }, 200);
                                                            }
                                                        }

                                                        if (document.querySelector("#book")) {
                                                            hideTheLoadingScreen();

                                                            showTheApplication();

                                                            setTimeout(function() {
                                                                for (let i = 0; i < document.querySelectorAll("#book a, #book button, #book-sheet > div .word-piece-wrapper[data-effect-name][tabindex]").length; i++) {
                                                                    document.querySelectorAll("#book a, #book button, #book-sheet > div .word-piece-wrapper[data-effect-name][tabindex]")[i].setAttribute("tabindex", "0");
                                                                }
                                                            }, 200);
                                                        }
                                                    }
                                                }
                                                else {
                                                    setTimeout(function() {
                                                        processData(data);
                                                    }, 1000);
                                                }
                                            },
                                            "error": function(data) {
                                                setTimeout(function() {
                                                    hideTheLoadingScreen();

                                                    processData(data.responseJSON);
                                                }, 1000);
                                            }
                                        });
                                    }
                                });

                                document.querySelector("#restore-form-second-step-back-button").addEventListener("click", function(event) {
                                    event.preventDefault();

                                    document.querySelector("#restore-form-second-step").style.animationName = "shrink";
                                    setTimeout(function() {
                                        document.querySelector("#restore-form-second-step").remove();
                                        document.querySelector("#restore-form-first-step-username-input-field").value = "";
                                        document.querySelector("#restore-form-first-step").style.animationName = "grow";
                                        document.querySelector("#restore-form-first-step").style.display = "block";
                                    }, 200);
                                });
                            }, 200);
                        }
                        else {
                            processData(data);
                        }
                    }, 1000);
                },
                "error": function(data) {
                    setTimeout(function() {
                        hideTheLoadingScreen();

                        processData(data.responseJSON);
                    }, 1000);
                }
            });
        }
    });

    document.querySelector("#restore-form-first-step-back-button").addEventListener("click", function(event) {
        event.preventDefault();

        document.querySelector("#restore-form-first-step").style.animationName = "shrink";
        setTimeout(function() {
            document.querySelector("#restore-form-first-step").remove();
            showTheLogInForm();
        }, 200);
    });
}

const agreeToTosAndPP = function(toBeReloaded) {
    showTheLoadingScreen();

    $.ajax({
        "data": {
            "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2)
        },
        "type": "POST",
        "url": "./agree-to-tos-and-pp/",
        "success": function() {
            setTimeout(function() {
                if (toBeReloaded) {
                    location.reload();
                }
                else {
                    hideTheLoadingScreen();

                    agreesToTosAndPP = true;

                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.animationName = "shrink";
                    setTimeout(function() {
                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].remove();
                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.animationName = "grow";
                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.display = "block";
                    }, 200);
                }
            }, 1000);
        },
        "error": function(data) {
            setTimeout(function() {
                document.querySelector("#curtain").setAttribute("data-has-disabled-pointer-events", "false");

                hideTheLoadingScreen();

                processData(data.responseJSON);
            }, 1000);
        }
    });
}

const logOut = function() {
    showTheLoadingScreen();

    $.ajax({
        "type": "POST",
        "url": "./log-out/",
        "success": function() {
            setTimeout(function() {
                if (!document.querySelector("#books-publish-menu") && !document.querySelector(".book-preview[style]")) {
                    hideTheLoadingScreen();

                    hasLoggedIn = false;

                    for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                        document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
                    }
                    setTimeout(function() {
                        document.querySelectorAll("#containers > div").forEach(function(element) {
                            if (document.querySelector("#editor") && (element.getAttribute("id") === "update-document-cover-menu" || element.classList.contains("friends-list"))) {
                                element.style.display = "none";
                            }
                            else {
                                element.remove();
                            }
                        });

                        showTheLogInForm();
                    }, 200);
                }
                else {
                    location.reload();
                }
            }, 1000);
        }
    });
}

if (document.querySelector("#navigation-menu-revamle-id-button")) {
    document.querySelector("#navigation-menu-revamle-id-button").addEventListener("click", function() {
        if (!document.querySelector("#loading-screen")) {
            showTheLoadingScreen();
        }

        $.ajax({
            "data": {
                "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                "regionIsoCode": document.querySelector("html").getAttribute("lang").substring(3, 5)
            },
            "type": "POST",
            "url": "./profile/",
            "success": function(data) {
                setTimeout(function() {
                    if (!document.querySelector("#books-publish-menu") && !document.querySelector(".book-preview[style]") || window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "block" || data.recoveryKey || !data.agreesToTosAndPP) {
                        hideTheLoadingScreen();

                        document.querySelector("#containers nav").style.animationName = "shrink";
                        for (let i = 0; i < document.querySelectorAll("#containers > div").length; i++) {
                            document.querySelectorAll("#containers > div")[i].style.animationName = "shrink";
                        }
                    }
                    setTimeout(function() {
                        agreesToTosAndPP = data.agreesToTosAndPP;
                        let profilePhoto = function() { if (data.profilePhoto) { return data.profilePhoto; } else { return null } }();
                        let friendCode = data.friendCode;
                        let firstName = data.firstName;
                        let middleName = function() { if (!data.middleName) { return ""; } else { return data.middleName } }();
                        let lastName = data.lastName;
                        let nickname = function() { if (!data.nickname) { return ""; } else { return data.nickname } }();
                        let usesANickname = data.usesANickname;
                        let emailAddress = data.emailAddress;
                        let username = data.username;

                        if (!document.querySelector("#books-publish-menu") && !document.querySelector(".book-preview[style]") || window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "block" || data.recoveryKey || !data.agreesToTosAndPP) {
                            document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"profile-menu\"" + function() { if (data.recoveryKey || !agreesToTosAndPP) { return " style=\"display: none;\""; } else { return ""; } }() + "><div class=\"profile-photo-header\"><button id=\"profile-menu-update-profile-photo-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Смяна на профилна снимка"; case "en": return "Change Profile Photo"; } }() + "\" draggable=\"false\" src=\"" + function() { if (!profilePhoto) { return "./public/assets/images/user.jpg"; } else { return profilePhoto; } }() + "\"></button></div><button id=\"profile-menu-friends-list-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Приятели"; case "en": return "Friends"; } }() + "</button><button id=\"profile-menu-update-names-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Имена"; case "en": return "Names"; } }() + "</button><button id=\"profile-menu-update-settings-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Настройки"; case "en": return "Settings"; } }() + "</button><button id=\"profile-menu-update-password-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Парола"; case "en": return "Password"; } }() + "</button>" + function() { if (data.currencyIsoCode) { return "<button id=\"profile-menu-payout-button\" style=\"color: #B947FF;\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Приходи"; case "en": return "Revenue"; } }() + "</button>"; } else { return ""; } }() + "<button id=\"profile-menu-log-out-button\" style=\"color: #E60000;\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Излизане"; case "en": return "Log Out"; } }() + "</button><button id=\"profile-menu-close-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() + "</button></div>");

                            document.querySelector("#profile-menu").addEventListener("click", function(event) {
                                event.stopPropagation();
                            });
                        }

                        if (!document.querySelector("#books-publish-menu") && !document.querySelector(".book-preview[style]") || window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "block") {
                            document.querySelector("#profile-menu-update-profile-photo-button").addEventListener("click", function() {
                                document.querySelector("#profile-menu").style.animationName = "shrink";
                                setTimeout(function() {
                                    document.querySelector("#profile-menu").style.display = "none";
                                    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"update-profile-photo-menu\"><input accept=\"image/png, image/jpeg\"" + function() { if (!agreesToTosAndPP) { return " disabled"; } else { return ""; } }() + " id=\"update-profile-photo-menu-upload-button\" type=\"file\"/><label for=\"update-profile-photo-menu-upload-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Качване"; case "en": return "Upload"; } }() + "</label><button" + function() { if (!profilePhoto) { return " disabled style=\"color: rgba(230, 0, 0, 0.6);\""; } else { return " style=\"color: #E60000;\""; } }() + " id=\"update-profile-photo-menu-remove-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Премахване"; case "en": return "Remove"; } }() + "</button><button id=\"update-profile-photo-menu-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></div>");

                                    document.querySelector("#update-profile-photo-menu").addEventListener("click", function(event) {
                                        event.stopPropagation();
                                    });

                                    document.querySelector("#update-profile-photo-menu-upload-button").addEventListener("input", function() {
                                        if (document.querySelector("#update-profile-photo-menu-upload-button").value) {
                                            showTheLoadingScreen();

                                            const fileReader = new FileReader();
                                            fileReader.readAsDataURL(document.querySelector("#update-profile-photo-menu-upload-button").files[0]);
                                            fileReader.addEventListener("load", function() {
                                                const uploadedImage = document.createElement("img");
                                                uploadedImage.setAttribute("src", this.result);
                                                uploadedImage.addEventListener("load", function() {
                                                    const imageResizingCanvas = document.createElement("canvas");
                                                    const imageResizingCanvasContext = imageResizingCanvas.getContext("2d");

                                                    if (uploadedImage.height > uploadedImage.width) {
                                                        imageResizingCanvas.setAttribute("height", 512);
                                                        imageResizingCanvas.setAttribute("width", uploadedImage.width * (512 / uploadedImage.height));
                                                    }
                                                    else {
                                                        imageResizingCanvas.setAttribute("height", uploadedImage.height * (512 / uploadedImage.width));
                                                        imageResizingCanvas.setAttribute("width", 512);
                                                    }
                                                    imageResizingCanvasContext.drawImage(uploadedImage, 0, 0, imageResizingCanvas.getAttribute("width"), imageResizingCanvas.getAttribute("height"));

                                                    const resizedImage = imageResizingCanvas.toDataURL(document.querySelector("#update-profile-photo-menu-upload-button").files[0].type);

                                                    setTimeout(function() {
                                                        document.querySelector("#update-profile-photo-menu").style.animationName = "shrink";
                                                        setTimeout(function() {
                                                            document.querySelector("#update-profile-photo-menu").remove();
                                                            document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"profile-photo-editor\"><button id=\"profile-photo-editor-save-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }() + "</button><div id=\"profile-photo-editor-canvas\"></div><button id=\"profile-photo-editor-cancel-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отмяна"; case "en": return "Cancel"; } }() + "</button></div>");

                                                            document.querySelector("#profile-photo-editor").addEventListener("click", function(event) {
                                                                event.stopPropagation();
                                                            });

                                                            const showThePhotoEditor = function() {
                                                                document.querySelector("#profile-photo-editor").removeEventListener("animationend", showThePhotoEditor);
                                                                document.querySelector("#profile-photo-editor").style.width = document.querySelector("#profile-photo-editor").clientWidth + "px";
                                                                document.querySelector("#profile-photo-editor-canvas").style.height = document.querySelector("#profile-photo-editor").clientWidth + "px";
                                                                let profilePhotoEditor = new Croppie(document.querySelector("#profile-photo-editor-canvas"), { "showZoomer": false, "viewport": { "height": document.querySelector("#profile-photo-editor").clientWidth - 80, "type": "square", "width": document.querySelector("#profile-photo-editor").clientWidth - 80 } });
                                                                profilePhotoEditor.bind({
                                                                    "url": resizedImage,
                                                                    "zoom": 0
                                                                }).then(function() {
                                                                    setTimeout(function() {
                                                                        hideTheLoadingScreen();

                                                                        document.querySelector("#profile-photo-editor-save-button").addEventListener("click", function() {
                                                                            showTheLoadingScreen();

                                                                            profilePhotoEditor.result({ "format": "jpeg", "type": "blob" }).then(function(croppedImage) {
                                                                                const data = new FormData();
                                                                                data.append("languageIsoCode", document.querySelector("html").getAttribute("lang").substring(0, 2));
                                                                                data.append("regionIsoCode", document.querySelector("html").getAttribute("lang").substring(3, 5));
                                                                                data.append("profilePhoto", new File([croppedImage], "profile-photo.jpg", { "type": "image/jpeg" }));

                                                                                $.ajax({
                                                                                    "contentType": false,
                                                                                    "data": data,
                                                                                    "processData": false,
                                                                                    "url": "./profile/update/photo/",
                                                                                    "type": "POST",
                                                                                    "success": function(data) {
                                                                                        profilePhoto = data;

                                                                                        setTimeout(function() {
                                                                                            hideTheLoadingScreen();

                                                                                            document.querySelector("#profile-photo-editor").style.animationName = "shrink";
                                                                                            setTimeout(function() {
                                                                                                document.querySelector("#profile-photo-editor").remove();
                                                                                                document.querySelector("#profile-menu-update-profile-photo-button img").setAttribute("src", profilePhoto);
                                                                                                document.querySelector("#profile-menu").style.animationName = "grow";
                                                                                                document.querySelector("#profile-menu").style.display = "block";
                                                                                            }, 200);
                                                                                        }, 1000);
                                                                                    },
                                                                                    "error": function(data) {
                                                                                        setTimeout(function() {
                                                                                            hideTheLoadingScreen();

                                                                                            processData(function() { if (data.responseText && data.responseText.includes("{")) { return JSON.parse(data.responseText); } else { return null; } }());
                                                                                        }, 1000);
                                                                                    }
                                                                                });
                                                                            });
                                                                        });

                                                                        document.querySelector("#profile-photo-editor-cancel-button").addEventListener("click", function() {
                                                                            document.querySelector("#profile-photo-editor").style.animationName = "shrink";
                                                                            setTimeout(function() {
                                                                                document.querySelector("#profile-photo-editor").remove();
                                                                                document.querySelector("#profile-menu").style.animationName = "grow";
                                                                                document.querySelector("#profile-menu").style.display = "block";
                                                                            }, 200);
                                                                        });
                                                                    }, 1000);
                                                                });
                                                            }
                                                            document.querySelector("#profile-photo-editor").addEventListener("animationend", showThePhotoEditor);
                                                        }, 200);
                                                    }, 1000);
                                                });
                                            });
                                        }
                                    });

                                    document.querySelector("#update-profile-photo-menu-remove-button").addEventListener("click", function() {
                                        showTheLoadingScreen();

                                        const data = new FormData();
                                        data.append("languageIsoCode", document.querySelector("html").getAttribute("lang").substring(0, 2));
                                        data.append("regionIsoCode", document.querySelector("html").getAttribute("lang").substring(3, 5));

                                        $.ajax({
                                            "contentType": false,
                                            "data": data,
                                            "processData": false,
                                            "url": "./profile/update/photo/",
                                            "type": "POST",
                                            "success": function() {
                                                profilePhoto = null;

                                                setTimeout(function() {
                                                    hideTheLoadingScreen();

                                                    document.querySelector("#update-profile-photo-menu").style.animationName = "shrink";
                                                    setTimeout(function() {
                                                        document.querySelector("#update-profile-photo-menu").remove();
                                                        document.querySelector("#profile-menu-update-profile-photo-button img").setAttribute("src", "./public/assets/images/user.jpg");
                                                        document.querySelector("#profile-menu").style.animationName = "grow";
                                                        document.querySelector("#profile-menu").style.display = "block";
                                                    }, 200);
                                                }, 1000);
                                            },
                                            "error": function(data) {
                                                setTimeout(function() {
                                                    hideTheLoadingScreen();

                                                    processData(function() { if (data.responseText && data.responseText.includes("{")) { return JSON.parse(data.responseText); } else { return null; } }());
                                                }, 1000);
                                            }
                                        });
                                    });

                                    document.querySelector("#update-profile-photo-menu-back-button").addEventListener("click", function() {
                                        document.querySelector("#update-profile-photo-menu").style.animationName = "shrink";
                                        setTimeout(function() {
                                            document.querySelector("#update-profile-photo-menu").remove();
                                            document.querySelector("#profile-menu").style.animationName = "grow";
                                            document.querySelector("#profile-menu").style.display = "block";
                                        }, 200);
                                    });
                                }, 200);
                            });

                            document.querySelector("#profile-menu-friends-list-button").addEventListener("click", function() {
                                showTheLoadingScreen();

                                $.ajax({
                                    "data": {
                                        "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                        // "session_id": null,
                                        // "sessionToken": null,
                                        "isUsingAnApplication": false
                                    },
                                    "type": "POST",
                                    "url": "./friends/",
                                    "success": function(data) {
                                        setTimeout(function() {
                                            hideTheLoadingScreen();

                                            document.querySelector("#profile-menu").style.animationName = "shrink";
                                            setTimeout(function() {
                                                document.querySelector("#profile-menu").style.display = "none";

                                                const friends = data;
                                                const alphabetizeTheFriendsList = function() {
                                                    const friendsNames = [];
                                                    for (let i = 0; i < friends.length; i++) {
                                                        friendsNames.push(friends[i].name);
                                                    }
                                                    friendsNames.sort();
                                                    for (let i = 0; i < friendsNames.length; i++) {
                                                        for (let j = 0; j < friends.length; j++) {
                                                            if (friends[j].name === friendsNames[i]) {
                                                                friends.unshift(friends[j]);
                                                                friends.splice(j + 1, 1);
                                                            }
                                                        }
                                                    }
                                                }
                                                alphabetizeTheFriendsList();

                                                document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div class=\"friends-list\"><button id=\"friends-list-find-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Търсене"; case "en": return "Find"; } }() + "</button><div></div><button id=\"friends-list-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></div>");
                                                document.querySelector(".friends-list").style.width = document.querySelector(".friends-list").clientWidth + "px";

                                                document.querySelector(".friends-list").addEventListener("click", function(event) {
                                                    event.stopPropagation();
                                                });

                                                const showAFriend = function(name, profilePhoto, friendCode, options, areFriends) {
                                                    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><div class=\"profile-photo-header\"><img alt=\"\" draggable=\"false\" src=\"" + function() { if (!profilePhoto) { return "./public/assets/images/user.jpg"; } else { return profilePhoto; } }() + "\"></div>" + function() { if (options.length === 1) { for (let i = 0; i < friends.length; i++) { if (friends[i].friendCode === friendCode) { friends.splice(i, 1); document.querySelectorAll(".friends-list .simplebar-content button")[i].remove(); if (!document.querySelectorAll(".friends-list .simplebar-content button").length) { updateTheFriendsList(); } } } return "<button disabled>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Добавяне"; case "en": return "Add"; } }() + "</button><button" + function() { if (options[0] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Блокиране"; case "en": return "Block"; } }()) { return " style=\"color: #E60000;\""; } else { return ""; } }() + ">" + options[0] + "</button>"; } else { if (options[0] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Премахване"; case "en": return "Remove"; } }() || options[1] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отхвърляне"; case "en": return "Reject"; } }()) { if (!friends.length) { friends.push({ "name": name, "profilePhoto": profilePhoto, "friendCode": friendCode, "areFriends": areFriends }); alphabetizeTheFriendsList(); updateTheFriendsList(); } else { for (let i = 0; i < friends.length; i++) { if (friends[i].friendCode === friendCode) { friends[i].areFriends = areFriends; document.querySelectorAll(".friends-list .simplebar-content button")[i].dataset.areFriends = areFriends; break; } if (i === friends.length - 1) { friends.push({ "name": name, "profilePhoto": profilePhoto, "friendCode": friendCode, "areFriends": areFriends }); alphabetizeTheFriendsList(); updateTheFriendsList(); } } } } else { for (let i = 0; i < friends.length; i++) { if (friends[i].friendCode === friendCode) { friends.splice(i, 1); document.querySelectorAll(".friends-list .simplebar-content button")[i].remove(); if (!document.querySelectorAll(".friends-list .simplebar-content button").length) { updateTheFriendsList(); } } } } return "<button" + function() { if (options[0] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Премахване"; case "en": return "Remove"; } }()) { return " style=\"color: #E60000;\""; } else { return ""; } }() + ">" + options[0] + "</button><button style=\"color: #E60000;\">" + options[1] + "</button>"; } }() + "<button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");

                                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].addEventListener("click", function(event) {
                                                        event.stopPropagation();
                                                    });

                                                    for (let i = 0; i < document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button").length - 1; i++) {
                                                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[i].addEventListener("click", function() {
                                                            showTheLoadingScreen();

                                                            $.ajax({
                                                                "data": {
                                                                    "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                                    "friendCode": friendCode
                                                                },
                                                                "type": "POST",
                                                                "url": "./friends/" + function() { switch (document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[i].innerHTML) { case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Добавяне"; case "en": return "Add"; } }(): return "add"; case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Премахване"; case "en": return "Remove"; } }(): case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отхвърляне"; case "en": return "Reject"; } }(): return "remove"; case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Блокиране"; case "en": return "Block"; } }(): return "block"; case function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Block"; case "en": return "Unblock"; } }(): return "unblock"; } }() + "/",
                                                                "success": function(data) {
                                                                    setTimeout(function() {
                                                                        hideTheLoadingScreen();

                                                                        if (data.options.length === 1) {
                                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].disabled = true;
                                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].style.color = "rgba(96, 63, 239, 0.6)";
                                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].innerHTML = function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Добавяне"; case "en": return "Add"; } }();
                                                                            if (data.options[0] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Блокиране"; case "en": return "Block"; } }()) {
                                                                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].style.color = "#E60000";
                                                                            }
                                                                            else {
                                                                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].style.color = "#603FEF";
                                                                            }
                                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].innerHTML = data.options[0];

                                                                            for (let i = 0; i < friends.length; i++) {
                                                                                if (friends[i].friendCode === friendCode) {
                                                                                    friends.splice(i, 1);
                                                                                    document.querySelectorAll(".friends-list .simplebar-content button")[i].remove();
                                                                                    if (!document.querySelectorAll(".friends-list .simplebar-content button").length) {
                                                                                        updateTheFriendsList();
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        else {
                                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].disabled = false;
                                                                            if (data.options[0] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Премахване"; case "en": return "Remove"; } }()) {
                                                                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].style.color = "#E60000";
                                                                            }
                                                                            else {
                                                                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].style.color = "#603FEF";
                                                                            }
                                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].innerHTML = data.options[0];
                                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].style.color = "#E60000";
                                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].innerHTML = data.options[1];

                                                                            if (data.options[0] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Премахване"; case "en": return "Remove"; } }() || data.options[1] === function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отхвърляне"; case "en": return "Reject"; } }()) {
                                                                                if (!friends.length) {
                                                                                    friends.push({ "name": name, "profilePhoto": profilePhoto, "friendCode": friendCode, "areFriends": data.areFriends });
                                                                                    alphabetizeTheFriendsList();
                                                                                    updateTheFriendsList();
                                                                                }
                                                                                else {
                                                                                    for (let i = 0; i < friends.length; i++) {
                                                                                        if (friends[i].friendCode === friendCode) {
                                                                                            friends[i].areFriends = data.areFriends;
                                                                                            document.querySelectorAll(".friends-list .simplebar-content button")[i].dataset.areFriends = data.areFriends;

                                                                                            break;
                                                                                        }

                                                                                        if (i === friends.length - 1) {
                                                                                            friends.push({ "name": name, "profilePhoto": profilePhoto, "friendCode": friendCode, "areFriends": data.areFriends });
                                                                                            alphabetizeTheFriendsList();
                                                                                            updateTheFriendsList();
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                            else {
                                                                                for (let i = 0; i < friends.length; i++) {
                                                                                    if (friends[i].friendCode === friendCode) {
                                                                                        friends.splice(i, 1);
                                                                                        document.querySelectorAll(".friends-list .simplebar-content button")[i].remove();
                                                                                        if (!document.querySelectorAll(".friends-list .simplebar-content button").length) {
                                                                                            updateTheFriendsList();
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
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
                                                    }

                                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button").length - 1].addEventListener("click", function() {
                                                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.animationName = "shrink";
                                                        setTimeout(function() {
                                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].remove();
                                                            document.querySelector(".friends-list").style.animationName = "grow";
                                                            document.querySelector(".friends-list").style.display = "block";
                                                        }, 200);
                                                    });
                                                }

                                                document.querySelector("#friends-list-find-button").addEventListener("click", function() {
                                                    document.querySelector(".friends-list").style.animationName = "shrink";
                                                    setTimeout(function() {
                                                        document.querySelector(".friends-list").style.display = "none";
                                                        document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"add-a-friend-form\"><div><h3 style=\"-moz-user-select: auto; -ms-user-select: auto; -webkit-user-select: auto; user-select: auto;\">" + friendCode + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "За да получавате покани от приятели, споделете приятелския код, показан по-горе."; case "en": return "To receive requests from friends, share the friend code shown above."; } }() + "</p></div><form><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Приятелски код"; case "en": return "Friend Code"; } }() + "</label><input autocomplete=\"off\" id=\"add-a-friend-form-friend-code-input-field\" maxlength=\"12\" spellcheck=\"false\" type=\"text\"></fieldset><button id=\"add-a-friend-form-submit-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Търсене"; case "en": return "Find"; } }() + "</button><button id=\"add-a-friend-form-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");

                                                        document.querySelector("#add-a-friend-form").addEventListener("click", function(event) {
                                                            event.stopPropagation();
                                                        });

                                                        document.querySelector("#add-a-friend-form-friend-code-input-field").addEventListener("input", function() {
                                                            if (this.nextElementSibling && this.nextElementSibling.tagName === "P" && window.getComputedStyle(this.nextElementSibling, null).color === "rgb(230, 0, 0)") {
                                                                this.nextElementSibling.remove();
                                                            }
                                                        });

                                                        document.querySelector("#add-a-friend-form-friend-code-input-field").addEventListener("keypress", function(event) {
                                                            if (event.keyCode === 32) {
                                                                event.preventDefault();
                                                            }
                                                        });

                                                        document.querySelector("#add-a-friend-form form").addEventListener("submit", function(event) {
                                                            event.preventDefault();

                                                            showTheLoadingScreen();

                                                            $.ajax({
                                                                "data": {
                                                                    "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                                    "friendCode": document.querySelector("#add-a-friend-form-friend-code-input-field").value,
                                                                    "hasEnteredTheFriendCode": true
                                                                },
                                                                "type": "POST",
                                                                "url": "./friends/find/",
                                                                "success": function(data) {
                                                                    setTimeout(function() {
                                                                        hideTheLoadingScreen();

                                                                        document.querySelector("#add-a-friend-form").style.animationName = "shrink";
                                                                        setTimeout(function() {
                                                                            if (!friends.length) {
                                                                                showAFriend(data.name, data.profilePhoto, document.querySelector("#add-a-friend-form-friend-code-input-field").value, data.options, data.areFriends);
                                                                            }
                                                                            else {
                                                                                for (let i = 0; i < friends.length; i++) {
                                                                                    if (friends[i].friendCode === document.querySelector("#add-a-friend-form-friend-code-input-field").value) {
                                                                                        showAFriend(friends[i].name, friends[i].profilePhoto, document.querySelector("#add-a-friend-form-friend-code-input-field").value, data.options, data.areFriends);

                                                                                        break;
                                                                                    }

                                                                                    if (i === friends.length - 1) {
                                                                                        showAFriend(data.name, data.profilePhoto, document.querySelector("#add-a-friend-form-friend-code-input-field").value, data.options, data.areFriends);
                                                                                    }
                                                                                }
                                                                            }
                                                                            document.querySelector("#add-a-friend-form").remove();
                                                                        }, 200);
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

                                                        document.querySelector("#add-a-friend-form-back-button").addEventListener("click", function(event) {
                                                            event.preventDefault();

                                                            document.querySelector("#add-a-friend-form").style.animationName = "shrink";
                                                            setTimeout(function() {
                                                                document.querySelector("#add-a-friend-form").remove();
                                                                document.querySelector(".friends-list").style.animationName = "grow";
                                                                document.querySelector(".friends-list").style.display = "block";
                                                            }, 200);
                                                        });
                                                    }, 200);
                                                });

                                                new SimpleBar(document.querySelector(".friends-list div"));
                                                document.querySelector(".friends-list .simplebar-content-wrapper").setAttribute("tabindex", "-1");
                                                const updateTheFriendsList = function() {
                                                    document.querySelector(".friends-list .simplebar-content").innerHTML = "";
                                                    document.querySelector(".friends-list .simplebar-content").insertAdjacentHTML("beforeend", function() { if (!friends.length) { return "<h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Не са добавени приятели"; case "en": return "No Friends Added"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "За да добавите приятел, натиснете бутона по-горе."; case "en": return "To add a friend, click the button above."; } }() + "</p>"; } else { let friendsHTML = ""; for (let i = 0; i < friends.length; i++) { friendsHTML += "<button data-are-friends=\"" + friends[i].areFriends + "\" data-friend-code=\"" + friends[i].friendCode + "\"><img alt=\"\" draggable=\"false\" src=\"" + function() { if (!friends[i].profilePhoto) { return "./public/assets/images/user.jpg"; } else { return friends[i].profilePhoto; } }() + "\"><span>" + friends[i].name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;") + "</span></button>"; } return friendsHTML; } }());
                                                    for (let i = 0; i < document.querySelectorAll(".friends-list .simplebar-content button").length; i++) {
                                                        document.querySelectorAll(".friends-list .simplebar-content button")[i].addEventListener("click", function() {
                                                            showTheLoadingScreen();

                                                            $.ajax({
                                                                "data": {
                                                                    "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                                    "friendCode": this.dataset.friendCode,
                                                                    "hasEnteredTheFriendCode": false
                                                                },
                                                                "type": "POST",
                                                                "url": "./friends/find/",
                                                                "success": function(data) {
                                                                    setTimeout(function() {
                                                                        hideTheLoadingScreen();

                                                                        document.querySelector(".friends-list").style.animationName = "shrink";
                                                                        setTimeout(function() {
                                                                            document.querySelector(".friends-list").style.display = "none";
                                                                            showAFriend(document.querySelectorAll(".friends-list .simplebar-content button")[i].querySelector("span").innerHTML, document.querySelectorAll(".friends-list .simplebar-content button")[i].querySelector("img").getAttribute("src"), document.querySelectorAll(".friends-list .simplebar-content button")[i].dataset.friendCode, data.options, data.areFriends);
                                                                        }, 200);
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
                                                    }
                                                }
                                                updateTheFriendsList();

                                                document.querySelector("#friends-list-back-button").addEventListener("click", function() {
                                                    document.querySelector(".friends-list").style.animationName = "shrink";
                                                    setTimeout(function() {
                                                        document.querySelector(".friends-list").remove();
                                                        document.querySelector("#profile-menu").style.animationName = "grow";
                                                        document.querySelector("#profile-menu").style.display = "block";
                                                    }, 200);
                                                });
                                            }, 200);
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

                            document.querySelector("#profile-menu-update-names-button").addEventListener("click", function() {
                                document.querySelector("#profile-menu").style.animationName = "shrink";
                                setTimeout(function() {
                                    document.querySelector("#profile-menu").style.display = "none";
                                    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"update-names-form\"><form><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Име"; case "en": return "First Name"; } }() + "</label><input autocomplete=\"off\"" + function() { if (!agreesToTosAndPP) { return " disabled"; } else { return ""; } }() + " id=\"update-names-form-first-name-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Презиме"; case "en": return "Middle Name"; } }() + "</label><input autocomplete=\"off\"" + function() { if (!agreesToTosAndPP) { return " disabled"; } else { return ""; } }() + " id=\"update-names-form-middle-name-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Това поле не е задължително."; case "en": return "This field is optional."; } }() + "</p><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Фамилия"; case "en": return "Last Name"; } }() + "</label><input autocomplete=\"off\"" + function() { if (!agreesToTosAndPP) { return " disabled"; } else { return ""; } }() + " id=\"update-names-form-last-name-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Псевдоним"; case "en": return "Nickname"; } }() + "</label><input autocomplete=\"off\"" + function() { if (!agreesToTosAndPP) { return " disabled"; } else { return ""; } }() + " id=\"update-names-form-nickname-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Това поле не е задължително."; case "en": return "This field is optional."; } }() + "</p><label class=\"checkbox-container\"><input" + function() { if (nickname) { return ""; } else { return " disabled"; } }() + " id=\"update-names-form-display-nickname-checkbox\" type=\"checkbox\"><span><img alt=\"\" src=\"./public/assets/images/check.png\" draggable=\"false\"></span>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Да се показва моят псевдоним."; case "en": return "Display my nickname."; } }() + "</label></fieldset><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Текуща парола"; case "en": return "Current Password"; } }() + "</label><input autocomplete=\"on\" id=\"update-names-form-current-password-input-field\" maxlength=\"128\" type=\"password\"></fieldset><button disabled id=\"update-names-form-submit-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }() + "</button><button id=\"update-names-form-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");
                                    document.querySelector("#update-names-form-first-name-input-field").value = firstName;
                                    document.querySelector("#update-names-form-middle-name-input-field").value = middleName;
                                    document.querySelector("#update-names-form-last-name-input-field").value = lastName;
                                    document.querySelector("#update-names-form-nickname-input-field").value = nickname;
                                    document.querySelector("#update-names-form-display-nickname-checkbox").checked = usesANickname;

                                    document.querySelector("#update-names-form").addEventListener("click", function(event) {
                                        event.stopPropagation();
                                    });

                                    $("#update-names-form form fieldset > input").on("input", function() {
                                        if ($(this).next() && $(this).next().prop("tagName") === "P" && $(this).next().css("color") === "rgb(230, 0, 0)") {
                                            $(this).next().remove();
                                        }
                                    });

                                    document.querySelector("#update-names-form-first-name-input-field").addEventListener("input", function() {
                                        if (document.querySelector("#update-names-form-current-password-input-field").value && this.value.replace(/\s+/g, " ").trim() !== firstName) {
                                            document.querySelector("#update-names-form-submit-button").disabled = false;
                                        }
                                    });

                                    document.querySelector("#update-names-form-middle-name-input-field").addEventListener("input", function() {
                                        if (document.querySelector("#update-names-form-current-password-input-field").value && this.value.replace(/\s+/g, " ").trim() !== middleName) {
                                            document.querySelector("#update-names-form-submit-button").disabled = false;
                                        }
                                    });

                                    document.querySelector("#update-names-form-last-name-input-field").addEventListener("input", function() {
                                        if (document.querySelector("#update-names-form-current-password-input-field").value && this.value.replace(/\s+/g, " ").trim() !== lastName) {
                                            document.querySelector("#update-names-form-submit-button").disabled = false;
                                        }
                                    });

                                    document.querySelector("#update-names-form-nickname-input-field").addEventListener("input", function() {
                                        if (this.value.replace(/\s+/g, " ").trim()) {
                                            document.querySelector("#update-names-form-display-nickname-checkbox").disabled = false;
                                        }
                                        else {
                                            document.querySelector("#update-names-form-display-nickname-checkbox").disabled = true;
                                            document.querySelector("#update-names-form-display-nickname-checkbox").checked = false;
                                        }

                                        if (document.querySelector("#update-names-form-current-password-input-field").value && this.value.replace(/\s+/g, " ").trim() !== nickname) {
                                            document.querySelector("#update-names-form-submit-button").disabled = false;
                                        }
                                    });

                                    document.querySelector("#update-names-form-display-nickname-checkbox").addEventListener("input", function() {
                                        if (document.querySelector("#update-names-form-current-password-input-field").value && this.checked !== usesANickname) {
                                            document.querySelector("#update-names-form-submit-button").disabled = false;
                                        }
                                    });

                                    document.querySelector("#update-names-form-current-password-input-field").addEventListener("input", function() {
                                        if (this.value && (document.querySelector("#update-names-form-first-name-input-field").value.replace(/\s+/g, " ").trim() !== firstName || document.querySelector("#update-names-form-middle-name-input-field").value.replace(/\s+/g, " ").trim() !== middleName || document.querySelector("#update-names-form-last-name-input-field").value.replace(/\s+/g, " ").trim() !== lastName || document.querySelector("#update-names-form-nickname-input-field").value.replace(/\s+/g, " ").trim() !== nickname || document.querySelector("#update-names-form-display-nickname-checkbox").checked !== usesANickname)) {
                                            document.querySelector("#update-names-form-submit-button").disabled = false;
                                        }
                                        else {
                                            document.querySelector("#update-names-form-submit-button").disabled = true;
                                        }
                                    });

                                    document.querySelector("#update-names-form-current-password-input-field").addEventListener("keypress", function(event) {
                                        if (event.keyCode === 32) {
                                            event.preventDefault();
                                        }
                                    });

                                    document.querySelector("#update-names-form form").addEventListener("submit", function(event) {
                                        event.preventDefault();

                                        showTheLoadingScreen();

                                        $.ajax({
                                            "data": {
                                                "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                "regionIsoCode": document.querySelector("html").getAttribute("lang").substring(3, 5),
                                                "firstName": document.querySelector("#update-names-form-first-name-input-field").value,
                                                "middleName": document.querySelector("#update-names-form-middle-name-input-field").value,
                                                "lastName": document.querySelector("#update-names-form-last-name-input-field").value,
                                                "nickname": document.querySelector("#update-names-form-nickname-input-field").value,
                                                "toUseANickname": document.querySelector("#update-names-form-display-nickname-checkbox").checked,
                                                "password": document.querySelector("#update-names-form-current-password-input-field").value
                                            },
                                            "type": "POST",
                                            "url": "./profile/update/names/",
                                            "success": function() {
                                                setTimeout(function() {
                                                    firstName = document.querySelector("#update-names-form-first-name-input-field").value.replace(/\s+/g, " ").trim();
                                                    middleName = document.querySelector("#update-names-form-middle-name-input-field").value.replace(/\s+/g, " ").trim();
                                                    lastName = document.querySelector("#update-names-form-last-name-input-field").value.replace(/\s+/g, " ").trim();
                                                    nickname = document.querySelector("#update-names-form-nickname-input-field").value.replace(/\s+/g, " ").trim();
                                                    usesANickname = document.querySelector("#update-names-form-display-nickname-checkbox").checked;

                                                    hideTheLoadingScreen();

                                                    document.querySelector("#update-names-form").style.animationName = "shrink";
                                                    setTimeout(function() {
                                                        document.querySelector("#update-names-form").remove();
                                                        document.querySelector("#profile-menu").style.animationName = "grow";
                                                        document.querySelector("#profile-menu").style.display = "block";
                                                    }, 200);
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

                                    document.querySelector("#update-names-form-back-button").addEventListener("click", function(event) {
                                        event.preventDefault();

                                        document.querySelector("#update-names-form").style.animationName = "shrink";
                                        setTimeout(function() {
                                            document.querySelector("#update-names-form").remove();
                                            document.querySelector("#profile-menu").style.animationName = "grow";
                                            document.querySelector("#profile-menu").style.display = "block";
                                        }, 200);
                                    });
                                }, 200);
                            });

                            document.querySelector("#profile-menu-update-settings-button").addEventListener("click", function() {
                                document.querySelector("#profile-menu").style.animationName = "shrink";
                                setTimeout(function() {
                                    document.querySelector("#profile-menu").style.display = "none";
                                    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"update-settings-form\"><form><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Електронна поща"; case "en": return "E-mail"; } }() + "</label><input autocomplete=\"off\" id=\"update-settings-form-email-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Потребителско име"; case "en": return "Username"; } }() + "</label><input autocomplete=\"off\" id=\"update-settings-form-username-input-field\" maxlength=\"32\" spellcheck=\"false\" type=\"text\"><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Това ще бъде потребителското име, необходимо за влизане във Вашия Revamle ID. Препоръчваме Ви да не го споделяте с никого."; case "en": return "This will be the username needed to log in to your Revamle ID. We recommend that you do not share it with anyone."; } }() + "</p></fieldset><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Текуща парола"; case "en": return "Current Password"; } }() + "</label><input autocomplete=\"on\" id=\"update-settings-form-current-password-input-field\" maxlength=\"128\" type=\"password\"></fieldset><button disabled id=\"update-settings-form-submit-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }() + "</button><button id=\"update-settings-form-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");
                                    document.querySelector("#update-settings-form-email-input-field").value = emailAddress;
                                    document.querySelector("#update-settings-form-username-input-field").value = username;

                                    document.querySelector("#update-settings-form").addEventListener("click", function(event) {
                                        event.stopPropagation();
                                    });

                                    $("#update-settings-form form fieldset > input").on("input", function() {
                                        if ($(this).next() && $(this).next().prop("tagName") === "P" && $(this).next().css("color") === "rgb(230, 0, 0)") {
                                            $(this).next().remove();
                                        }
                                    });

                                    for (let i = 0; i < document.querySelectorAll("#update-settings-form input").length; i++) {
                                        document.querySelectorAll("#update-settings-form input")[i].addEventListener("keypress", function(event) {
                                            if (event.keyCode === 32) {
                                                event.preventDefault();
                                            }
                                        });
                                    }

                                    document.querySelector("#update-settings-form-email-input-field").addEventListener("input", function() {
                                        if (document.querySelector("#update-settings-form-current-password-input-field").value && this.value !== emailAddress) {
                                            document.querySelector("#update-settings-form-submit-button").disabled = false;
                                        }
                                    });

                                    document.querySelector("#update-settings-form-username-input-field").addEventListener("input", function() {
                                        if (document.querySelector("#update-settings-form-current-password-input-field").value && this.value !== username) {
                                            document.querySelector("#update-settings-form-submit-button").disabled = false;
                                        }
                                    });

                                    document.querySelector("#update-settings-form-current-password-input-field").addEventListener("input", function() {
                                        if (this.value && (document.querySelector("#update-settings-form-email-input-field").value !== emailAddress || document.querySelector("#update-settings-form-username-input-field").value !== username)) {
                                            document.querySelector("#update-settings-form-submit-button").disabled = false;
                                        }
                                        else {
                                            document.querySelector("#update-settings-form-submit-button").disabled = true;
                                        }
                                    });

                                    document.querySelector("#update-settings-form form").addEventListener("submit", function(event) {
                                        event.preventDefault();

                                        showTheLoadingScreen();

                                        $.ajax({
                                            "data": {
                                                "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                "emailAddress": document.querySelector("#update-settings-form-email-input-field").value,
                                                "username": document.querySelector("#update-settings-form-username-input-field").value,
                                                "password": document.querySelector("#update-settings-form-current-password-input-field").value
                                            },
                                            "type": "POST",
                                            "url": "./profile/update/settings/",
                                            "success": function() {
                                                emailAddress = document.querySelector("#update-settings-form-email-input-field").value;
                                                username = document.querySelector("#update-settings-form-username-input-field").value;

                                                setTimeout(function() {
                                                    hideTheLoadingScreen();

                                                    document.querySelector("#update-settings-form").style.animationName = "shrink";
                                                    setTimeout(function() {
                                                        document.querySelector("#update-settings-form").remove();
                                                        document.querySelector("#profile-menu").style.animationName = "grow";
                                                        document.querySelector("#profile-menu").style.display = "block";
                                                    }, 200);
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

                                    document.querySelector("#update-settings-form-back-button").addEventListener("click", function(event) {
                                        event.preventDefault();

                                        document.querySelector("#update-settings-form").style.animationName = "shrink";
                                        setTimeout(function() {
                                            document.querySelector("#update-settings-form").remove();
                                            document.querySelector("#profile-menu").style.animationName = "grow";
                                            document.querySelector("#profile-menu").style.display = "block";
                                        }, 200);
                                    });
                                }, 200);
                            });

                            document.querySelector("#profile-menu-update-password-button").addEventListener("click", function() {
                                document.querySelector("#profile-menu").style.animationName = "shrink";
                                setTimeout(function() {
                                    document.querySelector("#profile-menu").style.display = "none";
                                    document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"update-password-form\"><form><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Нова парола"; case "en": return "New Password"; } }() + "</label><input autocomplete=\"on\" id=\"update-password-form-new-password-input-field\" maxlength=\"128\" type=\"password\"><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Вашата парола трябва да е дълга поне осем знака и да съдържа цифри, главни и малки букви."; case "en": return "Your password must be at least eight characters long and contain digits, uppercase and lowercase letters."; } }() + "</p><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Потвърждаване на парола"; case "en": return "Confirm Password"; } }() + "</label><input autocomplete=\"on\" id=\"update-password-form-confirm-password-input-field\" maxlength=\"128\" type=\"password\"></fieldset><fieldset><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Текуща парола"; case "en": return "Current Password"; } }() + "</label><input autocomplete=\"on\" id=\"update-password-form-current-password-input-field\" maxlength=\"128\" type=\"password\"></fieldset><button disabled id=\"update-password-form-submit-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }() + "</button><button id=\"update-password-form-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");

                                    document.querySelector("#update-password-form").addEventListener("click", function(event) {
                                        event.stopPropagation();
                                    });

                                    $("#update-password-form form fieldset > input").on("input", function() {
                                        if ($(this).next() && $(this).next().prop("tagName") === "P" && $(this).next().css("color") === "rgb(230, 0, 0)") {
                                            const messageText = $(this).next().text();

                                            $(this).next().remove();
                                            $("#update-password-form form fieldset > input + p").each(function() {
                                                if ($(this).text() === messageText) {
                                                    $(this).remove();
                                                }
                                            });
                                        }
                                    });

                                    for (let i = 0; i < document.querySelectorAll("#update-password-form input").length; i++) {
                                        document.querySelectorAll("#update-password-form input")[i].addEventListener("keypress", function(event) {
                                            if (event.keyCode === 32) {
                                                event.preventDefault();
                                            }
                                        });
                                    }

                                    document.querySelector("#update-password-form-new-password-input-field").addEventListener("input", function() {
                                        if (document.querySelector("#update-password-form-current-password-input-field").value && this.value && document.querySelector("#update-password-form-confirm-password-input-field").value) {
                                            document.querySelector("#update-password-form-submit-button").disabled = false;
                                        }
                                        else {
                                            document.querySelector("#update-password-form-submit-button").disabled = true;
                                        }
                                    });

                                    document.querySelector("#update-password-form-confirm-password-input-field").addEventListener("input", function() {
                                        if (document.querySelector("#update-password-form-current-password-input-field").value && this.value && document.querySelector("#update-password-form-new-password-input-field").value) {
                                            document.querySelector("#update-password-form-submit-button").disabled = false;
                                        }
                                        else {
                                            document.querySelector("#update-password-form-submit-button").disabled = true;
                                        }
                                    });

                                    document.querySelector("#update-password-form-current-password-input-field").addEventListener("input", function() {
                                        if (this.value && document.querySelector("#update-password-form-new-password-input-field").value && document.querySelector("#update-password-form-confirm-password-input-field").value) {
                                            document.querySelector("#update-password-form-submit-button").disabled = false;
                                        }
                                        else {
                                            document.querySelector("#update-password-form-submit-button").disabled = true;
                                        }
                                    });

                                    document.querySelector("#update-password-form form").addEventListener("submit", function(event) {
                                        event.preventDefault();

                                        showTheLoadingScreen();

                                        $.ajax({
                                            "data": {
                                                "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                "newPassword": document.querySelector("#update-password-form-new-password-input-field").value,
                                                "reenteredPassword": document.querySelector("#update-password-form-confirm-password-input-field").value,
                                                "currentPassword": document.querySelector("#update-password-form-current-password-input-field").value
                                            },
                                            "type": "POST",
                                            "url": "./profile/update/password/",
                                            "success": function() {
                                                setTimeout(function() {
                                                    hideTheLoadingScreen();

                                                    document.querySelector("#update-password-form").style.animationName = "shrink";
                                                    setTimeout(function() {
                                                        document.querySelector("#update-password-form").remove();
                                                        document.querySelector("#profile-menu").style.animationName = "grow";
                                                        document.querySelector("#profile-menu").style.display = "block";
                                                    }, 200);
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

                                    document.querySelector("#update-password-form-back-button").addEventListener("click", function(event) {
                                        event.preventDefault();

                                        document.querySelector("#update-password-form").style.animationName = "shrink";
                                        setTimeout(function() {
                                            document.querySelector("#update-password-form").remove();
                                            document.querySelector("#profile-menu").style.animationName = "grow";
                                            document.querySelector("#profile-menu").style.display = "block";
                                        }, 200);
                                    });
                                }, 200);
                            });

                            if (document.querySelector("#profile-menu-payout-button")) {
                                document.querySelector("#profile-menu-payout-button").addEventListener("click", function() {
                                    document.querySelector("#profile-menu").style.animationName = "shrink";
                                    setTimeout(function() {
                                        document.querySelector("#profile-menu").style.display = "none";
                                        document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"payout-form\"><div><h3>" + data.revenue.toFixed(2) + " " + data.currencyIsoCode + "</h3>" + function() { if (document.querySelector("html").getAttribute("lang").substring(3, 5)) { return "<p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Възможно е да бъдат приложени такси."; case "en": return "Fees may be applied."; } }() + "</p><a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "terms-of-use#revenue/\" target=\"_blank\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Научете повече"; case "en": return "Learn More"; } }() + "</a>"; } else { return "<p>To request a payout, please select your region and enter your bank account details.</p><a draggable=\"false\" href=\"./regions/\">Region Select</a>"; } }() + "</div>" + function() { if (!document.querySelector("html").getAttribute("lang").substring(3, 5)) { return ""; } else { return "<form><fieldset>" + function() { switch(document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "<label>IBAN</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"22\" spellcheck=\"false\" type=\"text\">"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "AG": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"12\" spellcheck=\"false\" type=\"text\">"; case "AU": return "<label>Routing Number</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"6\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"9\" spellcheck=\"false\" type=\"text\">"; case "BN": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"13\" spellcheck=\"false\" type=\"text\">"; case "CA": return "<label>Routing Number</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"12\" spellcheck=\"false\" type=\"text\">"; case "GY": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"12\" spellcheck=\"false\" type=\"text\">"; case "HK": return "<label>Routing Number</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" spellcheck=\"false\" type=\"text\">"; case "KE": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"12\" spellcheck=\"false\" type=\"text\">"; case "MT": return "<label>IBAN</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"31\" spellcheck=\"false\" type=\"text\">"; case "NZ": return "<label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"16\" spellcheck=\"false\" type=\"text\">"; case "NG": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"10\" spellcheck=\"false\" type=\"text\">"; case "PK": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>IBAN</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"24\" spellcheck=\"false\" type=\"text\">"; case "PH": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"17\" spellcheck=\"false\" type=\"text\">"; case "QA": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>IBAN</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"29\" spellcheck=\"false\" type=\"text\">"; case "IE": return "<label>IBAN</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"22\" spellcheck=\"false\" type=\"text\">"; case "SG": return "<label>Routing Number</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"9\" spellcheck=\"false\" type=\"text\">"; case "ZA": return "<label>Routing Number</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"9\" spellcheck=\"false\" type=\"text\">"; case "LK": return "<label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"10\" spellcheck=\"false\" type=\"text\">"; case "TZ": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"14\" spellcheck=\"false\" type=\"text\">"; case "GM": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"11\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"18\" spellcheck=\"false\" type=\"text\">"; case "TT": return "<label>SWIFT/BIC Code</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"8\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"17\" spellcheck=\"false\" type=\"text\">"; case "UK": return "<label>Routing Number</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"6\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"22\" spellcheck=\"false\" type=\"text\">"; case "US": return "<label>Routing Number</label><input autocomplete=\"off\" id=\"payout-form-routing-number-input-field\" maxlength=\"9\" spellcheck=\"false\" type=\"text\"><label>Account Number</label><input autocomplete=\"off\" id=\"payout-form-bank-account-number-input-field\" maxlength=\"12\" spellcheck=\"false\" type=\"text\">"; } } }() + "</fieldset><button id=\"payout-form-submit-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Изплащане"; case "en": return "Pay Out"; } }() + "</button>" } }() + "<button id=\"payout-form-back-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></form></div>");

                                        document.querySelector("#payout-form").addEventListener("click", function(event) {
                                            event.stopPropagation();
                                        });

                                        if (document.querySelector("#payout-form form")) {
                                            if (document.querySelector("html").getAttribute("lang").substring(3, 5) === "CA") {
                                                new Cleave("#payout-form-routing-number-input-field", {
                                                    "delimiter": '-',
                                                    "blocks": [5, 3],
                                                });
                                            }
                                            if (document.querySelector("html").getAttribute("lang").substring(3, 5) === "HK") {
                                                new Cleave("#payout-form-routing-number-input-field", {
                                                    "delimiter": '-',
                                                    "blocks": [3, 3],
                                                });
                                                new Cleave("#payout-form-bank-account-number-input-field", {
                                                    "delimiter": '-',
                                                    "blocks": [6, 3],
                                                });
                                            }
                                            if (document.querySelector("html").getAttribute("lang").substring(3, 5) === "SG") {
                                                new Cleave("#payout-form-routing-number-input-field", {
                                                    "delimiter": '-',
                                                    "blocks": [4, 3],
                                                });
                                            }

                                            document.querySelector("#payout-form form").addEventListener("submit", function(event) {
                                                event.preventDefault();

                                                showTheLoadingScreen();

                                                $.ajax({
                                                    "data": {
                                                        "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                                        "regionIsoCode": document.querySelector("html").getAttribute("lang").substring(3, 5),
                                                        "routingNumber": function() { if (document.querySelector("#payout-form-routing-number-input-field")) { return document.querySelector("#payout-form-routing-number-input-field").value ; } }(),
                                                        "accountNumber": document.querySelector("#payout-form-bank-account-number-input-field").value
                                                    },
                                                    "type": "POST",
                                                    "url": "./request-a-payout/",
                                                    "success": function() {
                                                        setTimeout(function() {
                                                            hideTheLoadingScreen();

                                                            document.querySelector("#payout-form").style.animationName = "shrink";
                                                            setTimeout(function() {
                                                                document.querySelector("#payout-form").remove();
                                                                document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Заявката Ви за изплащане бе успешна"; case "en": return "Your payout request was successful"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Ще се свържем с вас в рамките на 72 часа."; case "en": return "We will contact you back within 72 hours."; } }() + "</p><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Назад"; case "en": return "Back"; } }() + "</button></div>");

                                                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].addEventListener("click", function(event) {
                                                                    event.stopPropagation();
                                                                });

                                                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length -1].querySelector("button").addEventListener("click", function() {
                                                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length -1].style.animationName = "shrink";
                                                                    setTimeout(function() {
                                                                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length -1].remove();
                                                                        document.querySelector("#profile-menu-payout-button").remove();
                                                                        document.querySelector("#profile-menu").style.animationName = "grow";
                                                                        document.querySelector("#profile-menu").style.display = "block";
                                                                    }, 200);
                                                                });
                                                            }, 200);
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
                                        }

                                        document.querySelector("#payout-form-back-button").addEventListener("click", function(event) {
                                            event.preventDefault();

                                            document.querySelector("#payout-form").style.animationName = "shrink";
                                            setTimeout(function() {
                                                document.querySelector("#payout-form").remove();
                                                document.querySelector("#profile-menu").style.animationName = "grow";
                                                document.querySelector("#profile-menu").style.display = "block";
                                            }, 200);
                                        });
                                    }, 200);
                                });
                            }

                            document.querySelector("#profile-menu-log-out-button").addEventListener("click", function() {
                                logOut();
                            });

                            document.querySelector("#profile-menu-close-button").addEventListener("click", function() {
                                document.querySelector("#curtain").click();
                            });
                        }

                        if (data.recoveryKey) {
                            document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3 style=\"-moz-user-select: auto; -ms-user-select: auto; -webkit-user-select: auto; user-select: auto;\">" + data.recoveryKey + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Ако загубите достъп до Вашия Revamle ID, ще можете да го възстановите чрез показания по-горе ключ за възстановяване."; case "en": return "If you lose access to your Revamle ID, you will be able to restore it through the recovery key shown above."; } }() + "</p><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Ключът за възстановяване няма да бъде показан отново. Съветваме Ви да го пазите на сигурно място и да не го споделяте с никого."; case "en": return "The recovery key will not be shown to you again. We advise you to keep it safe and not share it with anyone."; } }() + "</p><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Напред"; case "en": return "Next"; } }() + "</button></div>");

                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].addEventListener("click", function(event) {
                                event.stopPropagation();
                            });

                            if ((document.querySelector("#books-publish-menu") || document.querySelector(".book-preview[style]")) && window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "none") {
                                document.querySelector("#curtain").setAttribute("data-has-disabled-pointer-events", "true");

                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelector("button").addEventListener("click", function() {
                                    location.reload();
                                });
                            }
                            else {
                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelector("button").addEventListener("click", function() {
                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.animationName = "shrink";
                                    setTimeout(function() {
                                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].remove();
                                        document.querySelector("#profile-menu").style.animationName = "grow";
                                        document.querySelector("#profile-menu").style.display = "block";
                                    }, 200);
                                });
                            }
                        }
                        else {
                            if (!agreesToTosAndPP && (!document.querySelector("#books-publish-menu") && !document.querySelector(".book-preview[style]") || window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "block")) {
                                document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Възможно е да нямате достъп до определени функции и услуги"; case "en": return "You may not have access to certain services and features"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Налице са промени в <a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "terms-of-use/\" target=\"_blank\">Общите условия</a> и <a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "privacy-policy/\" target=\"_blank\">Политиката за поверителност</a>. Възможно е да нямате достъп до определени функции и услуги преди да се съгласите с тях."; case "en": return "There are changes to the <a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "terms-of-use/\" target=\"_blank\">Terms of Use</a> and <a draggable=\"false\" href=\"./" + function() { if (document.querySelector("html").getAttribute("lang") === "en") { return ""; } else { if (window.location.pathname.split("/").filter(Boolean)[1] && window.location.pathname.split("/").filter(Boolean)[1] === document.querySelector("html").getAttribute("lang").substring(0, 2)) { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/" + document.querySelector("html").getAttribute("lang").substring(0, 2) + "/"; } else { return document.querySelector("html").getAttribute("lang").substring(3, 5).toLowerCase() + "/"; } } }() + "privacy-policy/\" target=\"_blank\">Privacy Policy</a>. You may not be able to access certain services and features until you agree to them."; } }() + "</p><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Съгласявам се"; case "en": return "Agree"; } }() + "</button><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Не сега"; case "en": return "Maybe Later"; } }() + "</button></div>");

                                document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].addEventListener("click", function(event) {
                                    event.stopPropagation();
                                });

                                if ((document.querySelector("#books-publish-menu") || document.querySelector(".book-preview[style]")) && window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "none") {
                                    document.querySelector("#curtain").setAttribute("data-has-disabled-pointer-events", "true");

                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].addEventListener("click", function() {
                                        agreeToTosAndPP(true);
                                    });

                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].addEventListener("click", function() {
                                        location.reload();
                                    });
                                }
                                else {
                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].addEventListener("click", function() {
                                        agreeToTosAndPP(false);
                                    });

                                    document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].addEventListener("click", function() {
                                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].style.animationName = "shrink";
                                        setTimeout(function() {
                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].remove();
                                            document.querySelector("#profile-menu").style.animationName = "grow";
                                            document.querySelector("#profile-menu").style.display = "block";
                                        }, 200);
                                    });
                                }
                            }
                            else {
                                if ((document.querySelector("#books-publish-menu") || document.querySelector(".book-preview[style]")) && window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "none") {
                                    location.reload();
                                }
                            }
                        }

                        if (!document.querySelector("#books-publish-menu") && !document.querySelector(".book-preview[style]") || window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "block" || data.recoveryKey || !data.agreesToTosAndPP) {
                            document.querySelector("#containers nav").style.display = "none";
                            document.querySelectorAll("#containers > div").forEach(function(element) {
                                if (element !== document.querySelector("#profile-menu") && element.previousElementSibling !== document.querySelector("#profile-menu")) {
                                    element.remove();
                                }
                            });
                        }
                    }, function() { if (!document.querySelector("#books-publish-menu") && !document.querySelector(".book-preview[style]") || window.getComputedStyle(document.querySelector("#curtain nav"), null).display === "block"  || data.recoveryKey || !data.agreesToTosAndPP) { return 200; } else { return 0; } }());
                }, 1000);
            },
            "error": function(data) {
                setTimeout(function() {
                    hideTheLoadingScreen();

                    if (data.status === 401) {
                        document.querySelector("#containers nav").style.animationName = "shrink";
                        setTimeout(function() {
                            document.querySelector("#containers nav").style.display = "none";
                            showTheLogInForm();
                        }, 200);
                    }
                    else {
                        processData(data.responseJSON);
                    }
                }, 1000);
            }
        });
    });
}