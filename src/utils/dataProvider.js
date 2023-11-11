// dataProvider.js
const apiUrl = "https://iewdkvrp3d.eu-central-1.awsapprunner.com/api/v1/map";
// const apiUrl = "http://localhost:3001";

const typeObject = [
  { id: "INFRASTRUCTURE", label: "Інфраструктура" },
  { id: "TRANSPORT", label: "Транспорт" },
  { id: "PARK", label: "Парки, сквери" },
  { id: "SPORT", label: "Спортивні майданчики" },
  { id: "PLAYGROUND", label: "Ігрові майданчики" },
  { id: "MEDICINE", label: "Медицина" },
  { id: "BUILDING", label: "Житло" },
];
const Accessibility = [
  { id: "RAMP", label: "Пандус" },
  { id: "ELEVATOR", label: "Ліфт" },
  { id: "LOW_ENTRY", label: "Понижений вхід" },
];

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
    params.data.type = typeObject.find((e) => e.id === params.data.type);
    params.data.accessibility = Accessibility.filter((e) => {
      if (params.data.accessibility.includes(e.id)) {
        return e;
      } else return null;
    });
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
