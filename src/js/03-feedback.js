import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

function initializeForm() {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedState) {
    const { email, message } = JSON.parse(savedState);
    form.elements.email.value = email || '';
    form.elements.message.value = message || '';
  }
}

initializeForm();

function saveFormState() {
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  const state = { email, message };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

form.addEventListener('input', throttle(saveFormState, 500));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  form.reset();
});
