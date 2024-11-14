document.addEventListener('DOMContentLoaded', () => {
    const footerParagraph = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    const copyright = 'Knead The Spring. Growing the love in Sydney';
    footerParagraph.textContent = "© " + currentYear + " " + copyright;
});