import React from "react";

import { Admin, Resource } from "react-admin";

import dataProvider from "../utils/dataProvider";
import { Layout } from "react-admin";

import {
  GeoObjectCreate,
  GeoObjectList,
  ShowGeoObject,
  GeoObjectEdit,
} from "../components/MarkerList";
import { ReportList, ShowReport } from "../components/ReportList";

const MyLayout = (props) => (
  <Layout
    {...props}
    sx={{
      "& header": { visibility: "hidden" },
    }}
  />
);

const AdminPanel = () => {
  return (
    <Admin basename="/admin" dataProvider={dataProvider} layout={MyLayout}>
      <Resource
        name="geo-object"
        list={GeoObjectList}
        show={ShowGeoObject}
        edit={GeoObjectEdit}
        create={GeoObjectCreate}
      />
      <Resource name="reports" list={ReportList} show={ShowReport}>
        {" "}
      </Resource>
    </Admin>
  );
};

export default AdminPanel;
