const navigation = document.querySelector('.navigation');
const navMenu = document.querySelector('.nav-lines');
const closeNav = document.querySelector('.close');
const links = document.querySelectorAll('.nav-menu a');

navMenu.addEventListener('click', () => {
    navigation.classList.add('navigation_show');
});

closeNav.addEventListener('click', () => {
    navigation.classList.remove('navigation_show');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navigation.classList.remove('navigation_show');
    });
});