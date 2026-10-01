const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const galleries = {
  jumilla: {
    title: 'Advanced Home Care Senior Living LLC',
    photos: [
      { src: 'assets/photos/care-home-1.jpg', alt: 'Advanced Home Care Senior Living LLC exterior at 5826 Jumilla Avenue in Woodland Hills', caption: '5826 Jumilla Avenue, Woodland Hills.' }
    ]
  },
  gladbeck: {
    title: 'Advanced Home Care Senior Living 2 LLC',
    photos: [
      { src: 'assets/photos/care-home-2.jpg', alt: 'Advanced Home Care Senior Living 2 LLC exterior at 10109 Gladbeck Avenue in Northridge', caption: '10109 Gladbeck Ave, Northridge, CA 91324.' }
    ]
  },
  deveron: {
    title: 'Advanced Senior Living LLC',
    photos: [
      { src: 'assets/photos/care-home-3.jpg', alt: 'Advanced Senior Living LLC exterior at 7017 Deveron Ridge Road in West Hills', caption: '7017 Deveron Ridge Rd, West Hills, CA 91306.' }
    ]
  },
  raymer: {
    title: 'Advanced Senior Living 2 LLC',
    photos: [
      { src: 'assets/photos/care-home-4.jpg', alt: 'Advanced Senior Living 2 LLC exterior at 17241 Raymer Street in Sherwood Forest', caption: '17241 Raymer St, Sherwood Forest, CA 91325.' }
    ]
  }
};

const modal = document.getElementById('galleryModal');
const galleryTitle = document.getElementById('galleryTitle');
const galleryImage = document.getElementById('galleryImage');
const galleryCaption = document.getElementById('galleryCaption');
const photoCount = document.getElementById('photoCount');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');
let activeGallery = null;
let activeIndex = 0;

function renderPhoto() {
  if (!activeGallery) return;
  const photo = activeGallery.photos[activeIndex];
  galleryTitle.textContent = activeGallery.title;
  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryCaption.textContent = photo.caption;
  photoCount.textContent = `${activeIndex + 1} / ${activeGallery.photos.length}`;
  const hasMultiplePhotos = activeGallery.photos.length > 1;
  if (prevPhoto) prevPhoto.hidden = !hasMultiplePhotos;
  if (nextPhoto) nextPhoto.hidden = !hasMultiplePhotos;
  if (photoCount) photoCount.hidden = !hasMultiplePhotos;
}

function openGallery(key) {
  activeGallery = galleries[key];
  activeIndex = 0;
  renderPhoto();
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-gallery]').forEach((button) => {
  button.addEventListener('click', () => openGallery(button.dataset.gallery));
});

document.querySelectorAll('[data-close]').forEach((el) => {
  el.addEventListener('click', closeGallery);
});

prevPhoto?.addEventListener('click', () => {
  if (!activeGallery) return;
  activeIndex = (activeIndex - 1 + activeGallery.photos.length) % activeGallery.photos.length;
  renderPhoto();
});

nextPhoto?.addEventListener('click', () => {
  if (!activeGallery) return;
  activeIndex = (activeIndex + 1) % activeGallery.photos.length;
  renderPhoto();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) closeGallery();
});
