(() => {
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryStatus = document.querySelector('#gallery-status');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle('active', isActive);
        filterButton.setAttribute('aria-pressed', String(isActive));
      });

      galleryCards.forEach((card) => {
        const isVisible = selectedFilter === 'all' || card.dataset.category === selectedFilter;
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      if (galleryStatus) {
        const filterLabel = button.textContent.trim();
        const photographLabel = visibleCount === 1 ? 'photograph' : 'photographs';
        const filterContext = selectedFilter === 'all' ? '' : ` in ${filterLabel}`;
        galleryStatus.textContent = `Showing ${visibleCount} ${photographLabel}${filterContext}.`;
      }
    });
  });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('.lightbox-image');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  if (lightbox && typeof lightbox.showModal === 'function' && lightboxImage && lightboxClose) {
    document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const thumbnail = trigger.querySelector('img');
        const card = trigger.closest('.gallery-card');
        const title = card?.querySelector('h3')?.textContent.trim() ?? '';
        const details = card?.querySelector('.card-meta p')?.textContent.trim() ?? '';

        lightboxImage.src = trigger.href;
        lightboxImage.alt = thumbnail?.alt ?? title;
        if (lightboxCaption) {
          lightboxCaption.textContent = [title, details].filter(Boolean).join(' · ');
        }
        lightbox.showModal();
      });
    });

    lightboxClose.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('#site-nav');

  if (menuToggle && siteNav) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      siteNav.classList.remove('is-open');
    };

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
      siteNav.classList.toggle('is-open', !isExpanded);
    });

    siteNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
  }

  const currentYear = String(new Date().getFullYear());
  const year = document.querySelector('#year');
  const portfolioYear = document.querySelector('#portfolio-year');

  if (year) year.textContent = currentYear;
  if (portfolioYear) portfolioYear.textContent = currentYear;
})();
