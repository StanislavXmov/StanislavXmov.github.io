import './scss/style.scss';

const hardBtn = document.querySelector('[data-hard="skills"]');
const softBtn = document.querySelector('[data-soft="skills"]');

const createPopup = (cl, content) => {
  let popupEl;
  if (!document.querySelector('.popup-wraper')) {
    popupEl = document.createElement('div');
    popupEl.dataset.popup = 'close';
    document.body.append(popupEl);
    popupEl.classList.add('popup-wraper');
    popupEl.addEventListener('click', e => {
      if (e.target.dataset.popup === 'close') {
        popupEl.style.display = 'none';
        popupEl.innerHTML = '';
      }
    });
  } else {
    popupEl = document.querySelector('.popup-wraper');
  }
  const popup = `
    <div class="popup ${cl}">
      <h2>${content.title}</h2>
      ${content.skills.map(s => `<span>${s}</span>`).join('')}
      <button data-popup="close">Ok</button>
    </div>
  `;
  popupEl.innerHTML = popup;
  popupEl.style.display = 'flex';
  
}

hardBtn.addEventListener('click', () => createPopup('popup-hard', {title:'Hard Skills', skills: ['HTML+CSS', 'SCSS', 'Pure JS (ES8+)', 'Webpack', 'React', 'Redux', 'Next', 'NodeJS', 'Git', 'SVG', 'Figma']}));
softBtn.addEventListener('click', () => createPopup('popup-soft', {title:'Soft Skills', skills: ['Креативность', 'Мотивация', 'Адаптивность', 'Умение слушать', 'Эмпатия']}));
