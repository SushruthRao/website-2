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
