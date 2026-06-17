const accessKey = "W5YekMJB6jQXgoC3IeVC2onBNGg7V81GdA_U5MNBZT0";

const searchform = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchresult = document.getElementById("search-result");
const showmoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=18`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchresult.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || "Image";

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchresult.appendChild(imageLink);
    });

    showmoreBtn.style.display = "block";
}

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchBox.value.trim() === "") {
        alert("Please enter a search term");
        return;
    }

    page = 1;
    searchImages();
});

showmoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

