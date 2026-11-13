/* To start a local server: 
Open terminal
Make sure the directory is connor-website
    npx http-website -p 1000 -c-1
*/

async function readFile(filePath) {
    const content = await fetch(filePath);
    const lines = (await content.text()).split('\n');
    let line_tuples = []
    lines.forEach(line => {
        // split the line into the image source and description based on |
        // Do this so we can only have 1 file for image data
        const split = line.indexOf('|');
        const prefix = line.slice(0, split);
        const suffix = line.slice(split + 1, line.length);
        line_tuples.push([prefix, suffix])
        
    })
    return line_tuples;
}

async function load_gallery_images() {
    const line_tuples = await readFile('images/image_data.txt');

    // Assumption that both files have the same number of lines
    for (let i = 0; i < line_tuples.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'img-box';


        newDiv.innerHTML = `
                            <img src="${line_tuples[i][0]}" class="gallery-img" alt="ro.jpg">
                            <p class="img-desc">${line_tuples[i][1]}</p>`
        document.querySelector('.horizontal-div').append(newDiv);
    }

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
}

load_gallery_images();
