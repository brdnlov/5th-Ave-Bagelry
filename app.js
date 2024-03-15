const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const orderMenu = document.querySelector('#order-page');
    const menuMenu = document.querySelector('#menu-page');
    const locationMenu = document.querySelector('#location-page');
    let scrollPos = window.scrollY;
    console.log(scrollPos);

// adds 'highlight' class to my menu items
if(window.innerWidth > 960 && scrollPos < 600){ 
    homeMenu.classList.add('highlight');
    menuMenu.classList.remove('highlight');
    return;
} else if (window.innerWidth > 960 && scrollPos < 1400){
    orderMenu.classList.add('highlight');
    homeMenu.classList.remove('hightlight');
    menuMenu.classList.remove('highlight');
    locationMenu.classList.remove('highlight');
    return;

} else if (window.innerWidth > 960 && scrollPos < 1900) {
    menuMenu.classList.add('highlight');
    orderMenu.classList.add('highlight');
    homeMenu.classList.remove('hightlight');
    locationMenu.classList.remove('highlight');
    return;

} else if (window.innerWidth > 960 && scrollPos < 2300) {
    locationMenu.classList.add('highlight');
    menuMenu.classList.remove('highlight');
    orderMenu.classList.add('highlight');
    homeMenu.classList.remove('hightlight');
    return;
}

if((elem && window.innerWidth < 960 && scrollPos < 600 || elem)){
    elem.classList.remove('highlight');
}
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 768 && menuBars) {
      menu.classList.toggle('is-active');
      menuLinks.classList.remove('active');
    }
  };
  
  menuLinks.addEventListener('click', hideMobileMenu);
  navLogo.addEventListener('click', hideMobileMenu);

//   Auto sliding animation
  var counter = 1;
  setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
        counter = 1;
    }
  }, 5000);