function toggleMode() {
    const body = document.body;
    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");
}

 
document.getElementById("switch").addEventListener("change", toggleMode);
