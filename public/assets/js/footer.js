for (let i = 0; i < document.querySelectorAll("html body footer article section div").length; i++) {
    document.querySelectorAll("html body footer article section div")[i].querySelector("button").addEventListener("click", function() {
        if (window.getComputedStyle(this.parentNode.nextElementSibling).getPropertyValue("display") === "none") {
            this.parentNode.nextElementSibling.style.display = "block";
            this.querySelector("img").setAttribute("alt", function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Скриване"; case "en": return "Hide"; } }());
            this.querySelector("img").setAttribute("src", "./public/assets/images/up-arrow.png");
        }
        else {
            this.parentNode.nextElementSibling.style.display = "none";
            this.querySelector("img").setAttribute("alt", function() { switch (document.querySelector("html").getAttribute("lang").substring(0, 2)) { case "bg": return "Показване"; case "en": return "Show"; } }());
            this.querySelector("img").setAttribute("src", "./public/assets/images/white-down-arrow.png");
        }
    });
}