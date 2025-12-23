const leftGalleryButton = document.getElementById("left-button-gallery");
const rightGalleryButton = document.getElementById("right-button-gallery");
const galleryItemOne = document.getElementById("gallery-item-one");
const galleryItemTwo = document.getElementById("gallery-item-two");
const galleryItemThree = document.getElementById("gallery-item-three");

var gallery = [
  "<img src='http://placehold.co/200x300?text=Placeholder+1'/>",
  "<img src='http://placehold.co/200x300?text=Placeholder+2'/>",
  "<img src='http://placehold.co/200x300?text=Placeholder+3'/>",
  "<img src='http://placehold.co/200x300?text=Placeholder+4'/>",
  "<img src='http://placehold.co/200x300?text=Placeholder+5'/>",
  "<img src='http://placehold.co/200x300?text=Placeholder+6'/>",
  "<img src='http://placehold.co/200x300?text=Placeholder+7'/>",
  "<img src='http://placehold.co/200x300?text=Placeholder+8'/>",
  "<img src='http://placehold.co/200x300?text=Placeholder+9'/>",
];
var index1 = 0;
var index2 = 1;
var index3 = 2;

function addEventListeners() {
    rightGalleryButton.addEventListener("click", rightGalleryButtonClicked);
    leftGalleryButton.addEventListener("click", leftGalleryButtonClicked);
}

function rightGalleryButtonClicked() {
  galleryItemOne.innerHTML = gallery[index1 + 3];
  index1 += 3;
  galleryItemTwo.innerHTML = gallery[index2 + 3];
  index2 += 3;
  galleryItemThree.innerHTML = gallery[index3 + 3];
  index3 += 3;
  if (index3 >= gallery.length) {
    galleryItemOne.innerHTML = gallery[0];
    index1 = 0;
    galleryItemTwo.innerHTML = gallery[1];
    index2 = 1;
    galleryItemThree.innerHTML = gallery[2];
    index3 = 2;
  }
}

function leftGalleryButtonClicked() {
  galleryItemOne.innerHTML = gallery[index1 - 3];
  index1 -= 3;
  galleryItemTwo.innerHTML = gallery[index2 - 3];
  index2 -= 3;
  galleryItemThree.innerHTML = gallery[index3 - 3];
  index3 -= 3;
  if (index3 < 0) {
    galleryItemOne.innerHTML = gallery[6];
    index1 = 6;
    galleryItemTwo.innerHTML = gallery[7];
    index2 = 7;
    galleryItemThree.innerHTML = gallery[8];
    index3 = 8;
  }
}

galleryItemOne.innerHTML = gallery[0];
galleryItemTwo.innerHTML = gallery[1];
galleryItemThree.innerHTML = gallery[2];

addEventListeners();