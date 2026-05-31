const title = document.title;

if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
    document.querySelector("html body").style.overflowX = "scroll";
}
document.querySelector("#letters").style.overflow = "hidden";

document.querySelector("#curtain .blur").style.animationDuration = "0s";
document.querySelector("#curtain").style.display = "block";
showTheLoadingScreen();
document.querySelector("#loading-screen .blur").style.animationName = "none";
document.querySelector("#loading-screen .blur").style.background = "none";
document.querySelector("#loading-screen .blur").style.backdropFilter = "none";
document.querySelector("#spinner-container img").style.animationName = "none";

const userAgent = new UAParser();

const hideTheApplication = function() {
    if (document.querySelector("#letters").scrollHeight > document.querySelector("#letters").clientHeight) {
        document.querySelector("html body").style.overflowY = "scroll";
    }
    if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
        document.querySelector("html body").style.overflowX = "scroll";
    }
    document.querySelector("#letters").style.overflow = "hidden";

    document.querySelector("#curtain .blur").style.animationName = "fade-in";
    document.querySelector("#curtain").style.display = "block";
}

const showTheApplication = function() {
    document.querySelector("html body").style.overflowX = "auto";
    document.querySelector("html body").style.overflowY = "auto";
    document.querySelector("#letters").style.overflow = "auto";

    document.querySelector("#curtain .blur").style.animationDuration = "0.2s";
    document.querySelector("#curtain .blur").style.animationName = "fade-out";
    for (let i = 0; i < document.querySelectorAll("#containers > div, #containers nav").length; i++) {
        document.querySelectorAll("#containers > div, #containers nav")[i].style.animationName = "shrink";
    }
}

const positionTheImages = function() {
    if (userAgent.getResult().browser.name === "Firefox") {
        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] img").length; i++) {
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.marginLeft = ((function() { if (document.querySelector("html body").clientWidth <= 1366) { return document.querySelector("#editor-sheet div[contenteditable]").clientWidth; } else { return 640; } }() - function() { if (document.querySelector("html body").clientWidth <= 1366) { return 64; } else { return 128; } }() - document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].clientWidth) / 2) + "px";
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.marginRight = ((function() { if (document.querySelector("html body").clientWidth <= 1366) { return document.querySelector("#editor-sheet div[contenteditable]").clientWidth; } else { return 640; } }() - function() { if (document.querySelector("html body").clientWidth <= 1366) { return 64; } else { return 128; } }() - document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].clientWidth) / 2) + "px";
        }
    }
}

window.addEventListener("beforeunload", function(event) {
    if (hasUnsavedChanges || document.querySelector("#save-document-settings-and-details-button") && !document.querySelector("#save-document-settings-and-details-button").disabled) {
        const unsavedChangesMessage = function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Имате незапазени промени в този документ. Желаете ли първо да ги запазите?"; case "en": return "You have unsaved changes on this document. Would you like to save them first?"; } }();
        event.returnValue = unsavedChangesMessage;
        return unsavedChangesMessage;
    }
});

window.addEventListener("resize", function() {
    if (document.querySelector("#documents") && document.querySelector("#editor")) {
        if (document.querySelectorAll("#letters > div")[1].getAttribute("id") === "documents") {
            document.querySelector("#editor").scrollIntoView({ "behavior": "smooth" });
        }
        else {
            document.querySelector("#documents").scrollIntoView({ "behavior": "smooth" });
        }
    }

    if (document.querySelector("#context-menu")) {
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

    positionTheImages();

    if (document.querySelector("html body").clientHeight <= 572 && document.querySelector("#letters-toolbar[style]") || document.querySelector(".magic-effect")) {
        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "-1");
        }
    }
    else {
        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable=\"false\"] .word-piece-wrapper[tabindex]").length; i++) {
            document.querySelectorAll("#editor-sheet div[contenteditable=\"false\"] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "0");
        }
        if (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]")) {
            document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").setAttribute("tabindex", "-1");
        }
    }
});

let hasUnsavedChanges = false;

let lastCaretPosition = 0;
const setTheCaretPosition = function(element, position) {
    for (let node of element.childNodes) {
        if (node.nodeType === 3) {
            if (node.length >= position) {
                const range = document.createRange();
                const selection = window.getSelection();
                range.setStart(node, position);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                return -1;
            }
            else {
                position -= node.length;
            }
        }
        else {
            position = setTheCaretPosition(node, position);
            if (position === -1) {
                return -1;
            }
        }
    }

    return position;
}

