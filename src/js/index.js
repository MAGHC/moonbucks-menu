import { $ } from './utils/dom.js';
import { store } from './store/index.js';
import MenuApi from './api/index.js';

function App() {
  let menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  let currentCategory = 'espresso';

  const render = async () => {
    menu[currentCategory] = await MenuApi.getAllMenuByCategory(currentCategory);

    const template = menu[currentCategory]
      .map((item) => {
        return `<li data-menuId=${item.id} class="menu-list-item d-flex items-center py-2">
    <span  class=" ${item.isSoldOut ? 'sold-out' : ''} w-100 pl-2 menu-name">${item.name}</span>
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

  const addMenuName = async () => {
    const menuName = $('#menu-name').value;

    if (menuName === '') {
      alert('빈값X');
      return;
    }

    const isExist = menu[currentCategory].find((menuItem) => menuItem.name === menuName);
    if (isExist) {
      alert('이미있다');
      return;
    }

    await MenuApi.createMenu(menuName, currentCategory);

    $('#menu-name').value = '';
    render();
  };

  const updateMenuName = async (e) => {
    const menuId = e.target.closest('li').dataset.menuid;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const edittedValud = prompt('이름변경', $menuName.innerText);
    await MenuApi.updateMenu(currentCategory, edittedValud, menuId);
    render();
  };

  const removeMenuName = async (e) => {
    const confirmed = confirm('삭제?');
    if (confirmed) {
      const menuId = e.target.closest('li').dataset.menuid;
      await MenuApi.deleteMenu(currentCategory, menuId);
      render();
    }
  };

  const soldOutMenu = async (e) => {
    const menuId = e.target.closest('li').dataset.menuid;

    await MenuApi.toggleSoldOutMenu(currentCategory, menuId);
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

    const changeCategory = (e) => {
      const isCategoryBtn = e.target.classList.contains('cafe-category-name');

      if (isCategoryBtn) {
        const categoryName = e.target.dataset.categoryName;
        currentCategory = categoryName;

        $('#category-title').innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
      return;
    };

    $('#menu-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#menu-submit-button').addEventListener('click', addMenuName);

    $('#menu-name').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return;
      addMenuName(e);
    });

    $('nav').addEventListener('click', changeCategory);
  };

  const init = async () => {
    render();
    initEventListener();
  };

  init();
}

App();
