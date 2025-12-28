window.addEventListener("scroll", () => {
    const header = document.getElementsByTagName("header")[0];

    if (window.scrollY > 20) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});

const displayMessage = document.getElementById("message");

const getQueryParams = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const tag = getQueryParams("tag");

if (tag) {
    document.querySelectorAll("div[skills]").forEach(item => {
        const tags = item.getAttribute("skills").split(",");

        if (tags.includes(tag)) {
            item.style.display = "block"; 
        } else {
            item.style.display = "none"; 
        }
    });
    displayMessage.innerHTML = `Displaying projects that contain "${tag}". <br> 
    <a href="/projects" class="return" style="text-decoration: underline;">Return to all projects</a>.`;
} else {
    document.querySelectorAll("div[skills]").forEach(item => {
        item.style.display = "block";
    });
    displayMessage.innerHTML = `Browse all projects or filter by skills & topics! Last updated: January 2025.`;
}

const backToTopButton = document.getElementById("top");

function backToTop() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}

const cursor = document.createElement("div");
cursor.classList.add("project-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

const projects = document.querySelectorAll(".project-1, .project-2");

projects.forEach((project) => {
    project.addEventListener("mouseenter", (e) => {
        cursor.style.opacity = 1;

        if (project.classList.contains("project-1")) {
            cursor.style.background = "rgba(144, 250, 102, 0.5)";
            cursor.style.boxShadow = "0 0 10px rgba(144, 250, 102, 1), 0 0 20px rgba(144, 250, 102, 0.6)";
        } else if (project.classList.contains("project-2")) {
            cursor.style.background = "rgba(250, 197, 100, 0.5)"; 
            cursor.style.boxShadow = "0 0 10px rgba(250, 197, 100, 1), 0 0 20px rgba(250, 197, 100, 0.6)";
        }
    });

    project.addEventListener("mouseleave", () => {
        cursor.style.opacity = 0;
    });
});