const showTheEditor = function(_id, name, lastTimeEdited, friendsWithSharedAccess, cover, hasACustomCover, content, hasCreatedTheDocument, isPublished, creatorName, creatorProfilePhoto) {
    document.title = name + " – " + title;

    let saveStates = [];
    let currentSaveStateIndex = 0;

    const createABlobFromADataURL = function(dataURL, mimeType) {
        const byteString = atob(dataURL.split(",")[1]);
        const byteArray = new ArrayBuffer(byteString.length);
        const unsignedIntegerArray = new Uint8Array(byteArray);

        for (let i = 0; i < byteString.length; i++) {
            unsignedIntegerArray[i] = byteString.charCodeAt(i);
        }

        return new Blob([byteArray], { "type": mimeType });
    }

    const exitTheEditor = function() {
        document.title = title;

        document.querySelector("#loading-screen .blur").style.background = "none";
        document.querySelector("#loading-screen .blur").style.backdropFilter = "none";
        hideTheApplication();
        document.querySelector("#curtain .blur").style.animationDuration = "0s";

        document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div id=\"documents\"></div>");

        document.querySelector("#letters").dataset.hasAScrollAnimationInProgress = "true";
        document.querySelector("#letters").scrollTo({ "top": document.querySelector("#documents").offsetTop - function() { if (document.querySelector("html body").clientHeight <= 572 || document.querySelector("html body").clientWidth <= 1366) { return 60; } else { return 76; } }(), "behavior": "smooth" });

        let scrollAnimationProgress = null;

        const checkTheScrollAnimationProgress = setInterval(function() {
            if (scrollAnimationProgress === document.querySelector("#letters").scrollTop) {
                document.querySelector("#letters").scrollTo({ "top": document.querySelector("#documents").offsetTop - function() { if (document.querySelector("html body").clientHeight <= 572 || document.querySelector("html body").clientWidth <= 1366) { return 60; } else { return 76; } }(), "behavior": "smooth" });
            }

            scrollAnimationProgress = document.querySelector("#letters").scrollTop;

            if (document.querySelector("#letters").scrollTop === document.querySelector("#documents").offsetTop - function() { if (document.querySelector("html body").clientHeight <= 572 || document.querySelector("html body").clientWidth <= 1366) { return 60; } else { return 76; } }()) {
                clearInterval(checkTheScrollAnimationProgress);

                document.querySelector("#editor").remove();
                document.querySelector("#letters").dataset.hasAScrollAnimationInProgress = "false";
                document.querySelector("#letters").scrollTop = 0;
                hasUnsavedChanges = false;
                lastCaretPosition = 0;
            }
        }, 1000);
    }

    const saveTheDocument = function(data, coverDataURL) {
        data.delete("languageIsoCode");
        data.append("languageIsoCode", document.querySelector("html").getAttribute("lang").substring(0, 2));
        // data.delete("session_id");
        // data.append("session_id", null);
        // data.delete("sessionToken");
        // data.append("sessionToken", null);
        data.delete("document_id");
        data.append("document_id", _id);
        data.delete("lastTimeEdited");
        data.append("lastTimeEdited", lastTimeEdited);
        data.delete("documentContent");
        data.append("documentContent", document.querySelector("#editor-sheet div[contenteditable]").innerHTML);

        $.ajax({
            "contentType": false,
            "data": data,
            "processData": false,
            "url": "./letters/document/save/",
            "type": "POST",
            "success": function(documentData) {
                setTimeout(function() {
                    if (!JSON.parse(data.get("toBeDeleted"))) {
                        if (hasUnsavedChanges || JSON.parse(data.get("toBeDeleted")) !== null) {
                            hideTheLoadingScreen();

                            document.querySelector("html body").style.overflowX = "auto";
                            document.querySelector("#letters").style.overflow = "auto";

                            if (JSON.parse(data.get("toBeDeleted")) === null || JSON.parse(documentData)._id !== _id) {
                                hasUnsavedChanges = false;
                                document.querySelector("#letters-home-and-save-button").dataset.hasUnsavedChanges = "false";
                                document.querySelector("#letters-home-and-save-button img").setAttribute("alt", function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Начало"; case "en": return "Home"; } }());
                            }

                            _id = JSON.parse(documentData)._id;
                            name = JSON.parse(documentData).name;
                            lastTimeEdited = JSON.parse(documentData).lastTimeEdited;
                            friendsWithSharedAccess = data.get("friendsToHaveAccess").split(",");
                            cover = coverDataURL;
                            hasACustomCover = JSON.parse(data.get("hasACustomCover"));

                            document.title = name + " – " + title;

                            if (document.querySelector("#document-name-input-field")) {
                                document.querySelector("#document-name-input-field").value = name;

                                document.querySelector("#save-document-settings-and-details-button").disabled = true;
                            }

                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                            }

                            const sheetScrollPosition = sheetScrollBar.getScrollElement().scrollTop;

                            document.querySelector("#editor-sheet div[contenteditable]").focus();
                            setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                            sheetScrollBar.getScrollElement().scrollTop = sheetScrollPosition;
                        }
                        else {
                            exitTheEditor();
                        }
                    }
                    else {
                        document.querySelector("#update-document-cover-menu").remove();

                        if (document.querySelector(".friends-list")) {
                            document.querySelector(".friends-list").remove();
                        }

                        showTheApplication();

                        document.querySelector("#containers div").style.animationName = "shrink";
                        setTimeout(function() {
                            document.querySelector("#containers div").remove();

                            setTimeout(function() {
                                exitTheEditor();
                            }, 200);
                        }, 200);
                    }
                }, 1000);

            },
            "error": function(data) {
                setTimeout(function() {
                    if (document.querySelector("#containers > div") && document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].hasAttribute("id")) {
                        if (document.querySelector("#update-document-cover-menu")) {
                            document.querySelector("#update-document-cover-menu").style.display = "none";
                        }

                        if (document.querySelector(".friends-list")) {
                            document.querySelector(".friends-list").style.display = "none";
                        }
                    }

                    document.querySelector("#loading-screen .blur").style.background = "none";
                    document.querySelector("#loading-screen .blur").style.backdropFilter = "none";

                    hideTheApplication();
                    document.querySelector("#curtain .blur").style.animationDuration = "0s";

                    hideTheLoadingScreen();

                    processData(function() { if (data.responseText && data.responseText.includes("{")) { return JSON.parse(data.responseText); } else { return null; } }());
                }, 1000);
            }
        });
    }

    const getTheCaretPosition = function() {
        if (document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "true") {
            const sheetOwnerDocument = document.querySelector("#editor-sheet div[contenteditable]").ownerDocument || document.querySelector("#editor-sheet div[contenteditable]").document;
            const sheetOwnerDocumentWindowObject = sheetOwnerDocument.defaultView || sheetOwnerDocument.parentWindow;
            let selection;

            if (typeof sheetOwnerDocumentWindowObject.getSelection !== "undefined") {
                selection = sheetOwnerDocumentWindowObject.getSelection();
                if (selection.rangeCount > 0) {
                    var range = sheetOwnerDocumentWindowObject.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(document.querySelector("#editor-sheet div[contenteditable]"));
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    lastCaretPosition = preCaretRange.toString().length;
                }
            }
            else if ((selection = sheetOwnerDocument.selection) && selection.type !== "Control") {
                const textRange = selection.createRange();
                const preCaretTextRange = sheetOwnerDocument.body.createTextRange();
                preCaretTextRange.moveToElementText(document.querySelector("#editor-sheet div[contenteditable]"));
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                lastCaretPosition = preCaretTextRange.text.length;
            }
        }
    }
    const scrollToTheCaret = function() {
        const lineBreak = document.createElement("br");
        window.getSelection().getRangeAt(0).insertNode(lineBreak);
        lineBreak.scrollIntoView({ "block": "nearest" });
        lineBreak.remove();
    }

    const wrapTheWords = function() {
        document.querySelector("#editor-sheet div[contenteditable]").setAttribute("tabindex", "-1");
        if (window.getSelection().toString().length) {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }
            else if (document.selection) {
                document.selection.empty();
            }
        }

        $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper[data-has-been-overwritten=\"false\"]"), function(element) {
            $(element).addClass("transitionless");
            if ($(element).attr("tabindex")) {
                $(element).attr("tabindex", "0");
            }
        });

        $.grep($("#editor-sheet div[contenteditable] img"), function(element) {
            $(element).addClass("transitionless");
        });

        setTimeout(function() {
            $.grep($(".transitionless"), function(element) {
                $(element).removeClass("transitionless");
            });
        }, 0);

        $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper[data-has-been-overwritten=\"true\"]"), function(element) {
            $(element).replaceWith($(element).contents());
        });

        document.querySelector("#editor-sheet div[contenteditable]").normalize();

        if (hasCreatedTheDocument) {
            $.grep($("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] *").contents().filter(function() { return this.nodeType === 3; }), function(node) {
                $(node).replaceWith("<span class=\"text-node-wrapper\">" + $(node).text() + "</span>");
            });
            $.grep($("#editor-sheet div[contenteditable] .text-node-wrapper"), function(element) {
                if ($(element).closest(".word-piece-wrapper").length) {
                    $(element).replaceWith($(element).contents());
                }
            });

            let previouslyAppliedWordIdentifiers = [];
            const generateAWordIdentifier = function() {
                let wordIdentifier = "";

                const charset = "abcdefghijklmnopqrstuvwxyz0123456789";

                for (let i = 0; i < 16; i++) {
                    wordIdentifier += charset.charAt(Math.floor(Math.random() * charset.length));
                }

                if (previouslyAppliedWordIdentifiers.includes(wordIdentifier) || document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")) {
                    generateAWordIdentifier();
                }
                else {
                    return wordIdentifier;
                }
            }
            let wordIdentifier = generateAWordIdentifier();
            let previousTextNodeWrapper = null;
            $.grep($("#editor-sheet div[contenteditable] .text-node-wrapper, #editor-sheet div[contenteditable] img"), function(element) {
                let replacementHTML = "";
                if ($(element).prop("tagName") !== "IMG") {
                    if (previousTextNodeWrapper && !$(element).closest("div").is($(previousTextNodeWrapper).closest("div"))) {
                        wordIdentifier = generateAWordIdentifier();
                    }

                    for (let i = 0; i < $(element).text().length; i++) {
                        if ($(element).text()[i] === " " || $(element).text()[i] === " ") {
                            if (i === 0 || $(element).text()[i - 1] !== " " && $(element).text()[i - 1] !== " ") {
                                replacementHTML += "<span class=\"white-spaces-wrapper\">";
                            }

                            replacementHTML += $(element).text()[i];

                            if (i === $(element).text().length - 1 || $(element).text()[i + 1] !== " " && $(element).text()[i + 1] !== " ") {
                                replacementHTML += "</span>";
                            }

                            wordIdentifier = generateAWordIdentifier();
                        }
                        else {
                            if (i === 0 || $(element).text()[i - 1] === " " || $(element).text()[i - 1] === " ") {
                                replacementHTML += "<span class=\"word-piece-wrapper\" data-word-identifier=\"" + wordIdentifier + "\" data-is-selected=\"false\"" + function() { if (!previouslyAppliedWordIdentifiers.includes(wordIdentifier)) { return " tabindex=\"0\""; } else { return ""; } }() + ">";
                            }

                            replacementHTML += $(element).text()[i];

                            if (i === $(element).text().length - 1 || $(element).text()[i + 1] === " " || $(element).text()[i + 1] === " ") {
                                replacementHTML += "</span>";
                            }

                            previouslyAppliedWordIdentifiers.push(wordIdentifier);
                        }
                    }

                    $(element).html(replacementHTML);

                    previousTextNodeWrapper = element;
                }
                else {
                    wordIdentifier = generateAWordIdentifier();
                }
            });

            $.grep($("#editor-sheet div[contenteditable] .text-node-wrapper"), function(element) {
                $(element).replaceWith($(element).contents());
            });
        }

        $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper"), function(element) {
            const wrappedWordsClickEvent = function(wordIdentifier) {
                const hideTheEffect = function() {
                    if (document.querySelector(".magic-effect")) {
                        document.querySelector(".magic-effect").remove();
                    }

                    if (!document.querySelector("#magic-effects-options")) {
                        document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-is-selected=\"true\"]").forEach(function(element) {
                            element.setAttribute("data-is-selected", "false");
                        });
                    }

                    for (let i = 0; i < document.querySelectorAll("#editor button, #editor input, #editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
                        document.querySelectorAll("#editor button, #editor input, #editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "0");
                    }
                    if (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]")) {
                        document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").setAttribute("tabindex", "-1");
                    }
                }

                const showTheEffect = function(effectName) {
                    switch (effectName) {
                        case "remove":
                            document.querySelector("#remove-effect-button").style.background = "#FA5F55";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].removeAttribute("data-effect-name");
                            }

                            hideTheEffect();
                            
                            break;
                        case "confetti":
                            document.querySelector("#confetti-effect-button").style.background = "#FF69B4";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\"></div>");

                            if (!document.querySelector("#confetti")) {
                                document.querySelector("html body").insertAdjacentHTML("beforeend", "<div id=\"confetti\"></div>");
                            }
                            document.querySelector("#confetti").style.opacity = "1";
                            document.querySelector("#confetti").style.animation = "fade-out 0.2s 3s forwards";

                            function animateTheConfetti(particleRatio, opts) {
                                confetti(Object.assign({}, { "origin": { "y": 0.7 }, }, opts, { "particleCount": Math.floor(200 * particleRatio) }));
                            }

                            animateTheConfetti(0.25, { "spread": 26, "startVelocity": 55 });
                            animateTheConfetti(0.2, { "spread": 60 });
                            animateTheConfetti(0.35, { "decay": 0.91, "scalar": 0.8, "spread": 100 });
                            animateTheConfetti(0.1, { "decay": 0.92, "scalar": 1.2, "spread": 120, "startVelocity": 25 });
                            animateTheConfetti(0.1, { "spread": 120, "startVelocity": 45 });

                            // new Audio("./letters/public/assets/sounds/mixkit-small-group-clapping-475-trim.wav").play();

                            setTimeout(function() {
                                hideTheEffect();

                                document.querySelector("#confetti").style.opacity = "0";
                                document.querySelector("#confetti").style.animation = "none";
                            }, 3200);

                            break;
                        case "hearts":
                            document.querySelector("#hearts-effect-button").style.background = "#DC143C";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\"></div>");

                            if (!document.querySelector("#confetti")) {
                                document.querySelector("html body").insertAdjacentHTML("beforeend", "<div id=\"confetti\"></div>");
                            }
                            document.querySelector("#confetti").style.opacity = "1";
                            document.querySelector("#confetti").style.animation = "fade-out 0.2s 3s forwards";

                            var defaults = { "colors": ["FFC0CB", "FF69B4", "FF1493", "C71585"], "decay": 0.94, "gravity": 0, "shapes": ["heart"], "spread": 360, "startVelocity": 30, "ticks": 250 };

                            confetti({ ...defaults, "scalar": 2, "particleCount": 50 });
                            confetti({ ...defaults, "scalar": 3, "particleCount": 25 });
                            confetti({ ...defaults, "scalar": 4, "particleCount": 10 });

                            // new Audio("./letters/public/assets/sounds/mixkit-small-group-clapping-475-trim.wav").play();

                            setTimeout(function() {
                                hideTheEffect();

                                document.querySelector("#confetti").style.opacity = "0";
                                document.querySelector("#confetti").style.animation = "none";
                            }, 3200);

                            break;
                        case "stars":
                            document.querySelector("#stars-effect-button").style.background = "#FFA500";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\"></div>");

                            if (!document.querySelector("#confetti")) {
                                document.querySelector("html body").insertAdjacentHTML("beforeend", "<div id=\"confetti\"></div>");
                            }
                            document.querySelector("#confetti").style.opacity = "1";
                            document.querySelector("#confetti").style.animation = "fade-out 0.2s 3s forwards";

                            var defaults = { "colors": ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"], "decay": 0.94, "gravity": 0, "shapes": ["star"], "startVelocity": 30, "spread": 360, "ticks": 250 };

                            const shoot = function() {
                                confetti({ ...defaults, "particleCount": 40, "scalar": 1.2, "shapes": ["star"] });
                                confetti({ ...defaults, "particleCount": 10, "scalar": 0.75, "shapes": ["circle"] });
                            }

                            setTimeout(shoot, 0);
                            setTimeout(shoot, 100);
                            setTimeout(shoot, 200);

                            // new Audio("./letters/public/assets/sounds/mixkit-small-group-clapping-475-trim.wav").play();

                            setTimeout(function() {
                                hideTheEffect();

                                document.querySelector("#confetti").style.opacity = "0";
                                document.querySelector("#confetti").style.animation = "none";
                            }, 3200);

                            break;
                        case "fireworks":
                            document.querySelector("#fireworks-effect-button").style.background = "#9F2B68";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\" id=\"fireworks-magic-effect\"></div>");

                            const fireworks = new Fireworks.default(document.querySelector(".magic-effect"), { "brightness": { "max": 65, "min": 60 }, "friction": 1, "intensity": 50, "lineWidth": { "explosion": { "max": 3.5, "min": 1 }, "trace": { "max": 2, "min": 0.1 } }, "particles": 120, "rocketsPoint": { "max": 100, "min": 0 }, "sound": { "enabled": true, "files": ["./letters/public/assets/sounds/website_public_sounds_explosion0.mp3", "./letters/public/assets/sounds/website_public_sounds_explosion1.mp3", "./letters/public/assets/sounds/website_public_sounds_explosion2.mp3"], "volume": { "max": 40, "min": 25 } }, "traceLength": 6, "traceSpeed": 15 });

                            const fireworksInterval = setInterval(function() {
                                fireworks.launch();
                            }, 150);

                            setTimeout(function() {
                                clearInterval(fireworksInterval);
                            }, 1800);

                            setTimeout(function() {
                                fireworks.stop(true);

                                hideTheEffect();
                            }, 3800);

                            break;
                        case "rain":
                            document.querySelector("#rain-effect-button").style.background = "#0F52BA";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\" id=\"rain-magic-effect\"></div>");

                            // new Audio("./letters/public/assets/sounds/mixkit-swoosh-wind-passing-1167-trim.wav").play();

                            setTimeout(function() {
                                hideTheEffect();
                            }, 3800);

                            break;
                        case "leaves":
                            document.querySelector("#leaves-effect-button").style.background = "#EC5800";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\" id=\"leaves-magic-effect\"><div><div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/orange-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/grape-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/oak-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/red-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/orange-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/grape-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/oak-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/red-maple-leaf.png\"></div></div><div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/orange-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/grape-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/oak-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/red-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/orange-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/grape-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/oak-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/red-maple-leaf.png\"></div></div><div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/orange-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/grape-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/oak-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/red-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/orange-maple-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/grape-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/oak-leaf.png\"></div><div><img alt=\"\" draggable=\"false\" src=\"./letters/public/assets/images/red-maple-leaf.png\"></div></div></div></div>");

                            // new Audio("./letters/public/assets/sounds/mixkit-cartoon-toy-whistle-616.wav").play();

                            setTimeout(function() {
                                hideTheEffect();
                            }, 3800);

                            break;
                        case "wind":
                            document.querySelector("#wind-effect-button").style.background = "#C04000";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\" id=\"wind-magic-effect\"><div><img alt=\"\" draggable=\"false\" src=\"" + ["./letters/public/assets/images/grape-leaf.png", "./letters/public/assets/images/oak-leaf.png", "./letters/public/assets/images/orange-maple-leaf.png", "./letters/public/assets/images/red-maple-leaf.png"][Math.floor(Math.random() * 4)] + "\"></div></div>");

                            setTimeout(function() {
                                hideTheEffect();
                            }, 4000);

                            break;
                        case "smoke":
                            document.querySelector("#smoke-effect-button").style.background = "#CC5500";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\" id=\"smoke-magic-effect\"><canvas></canvas></div>");

                            const smokeCanvas = document.querySelector("#smoke-magic-effect canvas");
                            const smokeCanvasContext = smokeCanvas.getContext("2d");

                            smokeCanvas.width = innerWidth;
                            smokeCanvas.height = innerHeight;

                            const smoke = SmokeMachine(smokeCanvasContext, [18, 16, 54]);
                            smoke.start();

                            smoke.setPreDrawCallback(function() {
                                smoke.addSmoke(innerWidth / 2, innerHeight + innerHeight / 6, 0.5);

                                smokeCanvas.width = innerWidth;
                                smokeCanvas.height = innerHeight;
                            });

                            // new Audio("./letters/public/assets/sounds/" + ["mixkit-female-long-laugh-426", "mixkit-females-laugh-425"][Math.floor(Math.random() * 2)] + ".wav").play();

                            setTimeout(function() {
                                hideTheEffect();
                            }, 9000);

                            break;
                        case "heartbeat":
                            document.querySelector("#heartbeat-effect-button").style.background = "#FF2400";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\" id=\"heartbeat-magic-effect\"></div>");
                            const animateTheHeartbeat = function(animationDelayTime) {
                                setTimeout(function() {
                                    if (document.querySelector(".magic-effect").hasAttribute("style")) {
                                        document.querySelector(".magic-effect").removeAttribute("style");
                                        document.querySelector("#editor").removeAttribute("style");
                                    }
                                    else {
                                        document.querySelector(".magic-effect").style.background = "rgba(255, 0, 0, 0.1)";
                                        document.querySelector("#editor").style.filter = "blur(1px)";
                                        document.querySelector("#editor").style.transform = "scale(1.01) translateY(-3px)";
                                    }
                                }, animationDelayTime);
                                if (animationDelayTime !== 5250) {
                                    animateTheHeartbeat(animationDelayTime + 750);
                                }
                            }
                            animateTheHeartbeat(0);

                            new Audio("./letters/public/assets/sounds/mixkit-slow-heartbeat-494-trim.wav").play();

                            setTimeout(function() {
                                hideTheEffect();
                            }, 5750);

                            break;
                        case "spotlight":
                            document.querySelector("#spotlight-effect-button").style.background = "#5D3FD3";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\" id=\"spotlight-magic-effect\" style=\"background: radial-gradient(circle at " + (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").getBoundingClientRect().left + (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetWidth / 2)) + "px " + (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").getBoundingClientRect().top + (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetHeight / 2)) + "px, hsla(0, 0%, 0%, 0) " + function() { if (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetWidth >= document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetHeight) { return document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetWidth / 2; } else { return document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetHeight / 2; } }() + "px" + function() {
                                const colorStops = ["hsla(0, 0%, 0%, 0.011)", "hsla(0, 0%, 0%, 0.041)", "hsla(0, 0%, 0%, 0.088)", "hsla(0, 0%, 0%, 0.149)", "hsla(0, 0%, 0%, 0.22)", "hsla(0, 0%, 0%, 0.299)", "hsla(0, 0%, 0%, 0.383)", "hsla(0, 0%, 0%, 0.467)", "hsla(0, 0%, 0%, 0.551)", "hsla(0, 0%, 0%, 0.63)", "hsla(0, 0%, 0%, 0.701)", "hsla(0, 0%, 0%, 0.762)", "hsla(0, 0%, 0%, 0.809)", "hsla(0, 0%, 0%, 0.839)"];
                                let gradientDarkening = "";

                                for (let i = 0; i < colorStops.length; i++) {
                                    gradientDarkening += ", " + colorStops[i];
                                }

                                if (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetWidth >= document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetHeight) {
                                    return gradientDarkening + ", hsla(0, 0%, 0%, 0.85) " + (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetWidth / 2 + function() { if (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetWidth / 4 < 20) { return 20; } else { return document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetWidth / 4; } }()) + "px";
                                }
                                else {
                                    return gradientDarkening + ", hsla(0, 0%, 0%, 0.85) " + (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetHeight / 2 + function() { if (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetHeight / 4 < 20) { return 20; } else { return document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-is-selected=\"true\"]").offsetHeight / 4; } }()) + "px";
                                }
                            }() + "\"></div>");

                            // new Audio("./letters/public/assets/sounds/" + ["mixkit-female-long-laugh-426", "mixkit-females-laugh-425"][Math.floor(Math.random() * 2)] + ".wav").play();

                            setTimeout(function() {
                                hideTheEffect();
                            }, 3000);

                            break;
                        case "disco-lights":
                            document.querySelector("#disco-lights-effect-button").style.background = "#DE3163";

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-effect-name", effectName);
                            }

                            document.querySelector("#letters").insertAdjacentHTML("beforeend", "<div class=\"magic-effect\" id=\"disco-lights-effect\"></div>");

                            const discoLightColors = ["rgba(244, 67, 54, 0.5)", "rgba(255, 235, 59, 0.5)", "rgba(76, 175, 80, 0.5)", "rgba(3, 169, 244, 0.5)", "rgba(156, 39, 176, 0.5)", "rgba(233, 30, 99, 0.5)"];
                            const animateTheDiscoLights = function(animationDelayTime, discoLightColorIndex) {
                                setTimeout(function() {
                                    if (document.querySelector(".magic-effect").hasAttribute("style")) {
                                        document.querySelector(".magic-effect").removeAttribute("style");
                                    }
                                    else {
                                        document.querySelector(".magic-effect").style.background = discoLightColors[discoLightColorIndex];
                                    }
                                }, animationDelayTime);

                                if (animationDelayTime !== 3300) {
                                    animateTheDiscoLights(animationDelayTime + 300, discoLightColorIndex + 0.5);
                                }
                            }

                            setTimeout(function() {
                                animateTheDiscoLights(0, 0);
                            }, 300);

                            // new Audio("./letters/public/assets/sounds/mixkit-slow-heartbeat-494-trim.wav").play();

                            setTimeout(function() {
                                hideTheEffect();
                            }, 4200);
                    }
                }

                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-is-selected=\"true\"]").forEach(function(element) {
                    element.setAttribute("data-is-selected", "false");
                });
                for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]").length; i++) {
                    document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifier + "\"]")[i].setAttribute("data-is-selected", "true");
                }

                if (hasCreatedTheDocument) {
                    document.querySelector("#letters-toolbar").style.height = "100%";

                    if (document.querySelector("#magic-effects-options")) {
                        document.querySelector("#magic-effects-options").remove();
                    }
                    document.querySelector("#letters-toolbar").insertAdjacentHTML("beforeend", "<div id=\"magic-effects-options\"><div><button id=\"remove-effect-button\"" + function() {
                        if (!$(element).attr("data-effect-name")) {
                            return " style=\"background: #FA5F55;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Премахване на магическия ефект"; case "en": return "Remove Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/prohibition.png\"></button><button id=\"confetti-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "confetti") {
                            return " style=\"background: #FF69B4;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект с конфети"; case "en": return "Set Confetti Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/confetti.png\"></button><button id=\"hearts-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "hearts") {
                            return " style=\"background: #DC143C;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект със сърца"; case "en": return "Set Hearts Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/heart.png\"></button><button id=\"stars-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "stars") {
                            return " style=\"background: #FFA500;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект със звезди"; case "en": return "Set Stars Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/star.png\"></button></div><div><button id=\"fireworks-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "fireworks") {
                            return " style=\"background: #9F2B68;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект с фойеверки"; case "en": return "Set Fireworks Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/firework.png\"></button><button id=\"rain-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "rain") {
                            return " style=\"background: #0F52BA;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект с дъжд"; case "en": return "Set Rain Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/water-drop.png\"></button><button id=\"leaves-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "leaves") {
                            return " style=\"background: #EC5800;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект с листа"; case "en": return "Set Leaves Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/tree.png\"></button><button id=\"wind-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "wind") {
                            return " style=\"background: #C04000;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект с вятър"; case "en": return "Set Wind Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/leaves.png\"></button></div><div><button id=\"smoke-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "smoke") {
                            return " style=\"background: #CC5500;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект с пушек"; case "en": return "Set Smoke Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/fire.png\"></button><button id=\"heartbeat-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "heartbeat") {
                            return " style=\"background: #FF2400;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект със сърцебиене"; case "en": return "Set Heartbeat Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/heart-organ.png\"></button><button id=\"spotlight-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "spotlight") {
                            return " style=\"background: #5D3FD3;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект със светлина от прожектор"; case "en": return "Set Spotlight Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/bulb.png\"></button><button id=\"disco-lights-effect-button\"" + function() {
                        if ($(element).attr("data-effect-name") === "disco-lights") {
                            return " style=\"background: #DE3163;\"";
                        }
                        else { 
                            return "";
                        }
                    }() + "><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Задаване на магически ефект с диско светлини"; case "en": return "Set Disco Lights Magic Effect"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/music.png\"></button></div></div>");

                    sheetScrollBar.recalculate();

                    if (document.querySelector("html body").clientHeight <= 572) {
                        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
                            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "-1");
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

                    for (let i = 0; i < document.querySelectorAll("#magic-effects-options button").length; i++) {
                        document.querySelectorAll("#magic-effects-options button")[i].addEventListener("click", function() {
                            if (!document.querySelector(".magic-effect")) {
                                if ($(element).attr("data-effect-name") !== document.querySelectorAll("#magic-effects-options button")[i].getAttribute("id").slice(0, -14)) {
                                    hasUnsavedChanges = true;
                                    document.querySelector("#letters-home-and-save-button").dataset.hasUnsavedChanges = "true";
                                    document.querySelector("#letters-home-and-save-button img").setAttribute("alt", function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }());
                                }

                                for (let i = 0; i < document.querySelectorAll("#editor button, #editor input, #editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
                                    document.querySelectorAll("#editor button, #editor input, #editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "-1");
                                }
            
                                for (let i = 0; i < document.querySelectorAll("#magic-effects-options div button").length; i++) {
                                    document.querySelectorAll("#magic-effects-options div button")[i].removeAttribute("style");
                                }

                                showTheEffect(document.querySelectorAll("#magic-effects-options button")[i].getAttribute("id").slice(0, -14));

                                if (document.querySelector("html body").clientHeight <= 572) {
                                    document.querySelector("#letters-toolbar").removeAttribute("style");
                                    document.querySelector("#magic-effects-options").remove();
                                }
                            }
                        });
                    }
                }
                else {
                    $(element).blur();

                    showTheEffect($(element).attr("data-effect-name"));
                }
            }

            $(element).mouseover(function() {
                $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(this).attr("data-word-identifier") + "\"]"), function(element) {
                    $(element).css("opacity", "1");
                });
            });

            $(element).mouseout(function() {
                if ($(":focus").attr("data-word-identifier") !== $(this).attr("data-word-identifier")) {
                    $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(this).attr("data-word-identifier") + "\"]"), function(element) {
                        $(element).removeAttr("style");
                    });
                }
            });

            $(element).off("click");
            $(element).on("click", function() {
                if (document.querySelector("#letters-toolbar-buttons").childNodes.length === 2 || window.getComputedStyle(document.querySelector("#magic-effects-button"), null).opacity === "1" && window.getComputedStyle(document.querySelector("#letters-home-and-save-button"), null).opacity === "0.5") {
                    wrappedWordsClickEvent($(this).attr("data-word-identifier"));
                }
                else {
                    if (document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]")) {
                        imageRelocationEvent($("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex][data-word-identifier=\"" + $(this).attr("data-word-identifier") + "\"]"));
                    }
                }
            });

            $(element).off("keydown");
            $(element).on("keydown", function(event) {
                if (event.which === 13) {
                    if (document.querySelector("#letters-toolbar-buttons").childNodes.length === 2 || window.getComputedStyle(document.querySelector("#magic-effects-button"), null).opacity === "1" && window.getComputedStyle(document.querySelector("#letters-home-and-save-button"), null).opacity === "0.5") {
                        wrappedWordsClickEvent($(this).attr("data-word-identifier"));
                    }
                    else {
                        if (document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]")) {
                            event.preventDefault();

                            imageRelocationEvent($(this));
                        }
                    }
                }
            });

            $(element).focus(function() {
                $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(this).attr("data-word-identifier") + "\"]"), function(element) {
                    $(element).css("opacity", "1");
                });
            });

            $(element).blur(function() {
                if ($(":hover").attr("data-word-identifier") !== $(this).attr("data-word-identifier")) {
                    $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(this).attr("data-word-identifier") + "\"]"), function(element) {
                        $(element).removeAttr("style");
                    });
                }
            });
        });
    }
    const unwrapTheWords = function() {
        $.grep($("#editor-sheet div[contenteditable] .text-node-wrapper, #editor-sheet div[contenteditable] .white-spaces-wrapper"), function(element) {
            $(element).replaceWith($(element).contents());
        });

        $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper"), function(element) {
            if (!$(element).attr("data-effect-name")) {
                $(element).replaceWith($(element).contents());
            }
            else {
                $(element).removeAttr("style");
                $(element).attr("data-is-selected", "false");
                $(element).attr("data-original-word-piece", $(element).text());
                $(element).attr("data-full-word", function() { let word = ""; for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(element).attr("data-word-identifier") + "\"]").length; i++) { word += document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(element).attr("data-word-identifier") + "\"]")[i].innerText; } return word; }());
                $(element).attr("data-has-been-overwritten", "false");
            }
        });

        document.querySelector("#editor-sheet div[contenteditable]").normalize();
        document.querySelector("#editor-sheet div[contenteditable]").setAttribute("tabindex", "0");

        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "-1");
        }

        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] img").length; i++) {
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.removeProperty("animation");
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.opacity = "1";
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.removeProperty("transform");
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].dataset.isBeingRelocated = "false";
        }

        document.querySelector("#editor-sheet div[contenteditable]").dataset.hasTheWordsWrapped = "false";

        if (document.querySelector("#editor-sheet div[contenteditable]").dataset.isInMagicEffectsMode === "true") {
            document.querySelector("#editor-sheet div[contenteditable]").dataset.isInMagicEffectsMode = "false";

            saveStates[currentSaveStateIndex].HTML = document.querySelector("#editor-sheet div[contenteditable]").innerHTML;
            saveStates[currentSaveStateIndex].text = document.querySelector("#editor-sheet div[contenteditable]").innerText;
        }
    }

    const imageRelocationEvent = function(element) {
        if (!document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]")) {
            if (document.querySelector("#letters-toolbar-buttons + div") && !document.querySelector(".image-editing-options")) {
                document.querySelector("#letters-toolbar-buttons + div").remove();
            }

            for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "0.5";
            }

            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
            if (window.getSelection().toString().length) {
                if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                }
                else if (document.selection) {
                    document.selection.empty();
                }
            }
            wrapTheWords();
            document.querySelector("#editor-sheet div[contenteditable]").dataset.hasTheWordsWrapped = "true";

            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] img").length; i++) {
                document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.opacity = "0.5";
            }
            element.attr("data-is-being-relocated", "true");

            document.querySelector("#letters-toolbar").style.height = "100%";

            if (!document.querySelector(".image-editing-options")) {
                document.querySelector("#letters-toolbar").insertAdjacentHTML("beforeend", "<div class=\"image-editing-options transitionless\"><div><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Алтернативен текст"; case "en": return "Alternative Text"; } }() + "</label><input autocomplete=\"off\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"></div><div><input min=\"0\" max=\"64\" step=\"8\" type=\"range\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Промяна на размера на изображението"; case "en": return "Change Image Size"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/increase-size-option.png\"></div><div><input min=\"0\" max=\"200\" step=\"5\" type=\"range\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Промяна на яркостта на изображението"; case "en": return "Change Image Brightness"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/brightness.png\"></div><div><input min=\"0\" max=\"200\" step=\"5\" type=\"range\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Промяна на наситеността на изображението"; case "en": return "Change Image Saturation"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/saturation.png\"></div><div><button><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Готово"; case "en": return "Done"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/floppy-disk.png\"></button><button><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Изтриване"; case "en": return "Delete"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/trash-bin.png\"></button></div></div>");
                $("#letters-toolbar-buttons + div").ready(function() {
                    setTimeout(function() {
                        if (document.querySelector(".transitionless")) {
                            document.querySelector(".transitionless").classList.remove("transitionless");
                        }
                    }, 0);
                });

                sheetScrollBar.recalculate();

                document.querySelector(".image-editing-options div:nth-child(1) input").value = document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").getAttribute("alt");
                document.querySelector(".image-editing-options div:nth-child(1) input").addEventListener("input", function() {
                    document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").setAttribute("alt", document.querySelector(".image-editing-options div:nth-child(1) input").value);
                });

                document.querySelector(".image-editing-options div:nth-child(2) input").setAttribute("value", 64 - Number($(element).css("border-left-width").substring(0, $(element).css("border-left-width").length - 2)));
                document.querySelector(".image-editing-options div:nth-child(2) input").value = 64 - Number($(element).css("border-left-width").substring(0, $(element).css("border-left-width").length - 2));
                document.querySelector(".image-editing-options div:nth-child(2) input").addEventListener("input", function() {
                    document.querySelector(".image-editing-options div:nth-child(2) input").setAttribute("value", document.querySelector(".image-editing-options div:nth-child(2) input").value);
                    document.querySelector(".image-editing-options div:nth-child(2) input").value = document.querySelector(".image-editing-options div:nth-child(2) input").value;

                    $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").css("border-width", (64 - document.querySelector(".image-editing-options div:nth-child(2) input").value) + "px");
                    $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").css("clip-path", "inset(0px " + (64 - document.querySelector(".image-editing-options div:nth-child(2) input").value) + "px)");
                });

                const imageBrightness = function() { for (let i = 0; i < $(element).css("filter").split(")").length; i++ ) { if ($(element).css("filter").split(")")[i].includes("brightness")) { return Number($(element).css("filter").split(")")[i].replace("brightness(", "")) * 100; } } }();
                document.querySelector(".image-editing-options div:nth-child(3) input").setAttribute("value", imageBrightness);
                document.querySelector(".image-editing-options div:nth-child(3) input").value = imageBrightness;
                document.querySelector(".image-editing-options div:nth-child(3) input").addEventListener("input", function() {
                    document.querySelector(".image-editing-options div:nth-child(3) input").setAttribute("value", document.querySelector(".image-editing-options div:nth-child(3) input").value);
                    document.querySelector(".image-editing-options div:nth-child(3) input").value = document.querySelector(".image-editing-options div:nth-child(3) input").value;

                    $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").css("filter", "brightness(" + document.querySelector(".image-editing-options div:nth-child(3) input").value + "%) saturate(" + document.querySelector(".image-editing-options div:nth-child(4) input").value + "%)");
                });

                const imageSaturation = function() { for (let i = 0; i < $(element).css("filter").split(")").length; i++ ) { if ($(element).css("filter").split(")")[i].includes("saturate")) { return Number($(element).css("filter").split(")")[i].replace("saturate(", "")) * 100; } } }();
                document.querySelector(".image-editing-options div:nth-child(4) input").setAttribute("value", imageSaturation);
                document.querySelector(".image-editing-options div:nth-child(4) input").value = imageSaturation;
                document.querySelector(".image-editing-options div:nth-child(4) input").addEventListener("input", function() {
                    document.querySelector(".image-editing-options div:nth-child(4) input").setAttribute("value", document.querySelector(".image-editing-options div:nth-child(4) input").value);
                    document.querySelector(".image-editing-options div:nth-child(4) input").value = document.querySelector(".image-editing-options div:nth-child(4) input").value;

                    $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").css("filter", "brightness(" + document.querySelector(".image-editing-options div:nth-child(3) input").value + "%) saturate(" + document.querySelector(".image-editing-options div:nth-child(4) input").value + "%)");
                });

                document.querySelectorAll(".image-editing-options div:nth-child(5) button")[0].addEventListener("click", function() {
                    document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").click();
                });

                document.querySelectorAll(".image-editing-options div:nth-child(5) button")[1].addEventListener("click", function() {
                    document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").remove();

                    unwrapTheWords();

                    document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");

                    document.querySelector("#editor-sheet div[contenteditable]").focus();
                    setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                    document.querySelector("#letters-toolbar").removeAttribute("style");

                    document.querySelector("#letters-toolbar-buttons + div").remove();

                    for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                        document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "1";
                    }

                    sheetScrollBar.recalculate();

                    saveStates = saveStates.slice(0, currentSaveStateIndex + 1);
                    saveStates.push({ "HTML": document.querySelector("#editor-sheet div[contenteditable]").innerHTML, "text": document.querySelector("#editor-sheet div[contenteditable]").innerText, "caretPosition": lastCaretPosition, "hasFormattedTextOrPressedTheEnterKey": false });
                    currentSaveStateIndex++;

                    hasUnsavedChanges = true;
                    document.querySelector("#letters-home-and-save-button").dataset.hasUnsavedChanges = "true";
                    document.querySelector("#letters-home-and-save-button img").setAttribute("alt", function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }());
                });
            }
            else {
                document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").style.animation = "relocate-image 0.2s";
                document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").style.transform = "scale(0.85) translateZ(0px)";
            }
        }
        else {
            if (element.attr("data-is-being-relocated") !== "true") {
                const selectableElements = $("#editor-sheet div[contenteditable] img, #editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]");
                let indexOfTheImageToBeRelocated = null;
                for (let i = 0; i < selectableElements.length; i++) {
                    if ($("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").is(selectableElements[i])) {
                        indexOfTheImageToBeRelocated = i;

                        break;
                    }
                }

                const imageHTML = $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").prop("outerHTML");

                const imagesAndWrappedTextNodes = $("#editor-sheet div[contenteditable] img, #editor-sheet div[contenteditable] .word-piece-wrapper, #editor-sheet div[contenteditable] .white-spaces-wrapper");
                let caretPositionOfTheSelectedElement = 0;
                let caretPositionOfTheNextSelectableElement = 0;
                let hasReachedTheSelectedElement = false;
                let hasPassedTheSelectedElement = false;
                let indexOfAPrecedingImage = null;
                let indexOfAFollowingImage = null;
                for (let i = 0; i < imagesAndWrappedTextNodes.length; i++) {
                    if (hasReachedTheSelectedElement) {
                        if (hasPassedTheSelectedElement && (imagesAndWrappedTextNodes[i].tagName === "IMG" || imagesAndWrappedTextNodes[i].classList.contains("word-piece-wrapper"))) {
                            if (imagesAndWrappedTextNodes[i].tagName === "IMG") {
                                indexOfAFollowingImage = i;
                            }

                            break;
                        }

                        caretPositionOfTheNextSelectableElement += imagesAndWrappedTextNodes[i].innerText.length;
                    }

                    if (element.is(imagesAndWrappedTextNodes[i])) {
                        hasReachedTheSelectedElement = true;

                        caretPositionOfTheNextSelectableElement += caretPositionOfTheSelectedElement + imagesAndWrappedTextNodes[i].innerText.length;

                        if (i !== 0 && imagesAndWrappedTextNodes[i - 1].tagName === "IMG") {
                            indexOfAPrecedingImage = i - 1;
                        }

                        if (element.prop("tagName") === "IMG") {
                            break;
                        }
                    }

                    if (element.prop("tagName") !== "IMG" && imagesAndWrappedTextNodes[i] === document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + element.attr("data-word-identifier") + "\"]")[document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + element.attr("data-word-identifier") + "\"]").length - 1]) {
                        hasPassedTheSelectedElement = true;
                    }

                    if (!hasReachedTheSelectedElement) {
                        caretPositionOfTheSelectedElement += imagesAndWrappedTextNodes[i].innerText.length;
                    }
                }

                const setTheNewCaretPosition = function() {
                    if (indexOfTheImageToBeRelocated === selectableElements.length - 1 || !element.is(selectableElements[indexOfTheImageToBeRelocated + 1])) {
                        document.querySelector("#editor-sheet div[contenteditable]").focus();
                        setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), caretPositionOfTheSelectedElement);
                        getTheCaretPosition();
                    }
                    else {
                        document.querySelector("#editor-sheet div[contenteditable]").focus();
                        setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), caretPositionOfTheNextSelectableElement);
                        getTheCaretPosition();
                    }
                }

                const exitTheImageRelocationMode = function() {
                    unwrapTheWords();

                    document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");

                    setTheNewCaretPosition();
                }

                saveStates[currentSaveStateIndex].HTML = document.querySelector("#editor-sheet div[contenteditable]").innerHTML;
                saveStates[currentSaveStateIndex].text = document.querySelector("#editor-sheet div[contenteditable]").innerText;

                let relocatedImage = null;

                if (indexOfTheImageToBeRelocated === selectableElements.length - 1 || !element.is(selectableElements[indexOfTheImageToBeRelocated + 1])) {
                    if (element.prop("tagName") === "IMG" || indexOfAPrecedingImage !== null) {
                        if (element.prop("tagName") === "IMG") {
                            $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").insertBefore(element);
                        }
                        else {
                            $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").insertAfter(imagesAndWrappedTextNodes[indexOfAPrecedingImage]);
                        }

                        relocatedImage = document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]");

                        exitTheImageRelocationMode();
                    }
                    else {
                        const sheetScrollPosition = sheetScrollBar.getScrollElement().scrollTop;

                        $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").remove();

                        exitTheImageRelocationMode();

                        document.execCommand("insertHTML", false, imageHTML);

                        relocatedImage = document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]");

                        $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").css("opacity", "1");
                        $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").attr("data-is-being-relocated", "false");
                        positionTheImages();
                        addEventListenersToTheImages();

                        setTheNewCaretPosition();

                        sheetScrollBar.getScrollElement().scrollTop = sheetScrollPosition;
                    }
                }
                else {
                    if (element.prop("tagName") === "IMG" || indexOfAFollowingImage) {
                        if (element.prop("tagName") === "IMG") {
                            $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").insertAfter(element);
                        }
                        else {
                            $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").insertBefore(imagesAndWrappedTextNodes[indexOfAFollowingImage]);
                        }

                        relocatedImage = document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]");

                        exitTheImageRelocationMode();
                    }
                    else {
                        const sheetScrollPosition = sheetScrollBar.getScrollElement().scrollTop;

                        $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").remove();

                        exitTheImageRelocationMode();

                        document.execCommand("insertHTML", false, imageHTML);

                        relocatedImage = document.querySelector("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]");

                        $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").css("opacity", "1");
                        $("#editor-sheet div[contenteditable] img[data-is-being-relocated=\"true\"]").attr("data-is-being-relocated", "false");
                        positionTheImages();
                        addEventListenersToTheImages();

                        setTheNewCaretPosition();

                        sheetScrollBar.getScrollElement().scrollTop = sheetScrollPosition;
                    }
                }

                saveStates = saveStates.slice(0, currentSaveStateIndex + 1);
                saveStates.push({ "HTML": document.querySelector("#editor-sheet div[contenteditable]").innerHTML, "text": document.querySelector("#editor-sheet div[contenteditable]").innerText, "caretPosition": lastCaretPosition, "hasFormattedTextOrPressedTheEnterKey": function() { return event.keyCode === 13; }() });
                currentSaveStateIndex++;

                relocatedImage.click();
            }
            else {
                unwrapTheWords();

                document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");

                document.querySelector("#editor-sheet div[contenteditable]").focus();
                setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                if (document.querySelector("#letters-toolbar-buttons + div")) {
                    document.querySelector("#letters-toolbar").removeAttribute("style");

                    document.querySelector("#letters-toolbar-buttons + div").remove();
                }

                for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                    document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "1";
                }

                sheetScrollBar.recalculate();

                saveStates[currentSaveStateIndex].HTML = document.querySelector("#editor-sheet div[contenteditable]").innerHTML;
                saveStates[currentSaveStateIndex].text = document.querySelector("#editor-sheet div[contenteditable]").innerText;
            }
        }
    }

    const addEventListenersToTheImages = function() {
        $.grep($("#editor-sheet div[contenteditable] img"), function(element) {
            ["click", "keydown"].forEach(function(eventListener) {
                $(element).off(eventListener);
                $(element).on(eventListener, function(event) {
                    if (eventListener === "click") {
                        imageRelocationEvent($(this));
                        $(element).blur();
                    }
                    else {
                        if (event.which === 13) {
                            event.preventDefault();

                            imageRelocationEvent($(this));
                        }
                    }
                });
            });
        });
    }

    document.querySelector("#documents").insertAdjacentHTML("afterend", "<div id=\"editor\"><div id=\"letters-toolbar\"><div id=\"letters-toolbar-buttons\"><button id=\"letters-home-and-save-button\" data-has-unsaved-changes=\"false\" tabindex=\"-1\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Начало"; case "en": return "Home"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/home-and-save.jpg\"></button>" + function() {  if (!hasCreatedTheDocument) { return "<button id=\"delete-shared-document-button\" tabindex=\"-1\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Изтриване"; case "en": return "Delete"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/delete.jpg\"></button>"; } else { return "<button id=\"format-text-button\" tabindex=\"-1\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Форматиране"; case "en": return "Format"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/format-text.jpg\"></button><button id=\"upload-media-button\" tabindex=\"-1\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Добавяне на изображение"; case "en": return "Add an Image"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/upload-media.jpg\"></button><input accept=\"image/png, image/jpeg\" type=\"file\"><button id=\"magic-effects-button\" tabindex=\"-1\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Магически ефекти"; case "en": return "Magic Effects"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/magic-effects.jpg\"></button><button id=\"document-settings-and-details-button\" tabindex=\"-1\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Настройки"; case "en": return "Settings"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/settings.jpg\"></button>"; } }() + "</div></div><div id=\"editor-sheet-container\"><div id=\"editor-sheet\"><div contenteditable=\"false\"" + function() { if (hasCreatedTheDocument) { return " data-has-the-words-wrapped=\"false\" data-is-in-magic-effects-mode=\"false\" data-is-in-read-only-mode=\"false\" spellcheck=\"false\" tabindex=\"-1\""; } else { return " data-is-in-read-only-mode=\"true\""; } }() + " translate=\"no\">" + content + "</div></div></div></div>");
    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] img").length; i++) {
        document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].addEventListener("load", function() {
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.maxWidth = function() { if (document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].naturalHeight > document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].naturalWidth) { return document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].naturalWidth * (384 / document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].naturalHeight); } else { return "384"; } }() + "px";
        });
        document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.clipPath = "inset(0px " + window.getComputedStyle(document.querySelectorAll("#editor-sheet div[contenteditable] img")[i], null).borderLeftWidth + "px)";
    }
    positionTheImages();
    if (hasCreatedTheDocument) {
        if ($("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] *").contents().filter(function() { return this.nodeType === 3 && $(this).text().replaceAll(" ", "").replaceAll(" ", ""); }).length) {
            document.querySelector("#magic-effects-button").disabled = false;
        }
        else {
            document.querySelector("#magic-effects-button").disabled = true;
        }
        addEventListenersToTheImages();
    }
    else {
        wrapTheWords();

        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].setAttribute("tabindex", "-1");
        }

        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper").length; i++) {
            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].removeAttribute("data-original-word-piece");
            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].removeAttribute("data-full-word");
            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].removeAttribute("data-has-been-overwritten");
        }

        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] img").length; i++) {
            document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].removeAttribute("data-is-being-relocated");
        }
    }

    document.querySelector("#letters-toolbar-buttons").addEventListener("mousedown", function(event) {
        if (document.activeElement.hasAttribute("contenteditable")) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    const sheetScrollBar = new SimpleBar(document.querySelector("#editor-sheet-container"));
    sheetScrollBar.getScrollElement().addEventListener("scroll", function() {
        if (document.querySelector("#context-menu")) {
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
    document.querySelector("#editor-sheet-container .simplebar-content-wrapper").setAttribute("tabindex", "-1");
    document.querySelector("#letters").dataset.hasAScrollAnimationInProgress = "true";
    document.querySelector("#editor").scrollIntoView({ "behavior": "smooth" });

    let scrollAnimationProgress = null;

    const checkTheScrollAnimationProgress = setInterval(function() {
        if (scrollAnimationProgress === document.querySelector("#letters").scrollTop) {
            document.querySelector("#editor").scrollIntoView({ "behavior": "smooth" });
        }

        scrollAnimationProgress = document.querySelector("#letters").scrollTop;

        if (document.querySelector("#letters").scrollTop === document.querySelector("#letters").scrollHeight - document.querySelector("#letters").clientHeight - function() { if (document.querySelector("html body").clientHeight <= 572 || document.querySelector("html body").clientWidth <= 1366) { return 60; } else { return 0; } }()) {
            clearInterval(checkTheScrollAnimationProgress);

            document.querySelector("#documents").remove();
            document.querySelector("#letters").dataset.hasAScrollAnimationInProgress = "false";

            hideTheLoadingScreen();

            if (!hasCreatedTheDocument) {
                document.querySelector("#loading-screen .blur").style.background = "none";
                document.querySelector("#loading-screen .blur").style.backdropFilter = "none";
                hideTheApplication();
                document.querySelector("#curtain .blur").style.animationDuration = "0s";

                document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><div class=\"profile-photo-header\" style=\"border-bottom: 1px solid #CCCCCC\"><img alt=\"\" draggable=\"false\" src=\"" + function() { if (!creatorProfilePhoto) { return "./public/assets/images/user.jpg"; } else { return creatorProfilePhoto; } }() + "\"></div><p style=\"margin-top: 16px;\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Този документ е споделен от <span style=\"font-style: italic;\">" + creatorName + "</span>. Можете да го прочетете по всяко време, но не можете да правите промени в него."; case "en": return "This document has been shared by <span style=\"font-style: italic;\">" + creatorName + "</span>. You can read it anytime but cannot make any changes to it."; } }() + "</p><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Напред"; case "en": return "Continue"; } }() + "</button></div>");

                document.querySelector("#containers div button").addEventListener("click", function() {
                    showTheApplication();

                    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
                        document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "0");
                    }
                });
            }
            else {
                document.querySelector("html body").style.overflowX = "auto";
                document.querySelector("html body").style.overflowY = "auto";
                document.querySelector("#letters").style.overflow = "auto";
            }

            setTimeout(function() {
                document.addEventListener("contextmenu", function(event) {
                    if (document.querySelector("#editor") && (event.target.hasAttribute("contenteditable") || document.querySelector("#editor-sheet div[contenteditable]").contains(event.target)) && event.clientY < document.querySelector("html body").clientHeight - function() { if (document.querySelector("html body").clientWidth <= 1366) { return document.querySelector("#letters-toolbar").clientHeight; } else { return 0; } }()) {
                        event.preventDefault();

                        document.querySelector("#editor").style.pointerEvents = "none";
                        for (let i = 0; i < document.querySelectorAll("#editor button, #editor input, #editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                            document.querySelectorAll("#editor button, #editor input, #editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                        }
                        if (document.activeElement.tagName === "IMG") {
                            document.activeElement.blur();
                        }

                        if (document.querySelector("#context-menu")) {
                            document.querySelector("#context-menu").remove();
                        }
                        document.querySelector("#editor-sheet").insertAdjacentHTML("beforeend", "<div id=\"context-menu\" style=\"left: " + function() { if (document.querySelector("#letters").scrollLeft + event.clientX + 160 > document.querySelector("#letters").scrollWidth) { if (document.querySelector("#letters").scrollLeft + event.clientX > 160) { return document.querySelector("#letters").scrollLeft + event.clientX - 160; } else { return document.querySelector("#letters").scrollLeft + event.clientX - (document.querySelector("#letters").scrollLeft + event.clientX + 160 - document.querySelector("#letters").scrollWidth); } } else { return document.querySelector("#letters").scrollLeft + event.clientX; } }() + "px; top: " + function() { if (event.clientY + 228 > document.querySelector("#letters").clientHeight - function() { if (document.querySelector("html body").clientWidth <= 1366) { return document.querySelector("#letters-toolbar").clientHeight; } else { return 0; } }()) { return function() { if (document.querySelector("html body").clientWidth <= 1366) { return sheetScrollBar.getScrollElement().scrollTop; } else { return 0; } }() + event.clientY - 228; } else { return function() { if (document.querySelector("html body").clientWidth <= 1366) { return sheetScrollBar.getScrollElement().scrollTop; } else { return 0; } }() + event.clientY; } }() + "px;\"><button id=\"context-menu-cut-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Изрязване"; case "en": return "Cut"; } }() + "</button><button id=\"context-menu-copy-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Копиране"; case "en": return "Copy"; } }() + "</button><button id=\"context-menu-delete-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Изтриване"; case "en": return "Delete"; } }() + "</button><button id=\"context-menu-indent-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отстъп"; case "en": return "Indent"; } }() + "</button><button id=\"context-menu-print-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Принтиране"; case "en": return "Print"; } }() + "</button></div>");
                        document.querySelector("#context-menu").addEventListener("mousedown", function(event) {
                            event.preventDefault();
                            event.stopPropagation();
                        });
                        if (!window.getSelection().toString().length || document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "false") {
                            document.querySelector("#context-menu-cut-button").disabled = true;
                            document.querySelector("#context-menu-copy-button").disabled = true;
                            document.querySelector("#context-menu-delete-button").disabled = true;
                        }
                        else {
                            document.querySelector("#context-menu-indent-button").disabled = true;
                        }
                        if (event.target.tagName === "IMG" || document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "false") {
                            document.querySelector("#context-menu-indent-button").disabled = true;
                        }
                        document.querySelector("#context-menu-cut-button").addEventListener("click", function() {
                            document.execCommand("cut", false, null);
                        });
                        document.querySelector("#context-menu-copy-button").addEventListener("click", function() {
                            document.execCommand("copy", false, null);
                        });
                        document.querySelector("#context-menu-delete-button").addEventListener("click", function() {
                            document.execCommand("delete", false, null);
                        });
                        document.querySelector("#context-menu-indent-button").addEventListener("click", function() {
                            document.execCommand("insertHTML", false, "&emsp;");
                        });
                        document.querySelector("#context-menu-print-button").addEventListener("click", function() {
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
                            window.print();
                        });
                    }
                    else {
                        if (document.querySelector("#context-menu")) {
                            if (event.target === document.querySelector("#context-menu") || event.target.parentNode === document.querySelector("#context-menu")) {
                                event.preventDefault();

                                if (event.target.parentNode === document.querySelector("#context-menu")) {
                                    event.target.click();
                                }
                            }
                            else {
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

                                if (document.querySelector("#letters-toolbar-buttons") && event.target !== document.querySelector("#letters-toolbar-buttons") && !document.querySelector("#letters-toolbar-buttons").contains(event.target) && (!document.querySelector("#letters-toolbar-buttons + div") || event.target !== document.querySelector("#letters-toolbar-buttons + div") && !document.querySelector("#letters-toolbar-buttons + div").contains(event.target)) && document.querySelector("#text-formatting-options")) {
                                    document.querySelector("#format-text-button").click();
                                }
                            }
                        }
                        else {
                            if (document.querySelector("#letters-toolbar-buttons") && event.target !== document.querySelector("#letters-toolbar-buttons") && !document.querySelector("#letters-toolbar-buttons").contains(event.target) && (!document.querySelector("#letters-toolbar-buttons + div") || event.target !== document.querySelector("#letters-toolbar-buttons + div") && !document.querySelector("#letters-toolbar-buttons + div").contains(event.target)) && document.querySelector("#text-formatting-options")) {
                                document.querySelector("#format-text-button").click();
                            }
                        }
                    }
                });

                document.querySelector("#letters-home-and-save-button").addEventListener("click", function() {
                    if (!hasCreatedTheDocument) {
                        if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
                            document.querySelector("html body").style.overflowX = "scroll";
                        }
                        document.querySelector("#letters").style.overflow = "hidden";

                        if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
                            document.querySelector("html body").style.overflowX = "scroll";
                        }
                        document.querySelector("#letters").style.overflow = "hidden";

                        showTheLoadingScreen();

                        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
                            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "-1");
                        }

                        if (document.querySelector("#letters-toolbar-buttons + div")) {
                            document.querySelector("#letters-toolbar").removeAttribute("style");

                            document.querySelector("#letters-toolbar-buttons + div").remove();

                            sheetScrollBar.recalculate();
                        }

                        for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                            document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "1";
                        }

                        setTimeout(function() {
                            exitTheEditor();
                        }, 1000);
                    }
                    else {
                        if (document.querySelector("#update-document-cover-menu")) {
                            document.querySelector("#update-document-cover-menu").remove();
                        }

                        if (document.querySelector(".friends-list")) {
                            document.querySelector(".friends-list").remove();
                        }

                        if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
                            document.querySelector("html body").style.overflowX = "scroll";
                        }
                        document.querySelector("#letters").style.overflow = "hidden";

                        showTheLoadingScreen();

                        if (document.querySelector("#letters-toolbar-buttons + div")) {
                            document.querySelector("#letters-toolbar").removeAttribute("style");

                            document.querySelector("#letters-toolbar-buttons + div").remove();

                            sheetScrollBar.recalculate();
                        }

                        for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                            document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "1";
                        }

                        if (document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "false") {
                            unwrapTheWords();
                        }

                        document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                            document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                        }

                        const data = new FormData();
                        data.append("documentName", name);
                        data.append("friendsToHaveAccess", friendsWithSharedAccess);
                        data.append("hasACustomCover", hasACustomCover);
                        data.append("toBeDeleted", null);

                        if (!hasACustomCover) {
                            setTimeout(function() {
                                domtoimage.toJpeg(document.querySelector("#editor-sheet div[contenteditable]"), { "height": 905, "style": { "borderRadius": "0px" } }).then(function(dataURL) {
                                    const sheetImage = new File([createABlobFromADataURL(dataURL, "image/jpeg")], "editor-sheet.jpg", { "type": "image/jpeg" });

                                    const fileReader = new FileReader();
                                    fileReader.readAsDataURL(sheetImage);
                                    fileReader.addEventListener("load", function() {
                                        let coverToBeSet = document.createElement("img");
                                        coverToBeSet.setAttribute("src", dataURL);
                                        coverToBeSet.addEventListener("load", function() {
                                            const imageResizingCanvas = document.createElement("canvas");
                                            const imageResizingCanvasContext = imageResizingCanvas.getContext("2d");

                                            if (coverToBeSet.height > coverToBeSet.width) {
                                                imageResizingCanvas.setAttribute("height", 512);
                                                imageResizingCanvas.setAttribute("width", coverToBeSet.width * (512 / 905));
                                            }
                                            else {
                                                imageResizingCanvas.setAttribute("height", 905 * (512 / coverToBeSet.width));
                                                imageResizingCanvas.setAttribute("width", 512);
                                            }
                                            imageResizingCanvasContext.drawImage(coverToBeSet, 0, 0, imageResizingCanvas.getAttribute("width"), imageResizingCanvas.getAttribute("height"));

                                            data.append("cover", new File([createABlobFromADataURL(imageResizingCanvas.toDataURL("image/jpeg"), "image/jpeg")], "cover.jpg", { "type": "image/jpeg" }));

                                            saveTheDocument(data, imageResizingCanvas.toDataURL("image/jpeg"));
                                        });
                                    });
                                });
                            }, 200);
                        }
                        else {
                            data.append("cover", new File([createABlobFromADataURL(cover, "image/jpeg")], "cover.jpg", { "type": "image/jpeg" }));

                            saveTheDocument(data, cover);
                        }
                    }
                });

                if (hasCreatedTheDocument) {
                    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] img").length; i++) {
                        document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                    }

                    const separateWhiteSpacesFromAWrappedWord = function(element) {
                        let textNodeToBeInsertedBeforeTheWord = document.createTextNode("");
                        let textNodeToBeInsertedAfterTheWord = document.createTextNode("");
                        for (let i = 0; i < element.text().length; i++) {
                            if (element.text()[i] === " " || element.text()[i] === " ") {
                                if (i && (element.text()[i - 1] !== " " && element.text()[i] !== " " || textNodeToBeInsertedAfterTheWord.textContent)) {
                                    textNodeToBeInsertedAfterTheWord.textContent += element.text()[i];
                                }
                                else {
                                    textNodeToBeInsertedBeforeTheWord.textContent += element.text()[i];
                                }
                            }
                        }

                        getTheCaretPosition();

                        $(textNodeToBeInsertedBeforeTheWord).insertBefore(element);
                        $(textNodeToBeInsertedAfterTheWord).insertAfter(element);

                        [element, element.find("*")].forEach(function(selector) {
                            $.grep(selector.contents().filter(function() { return this.nodeType === 3; }), function(node) {
                                $(node)[0].textContent = $(node).text().replaceAll(" ", "").replaceAll(" ", "");
                            });
                        });

                        setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);
                    }

                    const showFormattingChanges = function() {
                        if (document.queryCommandValue("fontName")) {
                            ["bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "subscript", "superscript"].forEach(function(formattingOption) {
                                if (document.queryCommandState(formattingOption)) {
                                    document.querySelector("#" + formattingOption + "-text-button").style.background = "#4A4688";
                                    document.querySelector("#" + formattingOption + "-text-button img").style.color = "#FFFFFF";
                                    document.querySelector("#" + formattingOption + "-text-button img").style.filter = "brightness(0%) invert(1)";
                                }
                                else {
                                    document.querySelector("#" + formattingOption + "-text-button").removeAttribute("style");
                                    document.querySelector("#" + formattingOption + "-text-button img").style.color = "#272727";
                                    document.querySelector("#" + formattingOption + "-text-button img").style.filter = "none";
                                }
                            });

                            if (document.queryCommandValue("foreColor").length !== 7) {
                                ["rgb(255, 59, 20)", "rgb(255, 120, 32)", "rgb(255, 171, 0)", "rgb(123, 180, 44)", "rgb(75, 59, 255)", "rgb(151, 63, 241)", "rgb(255, 100, 127)", "rgb(39, 39, 39)"].forEach(function(rgbCode) {
                                    if (document.queryCommandValue("foreColor") === rgbCode) {
                                        document.querySelector(".color-text-button[data-rgb-code=\"" + rgbCode + "\"] img").style.top = "0px";
                                    }
                                    else {
                                        document.querySelector(".color-text-button[data-rgb-code=\"" + rgbCode + "\"] img").removeAttribute("style");
                                    }
                                });
                            }
                            else {
                                ["#FF3B14", "#FF7820", "#FFAB00", "#7BB42C", "#4B3BFF", "#973FF1", "#FF647F", "#272727"].forEach(function(hexCode) {
                                    if (document.queryCommandValue("foreColor") === hexCode) {
                                        document.querySelector(".color-text-button[data-hex-code=\"" + hexCode + "\"] img").style.top = "0px";
                                    }
                                    else {
                                        document.querySelector(".color-text-button[data-hex-code=\"" + hexCode + "\"] img").removeAttribute("style");
                                    }
                                });
                            }

                            document.querySelector("#font-size-control").setAttribute("value", document.queryCommandValue("fontSize"));
                            document.querySelector("#font-size-control").value = document.queryCommandValue("fontSize");

                            ["Jost", "Besley"].forEach(function(fontName) {
                                if (document.queryCommandValue("fontName").replaceAll("\"", "") === fontName) {
                                    document.querySelector(".font-change-button[data-font-name=\"" + fontName + "\"]").style.background = "#4A4688";
                                    document.querySelector(".font-change-button[data-font-name=\"" + fontName + "\"] span").style.color = "#FFFFFF";
                                }
                                else {
                                    document.querySelector(".font-change-button[data-font-name=\"" + fontName + "\"]").removeAttribute("style");
                                    document.querySelector(".font-change-button[data-font-name=\"" + fontName + "\"] span").style.color = "#272727";
                                }
                            });
                        }
                    }

                    document.querySelector("#editor-sheet div[contenteditable]").addEventListener("paste", function(event) {
                        event.preventDefault();

                        document.execCommand("insertText", false, event.clipboardData.getData("text/plain").replace(/(?:\\[rn]|[\r\n]+)+/g, "\n\n"));

                        scrollToTheCaret();
                    });

                    ["focus", "mouseup", "input", "keydown", "keyup"].forEach(function(eventListener) {
                        document.querySelector("#editor-sheet div[contenteditable]").addEventListener(eventListener, function(event) {
                            if (eventListener === "keydown" && document.querySelector("#context-menu")) {
                                event.preventDefault();
                            }
                            else {
                                if (document.querySelector("#text-formatting-options") && document.queryCommandState) {
                                    showFormattingChanges();
                                }
                            }

                            if (eventListener === "mouseup" || eventListener === "keydown" || eventListener === "keyup") {
                                getTheCaretPosition();
                            }

                            if (eventListener === "keydown") {
                                if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) {
                                    if (document.querySelector("#letters-home-and-save-button[tabindex=\"0\"]")) {
                                        document.querySelector("#letters-home-and-save-button[tabindex=\"0\"]").click();
                                    }
                                }
                                if ((event.ctrlKey || event.metaKey && !event.shiftKey) && event.keyCode === 90) {
                                    if (!document.querySelector("#context-menu") && document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "true") {
                                        if (currentSaveStateIndex) {
                                            document.querySelector("#editor-sheet div[contenteditable]").innerHTML = saveStates[currentSaveStateIndex - 1].HTML;
                                            setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), function() { if (saveStates[currentSaveStateIndex - 1].hasFormattedTextOrPressedTheEnterKey) { return lastCaretPosition; } else { return saveStates[currentSaveStateIndex - 1].caretPosition; } }());
                                            getTheCaretPosition();

                                            currentSaveStateIndex--;

                                            document.querySelector("#editor-sheet div[contenteditable]").classList.add("transitionless");
                                            setTimeout(function() {
                                                if (document.querySelector(".transitionless")) {
                                                    document.querySelector(".transitionless").classList.remove("transitionless");
                                                }
                                            }, 0);

                                            if ($("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] *").contents().filter(function() { return this.nodeType === 3 && $(this).text().replaceAll(" ", "").replaceAll(" ", ""); }).length) {
                                                document.querySelector("#magic-effects-button").disabled = false;
                                            }
                                            else {
                                                document.querySelector("#magic-effects-button").disabled = true;
                                            }
                                            positionTheImages();
                                            addEventListenersToTheImages();

                                            hasUnsavedChanges = true;
                                            document.querySelector("#letters-home-and-save-button").dataset.hasUnsavedChanges = "true";
                                            document.querySelector("#letters-home-and-save-button img").setAttribute("alt", function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }());
                                        }
                                    }
                                }
                                if (event.ctrlKey && event.keyCode === 89 || event.metaKey && event.shiftKey && event.keyCode === 90) {
                                    if (!document.querySelector("#context-menu") && document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "true") {
                                        if (currentSaveStateIndex !== saveStates.length - 1) {
                                            document.querySelector("#editor-sheet div[contenteditable]").innerHTML = saveStates[currentSaveStateIndex + 1].HTML;
                                            setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), function() { if (saveStates[currentSaveStateIndex + 1].hasFormattedTextOrPressedTheEnterKey) { return lastCaretPosition; } else { return saveStates[currentSaveStateIndex + 1].caretPosition; } }());
                                            getTheCaretPosition();

                                            currentSaveStateIndex++;

                                            document.querySelector("#editor-sheet div[contenteditable]").classList.add("transitionless");
                                            setTimeout(function() {
                                                if (document.querySelector(".transitionless")) {
                                                    document.querySelector(".transitionless").classList.remove("transitionless");
                                                }
                                            }, 0);

                                            if ($("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] *").contents().filter(function() { return this.nodeType === 3 && $(this).text().replaceAll(" ", "").replaceAll(" ", ""); }).length) {
                                                document.querySelector("#magic-effects-button").disabled = false;
                                            }
                                            else {
                                                document.querySelector("#magic-effects-button").disabled = true;
                                            }
                                            positionTheImages();
                                            addEventListenersToTheImages();

                                            hasUnsavedChanges = true;
                                            document.querySelector("#letters-home-and-save-button").dataset.hasUnsavedChanges = "true";
                                            document.querySelector("#letters-home-and-save-button img").setAttribute("alt", function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }());
                                        }
                                    }
                                }
                            }

                            if (eventListener === "keyup") {
                                if (document.querySelector("#editor-sheet div[contenteditable]").innerText !== saveStates[currentSaveStateIndex].text) {
                                    $.grep($("#editor-sheet div[contenteditable] span[style]"), function(element) {
                                        if ($(element)[0].style.caretColor) {
                                            if ($(element).closest("div").contents().length === 1) {
                                                $(element).closest("div").html($(element).html());
                                            }
                                            else {
                                                $(element).replaceWith("<div>" + $(element).html() + "</div>");
                                            }
                                        }
                                    });

                                    const range = document.createRange();
                                    range.setStart(window.getSelection().focusNode, window.getSelection().focusOffset);
                                    range.collapse(true);

                                    window.getSelection().removeAllRanges();
                                    window.getSelection().addRange(range);

                                    saveStates = saveStates.slice(0, currentSaveStateIndex + 1);
                                    saveStates.push({ "HTML": document.querySelector("#editor-sheet div[contenteditable]").innerHTML, "text": document.querySelector("#editor-sheet div[contenteditable]").innerText, "caretPosition": lastCaretPosition, "hasFormattedTextOrPressedTheEnterKey": function() { return event.keyCode === 13; }() });
                                    currentSaveStateIndex++;
                                }
                            }

                            if (eventListener === "input") {
                                $.grep($("#editor-sheet div[contenteditable] .word-piece-wrapper"), function(element) {
                                    if (!document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(element).attr("data-word-identifier") + "\"][data-has-been-overwritten=\"true\"]")) {
                                        if ($(element).text() !== $(element).attr("data-original-word-piece")) {
                                            if ($(element).text().includes($(element).attr("data-original-word-piece")) && !$(element).text().replace($(element).attr("data-original-word-piece"), "").replaceAll(" ", "").replaceAll(" ", "") && ($(element).is(document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(element).attr("data-word-identifier") + "\"]")[0]) && ($(element).text()[0] === " " || $(element).text()[0] === " ") || $(element).is(document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(element).attr("data-word-identifier") + "\"]")[document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + $(element).attr("data-word-identifier") + "\"]").length - 1]) && ($(element).text()[$(element).text().length - 1] === " " || $(element).text()[$(element).text().length - 1] === " "))) {
                                                separateWhiteSpacesFromAWrappedWord($(element));
                                            }
                                            else {
                                                $(element).attr("data-has-been-overwritten", "true");
                                            }
                                        }
                                    }
                                    else {
                                        $(element).attr("data-has-been-overwritten", "true");
                                    }
                                });

                                for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper").length; i++) {
                                    if (document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].querySelector("img")) {
                                        document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].dataset.hasBeenOverwritten = "true";
                                    }
                                }

                                let previousWordIdentifier = null;
                                let word = "";
                                for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper").length; i++) {
                                    if (previousWordIdentifier && previousWordIdentifier !== document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].dataset.wordIdentifier) {
                                        if (document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i - 1].dataset.fullWord !== word) {
                                            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i - 1].dataset.hasBeenOverwritten = "true";
                                        }

                                        word = "";
                                    }

                                    word += document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].textContent;
                                    if (i === document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper").length - 1) {
                                        if (document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].dataset.fullWord !== word) {
                                            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].dataset.hasBeenOverwritten = "true";
                                        }
                                    }

                                    previousWordIdentifier = document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].dataset.wordIdentifier;
                                }

                                const findOverwrittenWords = function() {
                                    const wordIdentifiers = [];
                                    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper").length; i++) {
                                        if (!wordIdentifiers.includes(document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].dataset.wordIdentifier)) {
                                            wordIdentifiers.push(document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].dataset.wordIdentifier);
                                        }
                                    }
                                    for (let i = 0; i < wordIdentifiers.length; i++) {
                                        if (document.querySelector("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifiers[i] + "\"][data-has-been-overwritten=\"true\"]")) {
                                            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[data-word-identifier=\"" + wordIdentifiers[i] + "\"][data-has-been-overwritten=\"false\"]").forEach(function(element) {
                                                element.dataset.hasBeenOverwritten = "true";
                                            });
                                        }
                                    }
                                }
                                findOverwrittenWords();

                                const documentContent = document.createElement("div");
                                documentContent.innerHTML = document.querySelector("#editor-sheet div[contenteditable]").innerHTML;
                                $.grep($(documentContent).find(".word-piece-wrapper[data-has-been-overwritten=\"true\"]"), function(element) {
                                    $(element).replaceWith($(element).contents());
                                });
                                [$(documentContent), $(documentContent).find("*")].forEach(function(selector) {
                                    $.grep(selector.contents().filter(function() { return this.nodeType === 3; }), function(node) {
                                        $(node).replaceWith("<span class=\"text-node-wrapper\">" + $(node).text() + "</span>");
                                    });
                                });
                                $.grep($(documentContent).find(".text-node-wrapper"), function(element) {
                                    if ($(element).closest(".word-piece-wrapper").length) {
                                        $(element).replaceWith($(element).contents());
                                    }
                                });
                                for (let i = 0; i < documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper").length; i++) {
                                    if (documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].classList.contains("word-piece-wrapper")) {
                                        if (i !== documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper").length - 1 && (documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].classList.contains("text-node-wrapper") && $(documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i]).closest("div").is($(documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1]).closest("div")) && documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].textContent[0] !== " " && documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].textContent[0] !== " " || documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].classList.contains("word-piece-wrapper") && (documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].dataset.wordIdentifier !== documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].dataset.wordIdentifier && $(documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i]).closest("div").is($(documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1]).closest("div")) || documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].dataset.wordIdentifier === documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].dataset.wordIdentifier && !$(documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i]).closest("div").is($(documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1]).closest("div"))) || documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].tagName === "IMG" && documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i] !== documentContent.querySelectorAll(".word-piece-wrapper[data-word-identifier=\"" + documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].dataset.wordIdentifier + "\"]")[documentContent.querySelectorAll(".word-piece-wrapper[data-word-identifier=\"" + documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].dataset.wordIdentifier + "\"]").length - 1])) {
                                            documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].dataset.hasBeenOverwritten = "true";
                                            if (documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].classList.contains("word-piece-wrapper")) {
                                                documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].dataset.hasBeenOverwritten = "true";
                                            }
                                        }
                                    }
                                    else {
                                        if (i !== documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper").length - 1 && documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].classList.contains("word-piece-wrapper") && (documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].classList.contains("text-node-wrapper") && $(documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i]).closest("div").is($(documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1]).closest("div")) && documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].textContent[documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].textContent.length - 1] !== " " && documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].textContent[documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].textContent.length - 1] !== " " || documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i].tagName === "IMG" && documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1] !== documentContent.querySelectorAll(".word-piece-wrapper[data-word-identifier=\"" + documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].dataset.wordIdentifier + "\"]")[0])) {
                                            documentContent.querySelectorAll(".text-node-wrapper, img, .word-piece-wrapper")[i + 1].dataset.hasBeenOverwritten = "true";
                                        }
                                    }
                                }
                                for (let i = 0; i < documentContent.querySelectorAll(".word-piece-wrapper").length; i++) {
                                    if (documentContent.querySelectorAll(".word-piece-wrapper")[i].dataset.hasBeenOverwritten === "true") {
                                        document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper")[i].dataset.hasBeenOverwritten = "true";
                                    }
                                }

                                findOverwrittenWords();

                                if ($("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] *").contents().filter(function() { return this.nodeType === 3 && $(this).text().replaceAll(" ", "").replaceAll(" ", ""); }).length) {
                                    document.querySelector("#magic-effects-button").disabled = false;
                                }
                                else {
                                    document.querySelector("#magic-effects-button").disabled = true;
                                }

                                hasUnsavedChanges = true;
                                document.querySelector("#letters-home-and-save-button").dataset.hasUnsavedChanges = "true";
                                document.querySelector("#letters-home-and-save-button img").setAttribute("alt", function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }());
                            }
                        });
                    });

                    document.querySelector("#editor-sheet div[contenteditable]").addEventListener("mousedown", function(event) {
                        if (document.querySelector("#context-menu")) {
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

                        getTheCaretPosition();
                    });

                    document.querySelector("#editor-sheet div[contenteditable]").addEventListener("dragstart", function(event) {
                        event.preventDefault();
                    });
                    $("#editor-sheet div[contenteditable]").bind("dragover drop", function(event) {
                        event.preventDefault();
                        return false;
                    });

                    document.querySelector("#format-text-button").addEventListener("click", function() {
                        if (document.querySelector("#update-document-cover-menu")) {
                            document.querySelector("#update-document-cover-menu").remove();
                        }

                        if (document.querySelector(".friends-list")) {
                            document.querySelector(".friends-list").remove();
                        }

                        if (document.querySelector("#text-formatting-options")) {
                            document.querySelector("#letters-toolbar").removeAttribute("style");

                            document.querySelector("#text-formatting-options").remove();

                            sheetScrollBar.recalculate();

                            for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                                document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "1";
                            }
                        }
                        else {
                            document.querySelector("#letters-toolbar").style.height = "100%";

                            if (document.querySelector("#letters-toolbar-buttons + div")) {
                                document.querySelector("#letters-toolbar-buttons + div").remove();
                            }

                            for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                                document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "0.5";
                            }
                            document.querySelector("#format-text-button").style.opacity = "1";

                            document.querySelector("#letters-toolbar").insertAdjacentHTML("beforeend", "<div id=\"text-formatting-options\" class=\"transitionless\"><div><button id=\"bold-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Удебеляване на текста"; case "en": return "Bold Text"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/letter-b.png\"></button><button id=\"italic-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Накланяне на текста"; case "en": return "Italic Text"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/italic-font.png\"></button><button id=\"underline-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Подчертаване на текста"; case "en": return "Underline Text"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/underline-text.png\"></button></div><div><button id=\"justifyLeft-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Ляво подравняване"; case "en": return "Left Align"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/left-alignment.png\"></button><button id=\"justifyCenter-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Централно подравняване"; case "en": return "Centre Align"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/center-alignment.png\"></button><button id=\"justifyRight-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Дясно подравняване"; case "en": return "Right Align"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/right-alignment.png\"></button><button id=\"justifyFull-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Подравняване на текста"; case "en": return "Jusitfy Text"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/justify-paragraph.png\"></button></div><div><button id=\"subscript-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Долен текст"; case "en": return "Subscript Text"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/subscript.png\"></button><button id=\"superscript-text-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Горен текст"; case "en": return "Superscript Text"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/superscript.png\"></button></div><div><button class=\"color-text-button\" data-hex-code=\"#FF3B14\" data-rgb-code=\"rgb(255, 59, 20)\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Оцветяване на текста в червено"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "": case "US": return "Color Text in Red"; default: return "Colour Text in Red"; } } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/pen-edit.png\"></button><button class=\"color-text-button\" data-hex-code=\"#FF7820\" data-rgb-code=\"rgb(255, 120, 32)\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Оцветяване на текста в оранжево"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "": case "US": return "Color Text in Orange"; default: return "Colour Text in Orange"; } } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/pen-edit.png\"></button><button class=\"color-text-button\" data-hex-code=\"#FFAB00\" data-rgb-code=\"rgb(255, 171, 0)\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Оцветяване на текста в жълто"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "": case "US": return "Color Text in Yellow"; default: return "Colour Text in Yellow"; } } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/pen-edit.png\"></button><button class=\"color-text-button\" data-hex-code=\"#7BB42C\" data-rgb-code=\"rgb(123, 180, 44)\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Оцветяване на текста в зелено"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "": case "US": return "Color Text in Green"; default: return "Colour Text in Green"; } } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/pen-edit.png\"></button></div><div><button class=\"color-text-button\" data-hex-code=\"#4B3BFF\" data-rgb-code=\"rgb(75, 59, 255)\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Оцветяване на текста в синьо"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "": case "US": return "Color Text in Blue"; default: return "Colour Text in Blue"; } } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/pen-edit.png\"></button><button class=\"color-text-button\" data-hex-code=\"#973FF1\" data-rgb-code=\"rgb(151, 63, 241)\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Оцветяване на текста в лилаво"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "": case "US": return "Color Text in Purple"; default: return "Colour Text in Purple"; } } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/pen-edit.png\"></button><button class=\"color-text-button\" data-hex-code=\"#FF647F\" data-rgb-code=\"rgb(255, 100, 127)\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Оцветяване на текста в розово"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "": case "US": return "Color Text in Pink"; default: return "Colour Text in Pink"; } } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/pen-edit.png\"></button><button class=\"color-text-button\" data-hex-code=\"#272727\" data-rgb-code=\"rgb(39, 39, 39)\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Оцветяване на текста в черно"; case "en": switch(document.querySelector("html").getAttribute("lang").substring(3, 5)) { case "": case "US": return "Color Text in Black"; default: return "Colour Text in Black"; } } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/pen-edit.png\"></button></div><div><input id=\"font-size-control\" min=\"1\" max=\"7\" step=\"1\" type=\"range\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Промяна на размера на шрифта"; case "en": return "Change Font Size"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/text-height.png\"></div><div><button class=\"font-change-button\" data-font-name=\"Jost\"><span>Aa</span></button><button class=\"font-change-button\" data-font-name=\"Besley\"><span>Aa</span></button></div></div>");
                            $("#text-formatting-options").ready(function() {
                                setTimeout(function() {
                                    if (document.querySelector(".transitionless")) {
                                        document.querySelector(".transitionless").classList.remove("transitionless");
                                    }
                                }, 0);
                            });

                            sheetScrollBar.recalculate();

                            document.querySelector("#text-formatting-options").addEventListener("mousedown", function(event) {
                                if (event.target !== document.querySelector("#font-size-control")) {
                                    event.preventDefault();

                                    if (!document.activeElement.hasAttribute("contenteditable")) {
                                        document.activeElement.blur();
                                    }

                                    event.stopPropagation();
                                }
                            });

                            if (document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "false") {
                                const sheetScrollPosition = sheetScrollBar.getScrollElement().scrollTop;

                                unwrapTheWords();

                                document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");

                                document.querySelector("#editor-sheet div[contenteditable]").focus();
                                setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                                sheetScrollBar.getScrollElement().scrollTop = sheetScrollPosition;
                            }

                            const formatText = function(option, value) {
                                if (!["Jost", "Besley"].includes(document.queryCommandValue("fontName")) && userAgent.getResult().browser.name !== "Firefox") {
                                    document.querySelector("#editor-sheet div[contenteditable]").focus();
                                    setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);
                                }
                                document.execCommand(option, false, value);
                                showFormattingChanges();

                                if (document.querySelector("#editor-sheet div[contenteditable]").innerHTML !== saveStates[currentSaveStateIndex].HTML) {
                                    saveStates = saveStates.slice(0, currentSaveStateIndex + 1);
                                    saveStates.push({ "HTML": document.querySelector("#editor-sheet div[contenteditable]").innerHTML, "text": document.querySelector("#editor-sheet div[contenteditable]").innerText, "caretPosition": lastCaretPosition, "hasFormattedTextOrPressedTheEnterKey": true });
                                    currentSaveStateIndex++;
                                }
                            }

                            document.querySelector("#bold-text-button").addEventListener("click", function() {
                                formatText("bold", null);
                            });

                            document.querySelector("#italic-text-button").addEventListener("click", function() {
                                formatText("italic", null);
                            });

                            document.querySelector("#underline-text-button").addEventListener("click", function() {
                                formatText("underline", null);
                            });

                            document.querySelector("#justifyLeft-text-button").addEventListener("click", function() {
                                formatText("justifyLeft", null);
                            });

                            document.querySelector("#justifyCenter-text-button").addEventListener("click", function() {
                                formatText("justifyCenter", null);
                            });

                            document.querySelector("#justifyRight-text-button").addEventListener("click", function() {
                                formatText("justifyRight", null);
                            });

                            document.querySelector("#justifyFull-text-button").addEventListener("click", function() {
                                formatText("justifyFull", null);
                            });

                            document.querySelector("#subscript-text-button").addEventListener("click", function() {
                                formatText("subscript", null);
                            });

                            document.querySelector("#superscript-text-button").addEventListener("click", function() {
                                formatText("superscript", null);
                            });

                            document.querySelectorAll(".color-text-button").forEach(function(element) {
                                element.addEventListener("click", function() {
                                    formatText("foreColor", element.dataset.hexCode);
                                });
                            });

                            document.querySelector("#font-size-control").addEventListener("input", function() {
                                document.querySelector("#font-size-control").setAttribute("value", document.querySelector("#font-size-control").value);
                                document.querySelector("#font-size-control").value = document.querySelector("#font-size-control").value;
                                if (["Jost", "Besley"].includes(document.queryCommandValue("fontName"))) {
                                    formatText("fontSize", document.querySelector("#font-size-control").value);
                                }
                            });
                            document.querySelector("#font-size-control").addEventListener("keyup", function(event) {
                                if (event.keyCode === 37 || event.keyCode === 39) {
                                    formatText("fontSize", document.querySelector("#font-size-control").value);
                                }
                            });
                            document.querySelector("#font-size-control").addEventListener("mouseup", function() {
                                if (!["Jost", "Besley"].includes(document.queryCommandValue("fontName"))) {
                                    formatText("fontSize", document.querySelector("#font-size-control").value);
                                }
                                document.querySelector("#editor-sheet div[contenteditable]").focus();
                            });

                            document.querySelectorAll(".font-change-button").forEach(function(element) {
                                element.addEventListener("click", function() {
                                    formatText("fontName", element.dataset.fontName);
                                });
                            });

                            if (!$("#editor-sheet div[contenteditable]").is(":focus")) {
                                document.querySelector("#editor-sheet div[contenteditable]").focus();
                                setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);
                            }
                            if (userAgent.getResult().browser.name !== "Firefox" && !window.getSelection().toString().length) {
                                scrollToTheCaret();
                            }

                            showFormattingChanges();
                        }
                    });

                    let focusNode = null;
                    let focusOffset = null;
                    document.querySelector("#upload-media-button").addEventListener("click", function() {
                        focusNode = null;
                        focusOffset = null;

                        if (document.querySelector("#update-document-cover-menu")) {
                            document.querySelector("#update-document-cover-menu").remove();
                        }

                        if (document.querySelector(".friends-list")) {
                            document.querySelector(".friends-list").remove();
                        }

                        if (document.querySelector("#letters-toolbar-buttons + div")) {
                            document.querySelector("#letters-toolbar").removeAttribute("style");

                            document.querySelector("#letters-toolbar-buttons + div").remove();

                            sheetScrollBar.recalculate();
                        }

                        for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                            document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "1";
                        }

                        const sheetScrollPosition = sheetScrollBar.getScrollElement().scrollTop;

                        if (document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "false") {
                            unwrapTheWords();

                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");

                            document.querySelector("#editor-sheet div[contenteditable]").focus();
                            setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);
                        }

                        if (!$("#editor-sheet div[contenteditable]").is(":focus")) {
                            document.querySelector("#editor-sheet div[contenteditable]").focus();
                            setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);
                        }

                        sheetScrollBar.getScrollElement().scrollTop = sheetScrollPosition;

                        focusNode = window.getSelection().focusNode;
                        focusOffset = window.getSelection().focusOffset;

                        document.querySelector("#upload-media-button").nextElementSibling.click();
                    });
                    document.querySelector("#upload-media-button").nextElementSibling.addEventListener("input", function() {
                        if (document.querySelector("#upload-media-button").nextElementSibling.value) {
                            if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
                                document.querySelector("html body").style.overflowX = "scroll";
                            }
                            document.querySelector("#letters").style.overflow = "hidden";

                            showTheLoadingScreen();

                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                            if (window.getSelection().toString().length) {
                                if (window.getSelection) {
                                    window.getSelection().removeAllRanges();
                                }
                                else if (document.selection) {
                                    document.selection.empty();
                                }
                            }
                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                            }

                            const fileReader = new FileReader();
                            fileReader.readAsDataURL(document.querySelector("#upload-media-button").nextElementSibling.files[0]);
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

                                    const resizedImage = imageResizingCanvas.toDataURL(document.querySelector("#upload-media-button").nextElementSibling.files[0].type);

                                    setTimeout(function() {
                                        hideTheLoadingScreen();

                                        document.querySelector("html body").style.overflowX = "auto";
                                        document.querySelector("#letters").style.overflow = "auto";

                                        setTimeout(function() {
                                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                            }

                                            document.querySelector("#editor-sheet div[contenteditable]").focus();

                                            const range = document.createRange();
                                            range.setStart(focusNode, focusOffset);
                                            range.collapse(true);

                                            window.getSelection().removeAllRanges();
                                            window.getSelection().addRange(range);

                                            const sheetScrollPosition = sheetScrollBar.getScrollElement().scrollTop;

                                            document.execCommand("insertHTML", false, "<img alt=\"\" data-is-being-relocated=\"false\" draggable=\"false\" src=\"" + resizedImage + "\" style=\"border-width: 0px; clip-path: inset(0px, 0px); filter: brightness(100%) saturate(100%); max-width: " + function() { if (uploadedImage.height > uploadedImage.width) { return uploadedImage.width * (384 / uploadedImage.height); } else { return "384"; } }() + "px;\" tabindex=\"-1\">");

                                            saveStates = saveStates.slice(0, currentSaveStateIndex + 1);
                                            saveStates.push({ "HTML": document.querySelector("#editor-sheet div[contenteditable]").innerHTML, "text": document.querySelector("#editor-sheet div[contenteditable]").innerText, "caretPosition": lastCaretPosition, "hasFormattedTextOrPressedTheEnterKey": false });
                                            currentSaveStateIndex++;

                                            sheetScrollBar.getScrollElement().scrollTop = sheetScrollPosition;

                                            document.querySelector("#upload-media-button").nextElementSibling.value = "";

                                            positionTheImages();
                                            addEventListenersToTheImages();
                                            sheetScrollBar.recalculate();

                                            document.querySelector("#editor-sheet div[contenteditable] img[tabindex=\"-1\"]").scrollIntoView({ "behavior": "smooth", "block": "center" });
                                            document.querySelector("#editor-sheet div[contenteditable] img[tabindex=\"-1\"]").setAttribute("tabindex", "0");
                                        }, 200);
                                    }, 1000);
                                });
                            });
                        }
                    });

                    document.querySelector("#magic-effects-button").addEventListener("click", function() {
                        if (document.querySelector("#update-document-cover-menu")) {
                            document.querySelector("#update-document-cover-menu").remove();
                        }

                        if (document.querySelector(".friends-list")) {
                            document.querySelector(".friends-list").remove();
                        }

                        document.querySelector("#letters-toolbar").removeAttribute("style");

                        if (window.getComputedStyle(document.querySelector("#magic-effects-button"), null).opacity === "1" && window.getComputedStyle(document.querySelector("#letters-home-and-save-button"), null).opacity === "0.5" || document.querySelector("#magic-effects-options")) {
                            const sheetScrollPosition = sheetScrollBar.getScrollElement().scrollTop;

                            unwrapTheWords();

                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");

                            document.querySelector("#editor-sheet div[contenteditable]").focus();
                            setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                            if (document.querySelector("#magic-effects-options")) {
                                document.querySelector("#magic-effects-options").remove();

                                sheetScrollBar.recalculate();
                            }

                            for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                                document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "1";
                            }

                            sheetScrollBar.getScrollElement().scrollTop = sheetScrollPosition;
                        }
                        else {
                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] img").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                                document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].style.opacity = "1";
                                document.querySelectorAll("#editor-sheet div[contenteditable] img")[i].dataset.isBeingRelocated = "false";
                            }
                            wrapTheWords();
                            document.querySelector("#editor-sheet div[contenteditable]").dataset.hasTheWordsWrapped = "true";
                            document.querySelector("#editor-sheet div[contenteditable]").dataset.isInMagicEffectsMode = "true";

                            if (document.querySelector("#letters-toolbar-buttons + div")) {
                                document.querySelector("#letters-toolbar-buttons + div").remove();

                                sheetScrollBar.recalculate();
                            }

                            for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                                document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "0.5";
                            }
                            document.querySelector("#magic-effects-button").style.opacity = "1";
                        }
                    });

                    document.querySelector("#document-settings-and-details-button").addEventListener("click", function() {
                        for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                            document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "1";
                        }

                        if (document.querySelector("#document-settings")) {
                            if (document.querySelector("#update-document-cover-menu")) {
                                document.querySelector("#update-document-cover-menu").remove();
                            }

                            if (document.querySelector(".friends-list")) {
                                document.querySelector(".friends-list").remove();
                            }

                            document.querySelector("#letters-toolbar").removeAttribute("style");

                            if (document.querySelector("#document-settings")) {
                                document.querySelector("#document-settings").remove();
                            }

                            sheetScrollBar.recalculate();
                        }
                        else {
                            if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
                                document.querySelector("html body").style.overflowX = "scroll";
                            }
                            document.querySelector("#letters").style.overflow = "hidden";

                            showTheLoadingScreen();

                            if (document.querySelector("#letters-toolbar-buttons + div")) {
                                document.querySelector("#letters-toolbar").removeAttribute("style");

                                document.querySelector("#letters-toolbar-buttons + div").remove();

                                sheetScrollBar.recalculate();
                            }

                            if (document.querySelector("#editor-sheet div[contenteditable]").getAttribute("contenteditable") === "false") {
                                unwrapTheWords();
                            }

                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                            }

                            $.ajax({
                                "data": {
                                    "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                    // "session_id": null,
                                    // "sessionToken": null,
                                    "isUsingAnApplication": true
                                },
                                "type": "POST",
                                "url": "./friends/",
                                "success": function(data) {
                                    setTimeout(function() {
                                        hideTheLoadingScreen();

                                        document.querySelector("html body").style.overflowX = "auto";
                                        document.querySelector("#letters").style.overflow = "auto";

                                        let coverDataURL = cover;

                                        const formData = new FormData();
                                        formData.append("cover", new File([createABlobFromADataURL(cover, "image/jpeg")], "cover.jpg", { "type": "image/jpeg" }));
                                        formData.append("hasACustomCover", hasACustomCover);

                                        document.querySelector("#letters-toolbar").style.height = "100%";

                                        for (let i = 0; i < document.querySelector("#letters-toolbar-buttons").childNodes.length; i++) {
                                            document.querySelector("#letters-toolbar-buttons").childNodes[i].style.opacity = "0.5";
                                        }
                                        document.querySelector("#document-settings-and-details-button").style.opacity = "1";

                                        const friends = data;
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

                                        document.querySelector("#letters-toolbar").insertAdjacentHTML("beforeend", "<div id=\"document-settings\"><div><button class=\"document-cover\" id=\"update-document-cover-button\"></button></div><div><label>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Име на документа"; case "en": return "Document Name"; } }() + "</label><input autocomplete=\"off\" id=\"document-name-input-field\" maxlength=\"256\" spellcheck=\"false\" type=\"text\"></div><div><button" + function() { if (!friends.length) { return " disabled"; } else { return ""; } }() + " id=\"share-document-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Споделяне"; case "en": return "Share"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/paper-plane.png\"></button></div><div><button disabled id=\"save-document-settings-and-details-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Запазване"; case "en": return "Save"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/floppy-disk.png\"></button><button id=\"delete-document-button\"><img alt=\"" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Изтриване"; case "en": return "Delete"; } }() + "\" draggable=\"false\" src=\"./letters/public/assets/images/trash-bin.png\"></button></div></div>");
                                        document.querySelector("#update-document-cover-button").style.background = "url(\"" + cover.replace(/(\r\n|\n|\r)/gm, "") + "\")";
                                        document.querySelector("#document-name-input-field").value = name;

                                        sheetScrollBar.recalculate();

                                        document.querySelector("#document-settings").addEventListener("mousedown", function(event) {
                                            if (event.target.tagName !== "INPUT") {
                                                event.preventDefault();

                                                if (!document.activeElement.hasAttribute("contenteditable")) {
                                                    document.activeElement.blur();
                                                }

                                                event.stopPropagation();
                                            }
                                        });

                                        document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div id=\"update-document-cover-menu\"><input accept=\"image/png, image/jpeg\" id=\"update-document-cover-menu-upload-button\" type=\"file\"/><label for=\"update-document-cover-menu-upload-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Качване"; case "en": return "Upload"; } }() + "</label><button" + function() { if (!hasACustomCover) { return " disabled style=\"color: rgba(230, 0, 0, 0.6);\""; } else { return " style=\"color: #E60000;\""; } }() + " id=\"update-document-cover-menu-remove-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Премахване"; case "en": return "Remove"; } }() + "</button><button id=\"update-document-cover-menu-close-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Затваряне"; case "en": return "Close"; } }() + "</button></div>");

                                        document.querySelector("#update-document-cover-menu-upload-button").addEventListener("input", function() {
                                            if (document.querySelector("#update-document-cover-menu-upload-button").value) {
                                                showTheLoadingScreen();

                                                const fileReader = new FileReader();
                                                fileReader.readAsDataURL(document.querySelector("#update-document-cover-menu-upload-button").files[0]);
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

                                                        const resizedImage = imageResizingCanvas.toDataURL(document.querySelector("#update-document-cover-menu-upload-button").files[0].type);

                                                        setTimeout(function() {
                                                            hideTheLoadingScreen();

                                                            document.querySelector("html body").style.overflowX = "auto";
                                                            document.querySelector("#letters").style.overflow = "auto";

                                                            document.querySelector("#update-document-cover-button").style.background = "url(\"" + resizedImage.replace(/(\r\n|\n|\r)/gm, "") + "\")";

                                                            formData.delete("cover");
                                                            formData.append("cover", new File([createABlobFromADataURL(resizedImage)], "cover." + function() { if (document.querySelector("#update-document-cover-menu-upload-button").files[0].type === "image/jpeg") { return "jpg"; } else { return "png"; } }(), { "type": document.querySelector("#update-document-cover-menu-upload-button").files[0].type }));
                                                            formData.delete("hasACustomCover");
                                                            formData.append("hasACustomCover", true);
                                                            coverDataURL = resizedImage;

                                                            document.querySelector("#save-document-settings-and-details-button").disabled = false;

                                                            showTheApplication();

                                                            setTimeout(function() {
                                                                document.querySelector("#update-document-cover-menu-remove-button").disabled = false;
                                                                document.querySelector("#update-document-cover-menu-remove-button").style.color = "#E60000";

                                                                document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                                                for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                                    document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                                                }
                                                            }, 200);
                                                        }, 1000);
                                                    });
                                                });
                                            }
                                        });

                                        document.querySelector("#update-document-cover-menu-remove-button").addEventListener("click", function() {
                                            showTheLoadingScreen();

                                            setTimeout(function() {
                                                if (!hasACustomCover) {
                                                    hideTheLoadingScreen();

                                                    document.querySelector("html body").style.overflowX = "auto";
                                                    document.querySelector("#letters").style.overflow = "auto";

                                                    document.querySelector("#update-document-cover-button").style.background = "url(\"" + cover.replace(/(\r\n|\n|\r)/gm, "") + "\")";

                                                    formData.delete("cover");
                                                    formData.append("cover", new File([createABlobFromADataURL(cover)], "cover.jpg", { "type": "image/jpeg" }));
                                                    formData.delete("hasACustomCover");
                                                    formData.append("hasACustomCover", false);
                                                    coverDataURL = cover;

                                                    showTheApplication();

                                                    setTimeout(function() {
                                                        document.querySelector("#update-document-cover-menu-remove-button").disabled = true;
                                                        document.querySelector("#update-document-cover-menu-remove-button").style.color = "rgba(230, 0, 0, 0.6)";

                                                        document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                                        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                            document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                                        }
                                                    }, 200);
                                                }
                                                else {
                                                    domtoimage.toJpeg(document.querySelector("#editor-sheet div[contenteditable]"), { "height": 905, "style": { "borderRadius": "0px" } }).then(function(dataURL) {
                                                        const sheetImage = new File([createABlobFromADataURL(dataURL, "image/jpeg")], "editor-sheet.jpg", { "type": "image/jpeg" });

                                                        const fileReader = new FileReader();
                                                        fileReader.readAsDataURL(sheetImage);
                                                        fileReader.addEventListener("load", function() {
                                                            let coverToBeSet = document.createElement("img");
                                                            coverToBeSet.setAttribute("src", dataURL);
                                                            coverToBeSet.addEventListener("load", function() {
                                                                const imageResizingCanvas = document.createElement("canvas");
                                                                const imageResizingCanvasContext = imageResizingCanvas.getContext("2d");

                                                                if (coverToBeSet.height > coverToBeSet.width) {
                                                                    imageResizingCanvas.setAttribute("height", 512);
                                                                    imageResizingCanvas.setAttribute("width", coverToBeSet.width * (512 / 905));
                                                                }
                                                                else {
                                                                    imageResizingCanvas.setAttribute("height", 905 * (512 / coverToBeSet.width));
                                                                    imageResizingCanvas.setAttribute("width", 512);
                                                                }
                                                                imageResizingCanvasContext.drawImage(coverToBeSet, 0, 0, imageResizingCanvas.getAttribute("width"), imageResizingCanvas.getAttribute("height"));

                                                                hideTheLoadingScreen();

                                                                document.querySelector("html body").style.overflowX = "auto";
                                                                document.querySelector("#letters").style.overflow = "auto";

                                                                document.querySelector("#update-document-cover-button").style.background = "url(\"" + imageResizingCanvas.toDataURL("image/jpeg").replace(/(\r\n|\n|\r)/gm, "") + "\")";

                                                                coverDataURL = imageResizingCanvas.toDataURL("image/jpeg");
                                                                formData.delete("cover");
                                                                formData.append("cover", new File([createABlobFromADataURL(imageResizingCanvas.toDataURL("image/jpeg"))], "cover.jpg", { "type": "image/jpeg" }));
                                                                formData.delete("hasACustomCover");
                                                                formData.append("hasACustomCover", false);

                                                                document.querySelector("#save-document-settings-and-details-button").disabled = false;

                                                                showTheApplication();

                                                                setTimeout(function() {
                                                                    document.querySelector("#update-document-cover-menu-remove-button").disabled = true;
                                                                    document.querySelector("#update-document-cover-menu-remove-button").style.color = "rgba(230, 0, 0, 0.6)";

                                                                    document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                                                    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                                        document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                                                    }
                                                                }, 200);
                                                            });
                                                        });
                                                    });
                                                }
                                            }, 1000);
                                        });

                                        document.querySelector("#update-document-cover-menu-close-button").addEventListener("click", function() {
                                            showTheApplication();

                                            setTimeout(function() {
                                                document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                                for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                    document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                                }
                                            }, 200);
                                        });

                                        if (friends.length) {
                                            document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div class=\"friends-list\"><div></div><button id=\"friends-list-done-button\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Готово"; case "en": return "Done"; } }() + "</button></div>");

                                            new SimpleBar(document.querySelector(".friends-list div"));
                                            document.querySelector(".friends-list .simplebar-content-wrapper").setAttribute("tabindex", "-1");
                                            document.querySelector(".friends-list .simplebar-content").insertAdjacentHTML("beforeend", function() { let friendsHTML = ""; for (let i = 0; i < friends.length; i++) { friendsHTML += "<label class=\"checkbox-container\"><input data-friend-code=\"" + friends[i].friendCode + "\" type=\"checkbox\"><span><span></span><span>" + friends[i].name.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;") + "</span></span></label>"; } return friendsHTML; }());
                                            for (let i = 0; i < document.querySelectorAll(".friends-list .simplebar-content .checkbox-container").length; i++) {
                                                document.querySelectorAll(".friends-list .simplebar-content .checkbox-container")[i].querySelector("span span").style.background = "url(\"" + function() { if (!friends[i].profilePhoto) { return "./public/assets/images/user.jpg"; } else { return friends[i].profilePhoto.replace(/(\r\n|\n|\r)/gm, ""); } }() + "\")";

                                                if (friendsWithSharedAccess.includes(document.querySelectorAll(".friends-list .simplebar-content .checkbox-container")[i].querySelector("input").dataset.friendCode)) {
                                                    document.querySelectorAll(".friends-list .simplebar-content .checkbox-container")[i].querySelector("input").checked = true;
                                                }

                                                document.querySelectorAll(".friends-list .simplebar-content .checkbox-container")[i].querySelector("input").addEventListener("input", function() {
                                                    document.querySelector("#save-document-settings-and-details-button").disabled = false;
                                                });
                                            }

                                            document.querySelector("#friends-list-done-button").addEventListener("click", function() {
                                                showTheApplication();

                                                setTimeout(function() {
                                                    document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                                    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                        document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                                    }
                                                }, 200);
                                            });
                                        }

                                        document.querySelector("#document-name-input-field").addEventListener("input", function() {
                                            if (document.querySelector("#document-name-input-field").value !== name) {
                                                document.querySelector("#save-document-settings-and-details-button").disabled = false;
                                            }
                                        });

                                        document.querySelector("#share-document-button").addEventListener("click", function() {
                                            hideTheApplication();

                                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                                            }

                                            document.querySelector("#update-document-cover-menu").style.display = "none";

                                            document.querySelector(".friends-list").style.display = "block";
                                            document.querySelector(".friends-list").style.width = document.querySelector(".friends-list").clientWidth + "px";
                                        });

                                        document.querySelector("#update-document-cover-button").addEventListener("click", function() {
                                            hideTheApplication();

                                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                                            }

                                            document.querySelector("#update-document-cover-menu").style.display = "block";

                                            if (document.querySelector(".friends-list")) {
                                                document.querySelector(".friends-list").style.display = "none";
                                            }
                                        });

                                        document.querySelector("#save-document-settings-and-details-button").addEventListener("click", function() {
                                            if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
                                                document.querySelector("html body").style.overflowX = "scroll";
                                            }
                                            document.querySelector("#letters").style.overflow = "hidden";

                                            showTheLoadingScreen();

                                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                                            }

                                            formData.delete("documentName");
                                            formData.append("documentName", document.querySelector("#document-name-input-field").value);
                                            formData.delete("friendsToHaveAccess");
                                            formData.append("friendsToHaveAccess", function() { if (!document.querySelector(".friends-list")) { return []; } else { const friendsToHaveAccess = []; for (let i = 0; i < document.querySelectorAll(".friends-list .simplebar-content .checkbox-container input:checked").length; i++) { friendsToHaveAccess.push(document.querySelectorAll(".friends-list .simplebar-content .checkbox-container input:checked")[i].dataset.friendCode); } return friendsToHaveAccess; } }());
                                            formData.delete("toBeDeleted");
                                            formData.append("toBeDeleted", false);

                                            saveTheDocument(formData, coverDataURL);
                                        });

                                        document.querySelector("#delete-document-button").addEventListener("click", function() {
                                            hideTheApplication();

                                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                                            }

                                            document.querySelector("#update-document-cover-menu").style.display = "none";

                                            if (document.querySelector(".friends-list")) {
                                                document.querySelector(".friends-list").style.display = "none";
                                            }

                                            document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Да се изтрие ли документът?"; case "en": return "Delete the document?"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return function() { if (!isPublished) { return "Действието не може да бъде отменено."; } else { return "Книгата, свързана с документа, повече няма да бъде налична в магазина."; } }(); case "en": return function() { if (!isPublished) { return "The action cannot be undone."; } else { return "The book associated with the document will no longer be available in the store."; } }(); } }() + "</p><button style=\"color: #E60000;\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Изтриване"; case "en": return "Delete"; } }() + "</button><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отмяна"; case "en": return "Cancel"; } }() + "</button></div>");

                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].addEventListener("click", function() {
                                                showTheLoadingScreen();

                                                document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "false");
                                                for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                    document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "-1");
                                                }

                                                formData.delete("documentName");
                                                formData.append("documentName", "");
                                                formData.delete("friendsToHaveAccess");
                                                formData.append("friendsToHaveAccess", []);
                                                formData.delete("toBeDeleted");
                                                formData.append("toBeDeleted", true);

                                                saveTheDocument(formData, coverDataURL);
                                            });

                                            document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].addEventListener("click", function() {
                                                showTheApplication();

                                                setTimeout(function() {
                                                    document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                                    for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                        document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                                    }
                                                }, 200);
                                            });
                                        });

                                        setTimeout(function() {
                                            document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img").length; i++) {
                                                document.querySelectorAll("#editor-sheet div[contenteditable], #editor-sheet div[contenteditable] img")[i].setAttribute("tabindex", "0");
                                            }

                                            const sheetScrollPosition = sheetScrollBar.getScrollElement().scrollTop;

                                            document.querySelector("#editor-sheet div[contenteditable]").focus();
                                            setTheCaretPosition(document.querySelector("#editor-sheet div[contenteditable]"), lastCaretPosition);

                                            sheetScrollBar.getScrollElement().scrollTop = sheetScrollPosition;
                                        }, 200);
                                    }, 1000);
                                },
                                "error": function(data) {
                                    setTimeout(function() {
                                        document.querySelector("#loading-screen .blur").style.background = "none";
                                        document.querySelector("#loading-screen .blur").style.backdropFilter = "none";
                                        hideTheLoadingScreen();
                                        hideTheApplication();
                                        document.querySelector("#curtain .blur").style.animationDuration = "0s";

                                        processData(function() { if (data.responseText && data.responseText.includes("{")) { return JSON.parse(data.responseText); } else { return null; } }());
                                    }, 1000);
                                }
                            });
                        }
                    });

                    document.querySelector("#editor-sheet div[contenteditable]").setAttribute("contenteditable", "true");
                    document.querySelector("#editor-sheet div[contenteditable]").setAttribute("tabindex", "0");
                    document.querySelector("#editor-sheet div[contenteditable]").focus();
                    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
                        const range = document.createRange();
                        range.selectNodeContents(document.querySelector("#editor-sheet div[contenteditable]"));
                        range.collapse(false);
                        const selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                    else if (typeof document.body.createTextRange !== "undefined") {
                        const textRange = document.body.createTextRange();
                        textRange.moveToElementText(document.querySelector("#editor-sheet div[contenteditable]"));
                        textRange.collapse(false);
                        textRange.select();
                    }
                    getTheCaretPosition();
                    sheetScrollBar.getScrollElement().scroll({ "behavior": "smooth", "top": document.querySelector("#editor-sheet div[contenteditable]").clientHeight - document.querySelector("#letters").clientHeight + function() { if (document.querySelector("html body").clientHeight <= 572 || document.querySelector("html body").clientWidth <= 1366) { return 0; } else { return 92; } }() });

                    saveStates.push({ "HTML": document.querySelector("#editor-sheet div[contenteditable]").innerHTML, "text": document.querySelector("#editor-sheet div[contenteditable]").innerText, "caretPosition": lastCaretPosition, "hasFormattedTextOrPressedTheEnterKey": false });
                }
                else {
                    document.querySelector("#delete-shared-document-button").addEventListener("click", function() {
                        hideTheApplication();

                        for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
                            document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "-1");
                        }

                        document.querySelector("#containers").insertAdjacentHTML("beforeend", "<div><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Да се изтрие ли документът?"; case "en": return "Delete the document?"; } }() + "</h3><p>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Ще загубите достъп до документа, освен ако създателят му не Ви го изпрати отново."; case "en": return "You will lose access to the document unless its creator sends it to you again."; } }() + "</p><button style=\"color: #E60000;\">" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Изтриване"; case "en": return "Delete"; } }() + "</button><button>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Отмяна"; case "en": return "Cancel"; } }() + "</button></div>");

                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[0].addEventListener("click", function() {
                            if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
                                document.querySelector("html body").style.overflowX = "scroll";
                            }
                            document.querySelector("#letters").style.overflow = "hidden";

                            showTheLoadingScreen();

                            $.ajax({
                                "data": {
                                    "languageIsoCode": document.querySelector("html").getAttribute("lang").substring(0, 2),
                                    // "session_id": null,
                                    // "sessionToken": null,
                                    "document_id": _id
                                },
                                "type": "POST",
                                "url": "./letters/document/delete/",
                                "success": function() {
                                    setTimeout(function() {
                                        showTheApplication();

                                        document.querySelector("#containers div").style.animationName = "shrink";
                                        setTimeout(function() {
                                            document.querySelector("#containers div").remove();

                                            setTimeout(function() {
                                                exitTheEditor();
                                            }, 200);
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

                        document.querySelectorAll("#containers > div")[document.querySelectorAll("#containers > div").length - 1].querySelectorAll("button")[1].addEventListener("click", function() {
                            showTheApplication();

                            for (let i = 0; i < document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]").length; i++) {
                                document.querySelectorAll("#editor-sheet div[contenteditable] .word-piece-wrapper[tabindex]")[i].setAttribute("tabindex", "0");
                            }
                        });
                    });
                }
            }, 200);
        }
    }, 1000);
}

