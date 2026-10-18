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
        galleryStatus.textContent = `Showing ${visibleCount} ${filterLabel.toLowerCase()} ${photographLabel}.`;
      }
    });
  });

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
