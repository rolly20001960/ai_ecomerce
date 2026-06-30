const navLinks = document.querySelectorAll('nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    console.log(`Navigation vers ${link.textContent}`);
  });
});
