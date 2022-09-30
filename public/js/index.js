var darkModeButton = document.getElementById("darkModeButton")


darkModeButton.addEventListener("click", function(){
    var body = document.body;
    if (body.classList == "dark-mode"){
        body.classList.remove("dark-mode")
        console.log("No Dark Mode")
    } else {
        body.classList.add("dark-mode")
        console.log("Dark Mode")
    }
});

function darkMode() {
    var body = document.body;
    body.classList.add(".dark-mode")
};