const BASE_URL = 'http://localhost:3000/api';

const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    };
  },

  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  },

  DELETE() {
    return {
      method: 'DELETE',
    };
  },
};

const request = async (url, option) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    alert('에러');
  }
  return res.json();
};

const requestWithoutJson = async (url, option) => {
  const res = await fetch(url, option);
  if (!res.ok) {
    alert('에러');
  }
  return res;
};

const MenuApi = {
  async getAllMenuByCategory(category) {
    return await request(`${BASE_URL}/category/${category}/menu`);
  },

  async createMenu(name, category) {
    return await request(`${BASE_URL}/category/${category}/menu`, HTTP_METHOD.POST({ name }));
  },

  async updateMenu(category, name, menuId) {
    return await request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name }),
    );
  },

  async toggleSoldOutMenu(category, menuId) {
    return await request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT(),
    );
  },

  async deleteMenu(category, menuId) {
    return await requestWithoutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE(),
    );
  },
};

export default MenuApi;
