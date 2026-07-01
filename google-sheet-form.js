const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzik-S4ESA3VQWsa8efNk9MNYSX93QcvDV_zF4AUtL4MzIxUs8ZGX8kVQNbujDXMc-xyA/exec';

document.querySelectorAll('form[data-google-sheet-form]').forEach((form) => {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const originalButton = button.innerHTML;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (!GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/macros/s/')) {
      status.textContent = 'Form setup is not complete yet. Please try again later.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Submitting…';
    status.textContent = '';

    const data = new FormData(form);
    data.set('form_type', form.dataset.formType);
    data.set('page_url', window.location.href);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(data)
      });

      form.reset();
      status.textContent = form.dataset.successMessage;
    } catch (error) {
      status.textContent = 'We could not submit the form. Please check your connection and try again.';
    } finally {
      button.disabled = false;
      button.innerHTML = originalButton;
    }
  });
});
