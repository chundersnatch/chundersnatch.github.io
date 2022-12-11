function toggleDisplay(element) {
    const el = document.getElementById(element);
    if (el.style.display !== "flex") {
        el.style.display = "flex";
    }else {
        el.style.display = "none";
    }
}