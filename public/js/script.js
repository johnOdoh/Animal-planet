let slideindex = 0;

function slides() {
    const images = document.getElementsByClassName('imgs');
    const dots = document.getElementsByClassName('dots');
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    slideindex++;
    if (slideindex > images.length) {
        slideindex = 1;
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    images[slideindex - 1].style.display = "block";
    dots[slideindex - 1].className += " active-dot";

    setTimeout(slides, 5000)
}
slides();