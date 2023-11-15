// dataProvider.js
import {getType,getAccessibility} from './enumGet'
const apiUrl = "https://iewdkvrp3d.eu-central-1.awsapprunner.com";

const typesEnum = getType();
const Accessibility = getAccessibility()

const dataProvider = {
  getList: async (resource, params) => {
    const {field,order} = params.sort
    const lowerOrder = order.toLowerCase()
    const typeFix = field === 'type.title'?'type':field
    const {perPage,page} = params.pagination
    const response = await fetch(`${apiUrl}/api/v1/map/geo-object/paged?page=${page}&size=${perPage}&sort=${typeFix},${lowerOrder}`);
    const pageResponse = await fetch(`${apiUrl}/api/v1/map/geo-object`)
    let {content:data} = await response.json();
    const pageColb = await pageResponse.json()
    return { data, total: pageColb.length };
  },

  getOne: async (resource, params) => {
    const response = await fetch(
      `${apiUrl}/api/v1/map/geo-object/${params.id}`
    );
    const data = await response.json();
    return { data };
  },

  create: async (resource, params) => {
    params.data.type = typesEnum.find((e) => e.name === params.data.type).name;
    params.data.accessibility = Accessibility.filter((e) => {
      if (params.data.accessibility.includes(e.name)) {
        return e.name;
      } else return null;
    }).map(e => e.name);
    const response = await fetch(`${apiUrl}/api/v1/map/geo-object`, {
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
    params.data.type = params.data.type.name
    params.data.accessibility = params.data.accessibility.map(e => e.name)
    const response = await fetch(
      `${apiUrl}/api/v1/map/geo-object/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params.data),
      }
    );
    const data = await response.json();
    return { data };
  },

  delete: async (resource, params) => {
    await fetch(`${apiUrl}/api/v1/map/geo-object/${params.id}`, {
      method: "DELETE",
    });
    return { data: { id: params.id } };
  },
};

export default dataProvider;
