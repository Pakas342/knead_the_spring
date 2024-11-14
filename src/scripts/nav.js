document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
 
    // Toggle menu
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
 
    // Close when clicking menu items
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
 
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
 
    function toggleMenu() {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
    }
 
    function closeMenu() {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
    }
 });