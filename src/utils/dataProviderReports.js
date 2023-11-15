const apiUrl = "https://iewdkvrp3d.eu-central-1.awsapprunner.com";

const dataProvider = {
  getList: async (resource, params) => {
    const { perPage, page } = params.pagination;
    const response = await fetch(
      `${apiUrl}/api/v1/map/geo-object/report?page=${page-1}&size=${perPage}`
    );
    let { content: data ,totalElements} = await response.json();
    data = data.map((e) => {
      e.createdAt = e.createdAt.split(':').splice(0,2).join(':')
      return { id: e.reportId, ...e };
    });
    return { data, total: totalElements };
  },
  getOne: async (resource, params) => {
    const response = await fetch(
      `${apiUrl}/api/v1/map/geo-object/report/${params.id}`
    );
    const data = await response.json();
    data.id = data.reportId
    console.log(data)
    return { data };
  },
  delete: async (resource, params) => {
    await fetch(`${apiUrl}/api/v1/map/geo-object/report/${params.id}`, {
      method: "DELETE",
    });
    return { data: { id: params.reportId } };
  },
};

export default dataProvider;