setTimeout(function() {
    if (document.querySelector("#loading-screen")) {
        hideTheLoadingScreen();
    }

    showTheApplication();

    document.querySelector("#documents").insertAdjacentHTML("beforeend", "<div><button id=\"create-a-document-button\"></button><h3>" + function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Нов документ"; case "en": return "New Document"; } }() + "</h3></div>");

    setTimeout(function() {
        for (let i = 0; i < document.querySelectorAll("#documents div").length; i++) {
            document.querySelectorAll("#documents div")[i].style.opacity = "1";
        }
    }, 0);

    [document.querySelector("#create-a-document-button").parentNode, document.querySelector("#create-a-document-button")].forEach(function(element, index) {
        element.addEventListener("click", function(event) {
            if (index === 1) {
                event.stopPropagation();
            }

            if (!document.querySelector("#loading-screen")) {
                if (document.querySelector("#letters").scrollHeight > document.querySelector("#letters").clientHeight) {
                    document.querySelector("html body").style.overflowY = "scroll";
                }
                if (document.querySelector("#letters").scrollWidth > document.querySelector("#letters").clientWidth) {
                    document.querySelector("html body").style.overflowX = "scroll";
                }
                document.querySelector("#letters").style.overflow = "hidden";

                showTheLoadingScreen();
            }
            
            setTimeout(function() {
                showTheEditor(null, "New Document", null, [], null, false, "", true, false);
            }, 2000); 
        });
    });
}, 2000);