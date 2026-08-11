const openButton = document.querySelector('[data-menu-open]');
const menu = document.querySelector('#mobile-menu');
const closeButton = document.querySelector('[data-menu-close]');

if (openButton && menu && closeButton) {
  const menuLinks = menu.querySelectorAll('a[href]');
  const focusableElements = menu.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );

  const openMenu = () => {
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    openButton.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    closeButton.focus();
  };

  const closeMenu = () => {
    const wasOpen = menu.classList.contains('is-open');

    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    openButton.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');

    if (wasOpen && window.innerWidth < 768) {
      openButton.focus();
    }
  };

  const handleMenuKeydown = event => {
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    if (event.key !== 'Tab' || focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));
  menu.addEventListener('keydown', handleMenuKeydown);

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}
