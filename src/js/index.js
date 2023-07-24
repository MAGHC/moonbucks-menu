const $ = (selector) => document.querySelector(selector);

function App() {
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerHTML = `총 ${menuCount}개`;
  };

  const addEspressoMenuName = () => {
    const menuItemTemplate = (
      espressoMenuName,
    ) => `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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

    const espressoMenuName = $('#espresso-menu-name').value;
    if (espressoMenuName === '') {
      alert('빈값X');
      return;
    }

    $('#espresso-menu-list').insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));
    $('#espresso-menu-name').value = '';
    updateMenuCount();
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const edittedValud = prompt('이름변경', $menuName.innerText);
    $menuName.innerText = edittedValud;
  };

  const removeMenuName = (e) => {
    const confirmed = confirm('삭제?');
    if (confirmed) {
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }

    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addEspressoMenuName);

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return;
    addEspressoMenuName(e);
  });
}

App();
