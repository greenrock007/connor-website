const gallery_images = document.querySelectorAll(".gallery-img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");

gallery_images.forEach(image => {
    image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.style.display = "flex";
    });
});

lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        lightbox.style.display = "none";
    }
});

async function readFile(filePath) {
    const content = await fetch(filePath);
    const lines = (await content.text()).split('\n');
    return lines;
}

async function load_gallery_images() {
    const image_srcs = await readFile('images/image_src.txt');
    const image_descs = await readFile('images/image_desc.txt');
    // console.log(image_descs, image_srcs);

    // Assumption that both files have the same number of lines
    for (let i = 0; i < image_srcs.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'img-box';

        newDiv.innerHTML = `
                            <img src="${image_srcs[i]}" class="gallery-img" alt="ro.jpg">
                            <p class="img-desc">${image_descs[i]}</p>`
        document.querySelector('.horizontal-div').append(newDiv);
    }
}

load_gallery_images();