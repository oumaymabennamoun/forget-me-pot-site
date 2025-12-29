const header = document.querySelector("header");
let lastScroll = 0;
const scrollThreshold = 100; 

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 0) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }

    if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScroll) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }
    } else {
        header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll; 
});
