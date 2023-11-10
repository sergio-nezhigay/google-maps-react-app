// dataProvider.js
const apiUrl = "http://localhost:3001";

const dataProvider = {
  getList: async (resource, params) => {
    const response = await fetch(`${apiUrl}/${resource}`);
    const data = await response.json();
    return { data, total: data.length };
  },

  getOne: async (resource, params) => {
    const response = await fetch(`${apiUrl}/${resource}/${params.id}`);
    const data = await response.json();
    return { data };
  },

  create: async (resource, params) => {
    const response = await fetch(`${apiUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.data),
    });
    const data = await response.json();
    return { data };
  },

  update: async (resource, params) => {
    const response = await fetch(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.data),
    });
    const data = await response.json();
    return { data };
  },

  delete: async (resource, params) => {
    await fetch(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: { id: params.id } };
  },
};

export default dataProvider;
