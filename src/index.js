import './scss/style.scss';

const hardBtn = document.querySelector('[data-hard="skills"]');
const softBtn = document.querySelector('[data-soft="skills"]');
const contact = document.getElementById('contact');

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
      ${content.content ? content.content.map(s => `<span>${s}</span>`).join('') : ''}
      <button data-popup="close">Ok</button>
    </div>
  `;
  popupEl.innerHTML = popup;
  popupEl.style.display = 'flex';

  
}

hardBtn.addEventListener('click', () => createPopup('popup-hard', {title:'Hard Skills', content: ['HTML+CSS', 'SCSS', 'Pure JS (ES8+)', 'Webpack', 'React', 'Redux', 'Next', 'NodeJS', 'Git', 'SVG', 'Figma']}));
softBtn.addEventListener('click', () => createPopup('popup-soft', {title:'Soft Skills', content: ['Креативность', 'Мотивация', 'Адаптивность', 'Умение слушать', 'Эмпатия']}));
contact.addEventListener('click', () => createPopup('popup-contact', {title:'Contact', content: [
  `<div style="display: flex; flex-direction: column; align-items: center;"><svg width="60" height="60" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10.5" y="10.5" width="299" height="299" rx="26.5" stroke="#3c3c3c" stroke-width="21"/>
  <path d="M40 153.5L279.5 65L216 272.5L151 202L279.5 65L115 176.5L40 153.5Z" fill="#3c3c3c"/>
  <path d="M279.5 65L40 153.5L115 176.5L279.5 65ZM279.5 65L151 202L216 272.5L279.5 65Z" stroke="#3c3c3c"/>
  </svg><a style="font-size: 2rem;" href="https://t.me/stanislav_Xmov">Telegram</a></div>`,
  `<div style="display: flex; flex-direction: column; align-items: center;"><svg width="60" height="60" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="10.5" y="10.5" width="299" height="299" rx="26.5" stroke="#3c3c3c" stroke-width="21"/>
  <path d="M258.5 248V71L159.75 154.5L61 71V248H159.75H258.5Z" fill="#3c3c3c"/>
  <path d="M248 71L159.75 143L71.5 71H248Z" fill="#3c3c3c"/>
  <path d="M258.5 248V71L159.75 154.5L61 71V248H159.75H258.5Z" stroke="#3c3c3c"/>
  <path d="M248 71L159.75 143L71.5 71H248Z" stroke="#3c3c3c"/>
  </svg>
  
  <a style="font-size: 2rem;" href="mailto:xiiiovart@gmail.com">xiiiovart@gmail.com</a></div>`,
]}));



