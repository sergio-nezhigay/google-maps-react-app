import React from "react";

import { Admin, Resource } from "react-admin";
import dataProvider from "../utils/dataProvider";
import {
  GeoObjectCreate,
  GeoObjectList,
  ShowGeoObject,
  GeoObjectEdit,
} from "../components/MarkerList";
import { ReportList,ShowReport } from '../components/ReportList';

//const customLayout = (props) => <layout {...props} appbar={null} />;

const AdminPanel = () => {
  return (
    <Admin basename="/admin" dataProvider={dataProvider}>
      <Resource
        name="geo-object"
        list={GeoObjectList}
        show={ShowGeoObject}
        edit={GeoObjectEdit}
        create={GeoObjectCreate}
      />
       <Resource name="reports"  list={ReportList} show={ShowReport} >   </Resource>
    </Admin>
  );
};

export default AdminPanel;
