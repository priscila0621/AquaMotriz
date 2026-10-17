document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const dashboardDateNode = document.querySelector('[data-current-date]');
  if (dashboardDateNode) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    dashboardDateNode.textContent = `● ${formatter.format(now)}`;
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('.brand-mark').forEach(img => {
    const realLogo = 'assets/logo-real.png';
    const fallbackLogo = 'assets/aquamotriz-logo.svg';
    const testImage = new Image();

    testImage.onload = () => {
      img.src = realLogo;
    };

    testImage.onerror = () => {
      img.src = fallbackLogo;
    };

    testImage.src = realLogo;
  });

  const tabs = document.querySelectorAll('.iot-tab');
  const panels = document.querySelectorAll('.iot-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selected = tab.dataset.iotTab;

      tabs.forEach(button => {
        button.classList.toggle('is-active', button === tab);
      });

      panels.forEach(panel => {
        const matches = panel.dataset.iotPanel === selected;
        panel.classList.toggle('is-active', matches);
      });
    });
  });

  const modal = document.getElementById('videoModal');
  const trigger = document.querySelector('.play-video-trigger');
  const closeButton = document.querySelector('.close-video-modal');
  const video = modal ? modal.querySelector('video') : null;

  if (trigger && modal) {
    trigger.addEventListener('click', () => {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    });
  }

  if (closeButton && modal) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      if (video) {
        video.pause();
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        if (video) {
          video.pause();
        }
      }
    });
  }
});
