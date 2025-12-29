function openModal(title, desc) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal').classList.add('show');
}
function closeModal(e){
  if (!e || e.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.remove('show');
  }
}

// Simple contact form handler
function submitForm(event) {
  event.preventDefault();
  const name = event.target.name.value.trim();
  document.getElementById('form-msg').textContent = `Thank you, ${name}! We’ve received your message and will contact you soon.`;
  event.target.reset();
  return false;
}

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.events-toggle');
  if (!btn) return;
  const panelId = btn.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  if (!panel) return;

  function expandPanel() {
    panel.hidden = false;
    // set to 0 first to ensure transition
    panel.style.maxHeight = '0px';
    requestAnimationFrame(() => {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Hide upcoming events ▴';

    // after transition, remove explicit max-height so content can grow
    const onEnd = function () {
      panel.style.maxHeight = 'none';
      panel.removeEventListener('transitionend', onEnd);
    };
    panel.addEventListener('transitionend', onEnd);
  }

  function collapsePanel() {
    // set a fixed maxHeight to allow transition from current height
    panel.style.maxHeight = panel.scrollHeight + 'px';
    requestAnimationFrame(() => {
      panel.style.maxHeight = '0px';
    });
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Show upcoming events ▾';

    const onEnd = function () {
      panel.hidden = true;
      // clear inline styles
      panel.style.maxHeight = '';
      panel.removeEventListener('transitionend', onEnd);
    };
    panel.addEventListener('transitionend', onEnd);
  }

  btn.addEventListener('click', function () {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if (expanded) collapsePanel();
    else expandPanel();
  });

  // keep open panel height correct on resize
  window.addEventListener('resize', function () {
    if (btn.getAttribute('aria-expanded') === 'true' && !panel.hidden) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});