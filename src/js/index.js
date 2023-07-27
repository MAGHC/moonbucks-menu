import { $ } from './utils/dom.js';
import { store } from './store/index.js';

function App() {
  let menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  let currentCategory = 'espresso';

  const render = () => {
    const template = menu[currentCategory]
      .map((item, key) => {
        return `<li data-menuId=${key} class="menu-list-item d-flex items-center py-2">
    <span  class=" ${item.soldOut ? 'sold-out' : ''} w-100 pl-2 menu-name">${item.name}</span>
    <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`;
      })
      .join('');
    $(`#menu-list`).innerHTML = template;

    updateMenuCount();
  };

  const addMenuName = () => {
    const menuName = $('#menu-name').value;

    menu[currentCategory].push({ name: menuName });

    store.setLocalStorage(menu);

    if (menuName === '') {
      alert('빈값X');
      return;
    }

    $('#menu-name').value = '';
    render();
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest('li').dataset.menuid;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    console.log($menuName);
    const edittedValud = prompt('이름변경', $menuName.innerText);
    menu[currentCategory][menuId].name = edittedValud;
    store.setLocalStorage(menu);
    render();
  };

  const removeMenuName = (e) => {
    const confirmed = confirm('삭제?');
    if (confirmed) {
      const menuId = e.target.closest('li').dataset.menuid;
      menu[currentCategory].splice(menuId, 1);

      store.setLocalStorage(menu);

      render();
    }
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuid;
    menu[currentCategory][menuId].soldOut = !menu[currentCategory][menuId].soldOut;
    store.setLocalStorage(menu);
    render();
  };

  const updateMenuCount = () => {
    $('.menu-count').innerHTML = `총 ${menu[currentCategory].length}개`;
  };

  const initEventListener = () => {
    $('#menu-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-edit-button')) {
        updateMenuName(e);
        return;
      }

      if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e);
        return;
      }

      if (e.target.classList.contains('menu-sold-out-button')) {
        soldOutMenu(e);
        return;
      }
    });

    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#menu-submit-button').addEventListener('click', addMenuName);

    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return;
      addMenuName(e);
    });

    $('nav').addEventListener('click', (e) => {
      const isCategoryBtn = e.target.classList.contains('cafe-category-name');

      if (isCategoryBtn) {
        const categoryName = e.target.dataset.categoryName;
        currentCategory = categoryName;

        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
      return;
    });
  };

  const init = () => {
    if (store.getLocalStorage()) {
      menu = store.getLocalStorage();
      render();
      initEventListener();
    }
  };

  init();
}

App();
