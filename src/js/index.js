const leftGalleryButton = document.getElementById("left-button-gallery");
const rightGalleryButton = document.getElementById("right-button-gallery");
const galleryItem = document.getElementById("gallery-item");

var gallery = [
  "<img src='http://placehold.co/900x600?text=Placeholder+1' loading='eager'/>",
  "<img src='http://placehold.co/900x600?text=Placeholder+2' loading='eager'/>",
  "<img src='http://placehold.co/900x600?text=Placeholder+3' loading='eager'/>",
  "<img src='http://placehold.co/900x600?text=Placeholder+4' loading='eager'/>",
  "<img src='http://placehold.co/900x600?text=Placeholder+5' loading='eager'/>",
  "<img src='http://placehold.co/900x600?text=Placeholder+6' loading='eager'/>",
  "<img src='http://placehold.co/900x600?text=Placeholder+7' loading='eager'/>",
  "<img src='http://placehold.co/900x600?text=Placeholder+8' loading='eager'/>",
  "<img src='http://placehold.co/900x600?text=Placeholder+9' loading='eager'/>",
];

function addEventListeners() {
    rightGalleryButton.addEventListener("click", rightGalleryButtonClicked);
    leftGalleryButton.addEventListener("click", leftGalleryButtonClicked);
}

function rightGalleryButtonClicked() {
  galleryItem.innerHTML = gallery[index + 1];
  index++;
  if (index >= gallery.length) {
    galleryItem.innerHTML = gallery[0];
    index = 0;
  }
}

function leftGalleryButtonClicked() {
  galleryItem.innerHTML = gallery[index - 1];
  index--;
  if (index < 0) {
    galleryItem.innerHTML = gallery[8];
    index = 8;
  }
}

galleryItem.innerHTML = gallery[0];
var index = 0;

addEventListeners();