document.querySelector("#bar button").addEventListener("click", function() {
    if (document.querySelector("html body").scrollHeight > window.innerHeight) {
        document.querySelector("html body").style.overflowY = "scroll";
    }
    if (document.querySelector("html body").scrollWidth > window.innerWidth) {
        document.querySelector("html body").style.overflowX = "scroll";
    }
    document.querySelector("html body").style.left = "-" + document.documentElement.scrollLeft + "px";
    document.querySelector("html body").style.top = "-" + document.documentElement.scrollTop + "px";
    document.querySelector("html body").style.position = "fixed";

    document.querySelector("#curtain .blur").style.animationName = "fade-in";
    document.querySelector("#containers nav").style.animationName = "grow";
    document.querySelector("#curtain").style.display = "block";
    document.querySelector("#containers nav").style.display = "block";
});

document.querySelector("#curtain").addEventListener("click", function() {
    if (document.querySelector("#curtain").getAttribute("data-has-disabled-pointer-events") !== "true" && (!document.querySelector("#curtain button:disabled") || document.querySelector("#restore-form-first-step") || document.querySelector("#register-form-first-step") || document.querySelector("#profile-menu") || document.querySelector("#coins-purchase-form") || document.querySelector("#books-review-form") || document.querySelector("#publish-to-books-form"))) {
        document.querySelector("html body").style.overflowX = "auto";
        document.querySelector("html body").style.overflowY = "auto";
        document.querySelector("html body").style.position = "static";
        document.documentElement.scrollLeft = Math.abs(parseInt(document.querySelector("html body").style.left));
        document.documentElement.scrollTop = Math.abs(parseInt(document.querySelector("html body").style.top));
        document.querySelector("html body").style.left = "auto";
        document.querySelector("html body").style.top = "auto";

        document.querySelector("#curtain .blur").style.animationName = "fade-out";
        for (let i = 0; i < document.querySelectorAll("#containers > div, #containers nav").length; i++) {
            document.querySelectorAll("#containers > div, #containers nav")[i].style.animationName = "shrink";
        }
    }
});

document.querySelector("#containers nav button:last-child").addEventListener("click", function() {
    document.querySelector("#curtain").click();
});

document.querySelector("#containers nav").addEventListener("click", function(event) {
    event.stopPropagation();
});