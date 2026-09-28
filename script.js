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
  rosewood: {
    title: 'Rosewood Residence',
    photos: [
      { src: 'assets/photos/home-rosewood-exterior.jpg', alt: 'Rosewood Residence accessible front exterior with landscaped walkway', caption: 'A warm residential exterior with a covered entry, accessible path, and peaceful landscaping.' },
      { src: 'assets/photos/home-rosewood-living.jpg', alt: 'Rosewood Residence open living and dining common area', caption: 'A bright shared living and dining space for family visits, daily routines, and comfort.' }
    ]
  },
  willow: {
    title: 'Willow House',
    photos: [
      { src: 'assets/photos/home-willow-exterior.jpg', alt: 'Willow House two-story senior living residence with accessible front walkway', caption: 'A charming care home exterior with a front porch, garden, and accessible entry.' },
      { src: 'assets/photos/home-willow-bedroom.jpg', alt: 'Willow House accessible bedroom and sitting area', caption: 'A calm private bedroom with comfortable seating, warm finishes, and senior-friendly details.' }
    ]
  },
  garden: {
    title: 'Garden View Home',
    photos: [
      { src: 'assets/photos/home-garden-exterior.jpg', alt: 'Garden View Home modern senior living exterior with landscaped drive', caption: 'A modern care home exterior with clean landscaping and a premium, peaceful feel.' },
      { src: 'assets/photos/home-garden-courtyard.jpg', alt: 'Garden View Home sunny courtyard with patio and garden walking path', caption: 'A serene courtyard and garden patio with accessible walking paths and shaded seating.' }
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
