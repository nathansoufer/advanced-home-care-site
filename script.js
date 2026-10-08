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
      { src: 'assets/photos/care-home-1.jpg', alt: 'Exterior walkway at Advanced Home Care Senior Living LLC in Woodland Hills', caption: '5826 Jumilla Avenue, Woodland Hills.' },
      { src: 'assets/photos/care-home-1-living.jpg', alt: 'Living and dining room at Advanced Home Care Senior Living LLC', caption: 'Shared living and dining space.' },
      { src: 'assets/photos/care-home-1-bedroom.jpg', alt: 'Bedroom at Advanced Home Care Senior Living LLC', caption: 'Resident bedroom.' }
    ]
  },
  gladbeck: {
    title: 'Advanced Home Care Senior Living 2 LLC',
    photos: [
      { src: 'assets/photos/care-home-2.jpg', alt: 'Patio at Advanced Home Care Senior Living 2 LLC in Northridge', caption: '10109 Gladbeck Ave, Northridge, CA 91324.' },
      { src: 'assets/photos/care-home-2-living.jpg', alt: 'Living room at Advanced Home Care Senior Living 2 LLC', caption: 'Comfortable living room.' },
      { src: 'assets/photos/care-home-2-patio.jpg', alt: 'Garden patio seating at Advanced Home Care Senior Living 2 LLC', caption: 'Outdoor patio seating.' }
    ]
  },
  deveron: {
    title: 'Advanced Senior Living LLC',
    photos: [
      { src: 'assets/photos/care-home-3.jpg', alt: 'Living room at Advanced Senior Living LLC in West Hills', caption: '7017 Deveron Ridge Rd, West Hills, CA 91306.' },
      { src: 'assets/photos/care-home-3-living.jpg', alt: 'Sofa seating area at Advanced Senior Living LLC', caption: 'Shared living room.' },
      { src: 'assets/photos/care-home-3-patio.jpg', alt: 'Covered patio at Advanced Senior Living LLC', caption: 'Covered patio.' },
      { src: 'assets/photos/care-home-3-dining.jpg', alt: 'Dining area at Advanced Senior Living LLC', caption: 'Dining area.' }
    ]
  },
  raymer: {
    title: 'Advanced Senior Living 2 LLC',
    photos: [
      { src: 'assets/photos/care-home-4.jpg', alt: 'Common room at Advanced Senior Living 2 LLC in Sherwood Forest', caption: '17241 Raymer St, Sherwood Forest, CA 91325.' },
      { src: 'assets/photos/care-home-4-bedroom-blue.jpg', alt: 'Blue bedroom at Advanced Senior Living 2 LLC', caption: 'Resident bedroom.' },
      { src: 'assets/photos/care-home-4-bedroom-white.jpg', alt: 'White bedroom at Advanced Senior Living 2 LLC', caption: 'Resident bedroom.' }
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
