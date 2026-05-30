document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Check current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    });

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    
    // Trigger once on load
    revealOnScroll();

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const projectCloseBtn = document.getElementById('project-close-btn');
    const projectGallery = document.getElementById('project-gallery');
    const viewButtons = document.querySelectorAll('.view-project-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = btn.getAttribute('data-image');
            const title = btn.getAttribute('data-title');
            const galleryData = btn.getAttribute('data-gallery');
            
            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            
            // Make main image clickable for lightbox
            modalImage.style.cursor = 'pointer';
            modalImage.onclick = () => {
                openLightbox(imgSrc, title);
            };
            
            // Parse gallery images
            const galleryImages = galleryData ? galleryData.split(',').filter(img => img.trim()) : [];
            
            // Display gallery
            if (galleryImages.length > 0) {
                projectGallery.innerHTML = '';
                galleryImages.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc.trim();
                    img.alt = `Gallery image ${index + 1}`;
                    img.style.cursor = 'pointer';
                    img.addEventListener('click', () => {
                        openLightbox(imgSrc.trim(), `${title} - Page ${index + 2}`);
                    });
                    projectGallery.appendChild(img);
                });
            } else {
                projectGallery.innerHTML = '';
            }
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modalImage.src = '';
            projectGallery.innerHTML = '';
        }, 300);
    };

    projectCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Video Modal Logic
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const videoModalTitle = document.getElementById('video-modal-title');
    const videoCloseBtn = document.getElementById('video-close-btn');
    const viewVideoButtons = document.querySelectorAll('.view-video-btn');

    viewVideoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoSrc = btn.getAttribute('data-video');
            const title = btn.getAttribute('data-title');
            
            modalVideo.querySelector('source').src = videoSrc;
            modalVideo.load();
            videoModalTitle.textContent = title;
            videoModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            modalVideo.play();
        });
    });

    const closeVideoModal = () => {
        videoModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        modalVideo.pause();
        setTimeout(() => {
            modalVideo.querySelector('source').src = '';
            modalVideo.load();
        }, 300);
    };

    videoCloseBtn.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('show')) {
            closeVideoModal();
        }
    });

    // Auto-play video preview on hover
    const projectVideos = document.querySelectorAll('.project-image video');
    projectVideos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Award Modal Logic
    const awardModal = document.getElementById('award-modal');
    const awardModalTitle = document.getElementById('award-modal-title');
    const awardModalCertificate = document.getElementById('award-modal-certificate');
    const awardGallery = document.getElementById('award-gallery');
    const awardCloseBtn = document.getElementById('award-close-btn');
    const viewAwardButtons = document.querySelectorAll('.view-award-btn');

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    function openLightbox(imgSrc, caption = '') {
        lightboxImage.src = imgSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            lightboxImage.src = '';
            lightboxCaption.textContent = '';
        }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxImage) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });

    viewAwardButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const certificateSrc = btn.getAttribute('data-certificate');
            const title = btn.getAttribute('data-title');
            const galleryData = btn.getAttribute('data-gallery');
            
            awardModalTitle.textContent = title;
            awardModalCertificate.src = certificateSrc;
            
            // Make certificate clickable for lightbox
            awardModalCertificate.style.cursor = 'pointer';
            awardModalCertificate.onclick = () => {
                openLightbox(certificateSrc, title);
            };
            
            // Parse gallery images
            const galleryImages = galleryData ? galleryData.split(',').filter(img => img.trim()) : [];
            
            // Display gallery
            if (galleryImages.length > 0) {
                awardGallery.innerHTML = '';
                galleryImages.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc.trim();
                    img.alt = `Gallery image ${index + 1}`;
                    img.style.cursor = 'pointer';
                    img.addEventListener('click', () => {
                        openLightbox(imgSrc.trim(), `${title} - Photo ${index + 1}`);
                    });
                    awardGallery.appendChild(img);
                });
            } else {
                awardGallery.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No additional images available</p>';
            }
            
            awardModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeAwardModal = () => {
        awardModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            awardModalCertificate.src = '';
            awardGallery.innerHTML = '';
        }, 300);
    };

    awardCloseBtn.addEventListener('click', closeAwardModal);

    awardModal.addEventListener('click', (e) => {
        if (e.target === awardModal) {
            closeAwardModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && awardModal.classList.contains('show')) {
            closeAwardModal();
        }
    });

    // Hamburger Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});
