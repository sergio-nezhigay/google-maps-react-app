import React from "react";

import { Admin, Resource } from "react-admin";
import dataProvider from "../utils/dataProvider";
import {
  GeoObjectList,
  GeoObjectEdit,
  GeoObjectCreate,
  ShowGeoObject,
} from "../components/MarkerList";

const customLayout = (props) => <layout {...props} appbar={null} />;

const AdminPanel = () => {
  return (
    <Admin basename="/admin" dataProvider={dataProvider} layout={customLayout}>
      <Resource
        name="geo-object"
        list={GeoObjectList}
        show={ShowGeoObject}
        edit={GeoObjectEdit}
        create={GeoObjectCreate}
      />
    </Admin>
  );
};

export default AdminPanel;
