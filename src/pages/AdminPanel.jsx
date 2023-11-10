import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from '../untils/dataProvider';
import { GeoObjectList, GeoObjectEdit, GeoObjectCreate ,ShowGeoObject} from '../components/MarkerList';
const AdminPanel = () => {
  return (
    <Admin  dataProvider={dataProvider}>
    <Resource name="geoobject" list={GeoObjectList} show={ShowGeoObject} edit={GeoObjectEdit} create={GeoObjectCreate} />
  </Admin>
  );
};


export default AdminPanel;