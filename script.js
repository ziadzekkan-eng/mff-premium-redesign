const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const cartCount = document.querySelector('.cart-count');
const toast = document.querySelector('.toast');
const newsletterForm = document.querySelector('.newsletter-form');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('is-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

let itemsInCart = 0;

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    itemsInCart += 1;
    cartCount.textContent = String(itemsInCart);
    const productName = button.dataset.product || 'Product';
    showToast(`${productName} added to your bag.`);
  });
});

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector('input[type="email"]');
  if (!input?.value) return;
  showToast('Thank you. You are now subscribed.');
  newsletterForm.reset();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2800);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});