import axios from "axios";
const apiEndpoint =
  "https://iewdkvrp3d.eu-central-1.awsapprunner.com/api/v1/map/geo-object";

function readlist() {
  return axios.get(apiEndpoint);
}

function sendReport(id, text) {
  const reportEndpoint = apiEndpoint + "/" + id + "/report";
  return axios.post(reportEndpoint, {
    text,
  });
}

const geoObjectAPI = {
  readlist,
  sendReport,
};
export default geoObjectAPI;
