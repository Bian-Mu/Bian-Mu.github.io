const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgName = [];
for (var i = 1; i <= 5; i++) {
    imgName.push(`pic${i}.jpg`);
}

/* Declaring the alternative text for each image file */
const alts = {
    'pic1.jpg': 'Closeup of a human eye',
    'pic2.jpg': 'Rock that looks like a wave',
    'pic3.jpg': 'Purple and white pansies',
    'pic4.jpg': 'Section of wall from a pharoah\'s tomb',
    'pic5.jpg': 'Large moth on a leaf'
}
/* Looping through images */
imgName.forEach(img => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `./images/${img}`);
    newImage.setAttribute('alt', alts[img]);

    newImage.addEventListener('click', (e) => {
        var newSrc = e.currentTarget.src;
        document.querySelector(".displayed-img").src = newSrc;
    })

    thumbBar.appendChild(newImage);
});



/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    var lightness = btn.getAttribute('class');
    if (lightness === 'dark') {
        btn.setAttribute('class', "light");
        btn.textContent = "lighten";
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
        btn.setAttribute('class', "dark");
        btn.textContent = "Darken";
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
})

