import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from '../untils/dataProvider';
import { GeoObjectList, GeoObjectEdit, GeoObjectCreate } from '../components/MarkerList';

const AdminPanel = () => {
  return (
    <Admin dataProvider={dataProvider}>
    <Resource name="geoobject" list={GeoObjectList} edit={GeoObjectEdit} create={GeoObjectCreate} />
  </Admin>
  );
};


export default AdminPanel;
