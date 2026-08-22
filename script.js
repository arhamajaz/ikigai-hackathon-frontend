/**
 * SentinelEdge Enterprise Landing Page — Vanilla JS Script
 * Authoritative, Lightweight, Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initJitSandbox();
  initVideoPlayer();
  initDownloadHandlers();
  initPrivacyModal();
});

/* ==========================================================================
   1. Interactive JIT Masking Engine Sandbox
   ========================================================================== */
function initJitSandbox() {
  const inputEl = document.getElementById('sandbox-input');
  const outputEl = document.getElementById('sandbox-output');

  if (!inputEl || !outputEl) return;

  // Regex patterns for enterprise data redacting
  const patterns = [
    {
      name: 'API_KEY',
      regex: /\b(sk_live_[a-zA-Z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{36})\b/g,
      label: '[REDACTED_API_KEY]'
    },
    {
      name: 'EMAIL',
      regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
      label: '[REDACTED_EMAIL]'
    },
    {
      name: 'SSN',
      regex: /\b\d{3}-\d{2}-\d{4}\b/g,
      label: '[REDACTED_SSN]'
    },
    {
      name: 'CREDIT_CARD',
      regex: /\b(?:\d[ -]*?){13,16}\b/g,
      label: '[REDACTED_CREDIT_CARD]'
    }
  ];

  function processMasking() {
    let text = inputEl.value;

    // Escape HTML entities to prevent XSS in demo
    let safeText = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Apply regex redactions
    patterns.forEach(item => {
      safeText = safeText.replace(item.regex, `<span class="redacted-tag">${item.label}</span>`);
    });

    outputEl.innerHTML = safeText;
  }

  inputEl.addEventListener('input', processMasking);
  // Initial run
  processMasking();
}

/* ==========================================================================
   2. Video Player Custom Overlay Handler
   ========================================================================== */
function initVideoPlayer() {
  const overlayEl = document.getElementById('video-overlay');
  const videoEl = document.getElementById('sentinel-video-player');

  if (!overlayEl || !videoEl) return;

  function startVideo() {
    overlayEl.style.opacity = '0';
    overlayEl.style.pointerEvents = 'none';
    videoEl.play().catch(err => {
      console.log('Video play deferred or fallback source in use:', err);
    });
  }

  overlayEl.addEventListener('click', startVideo);

  overlayEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startVideo();
    }
  });

  videoEl.addEventListener('pause', () => {
    if (videoEl.currentTime === 0) {
      overlayEl.style.opacity = '1';
      overlayEl.style.pointerEvents = 'auto';
    }
  });
}

/* ==========================================================================
   3. Download Button Actions & Toast Notifications
   ========================================================================== */
function initDownloadHandlers() {
  const chromeBtn = document.getElementById('btn-download-chrome');
  const pdfBtn = document.getElementById('btn-download-pdf');

  if (chromeBtn) {
    chromeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('🚀 SentinelEdge v2.4 LTS package ready! Check sideload quickstart guide below.');
      
      // Smooth scroll to documentation after toast
      setTimeout(() => {
        const docSection = document.getElementById('documentation');
        if (docSection) {
          docSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    });
  }

  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      showToast('📄 Downloading SentinelEdge Enterprise User Guide (PDF)...');
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-yellow)" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   4. Privacy Policy Modal Handler
   ========================================================================== */
function initPrivacyModal() {
  const privacyLink = document.getElementById('link-privacy');
  const modalEl = document.getElementById('privacy-modal');
  const closeBtn = document.getElementById('modal-close');

  if (!privacyLink || !modalEl || !closeBtn) return;

  function openModal(e) {
    e.preventDefault();
    modalEl.classList.add('active');
  }

  function closeModal() {
    modalEl.classList.remove('active');
  }

  privacyLink.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl.classList.contains('active')) {
      closeModal();
    }
  });
}
