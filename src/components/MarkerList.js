// resources/GeoObject.js
import {
  FunctionField,
  List,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DeleteButton,
  Datagrid,
  TextField,
  EditButton,
  SelectInput,
} from "react-admin";

const AccessibilityField = ({ record = {} }) => (
  <span>{record.accessibility.map((item) => item.label).join(", ")}</span>
);

export const GeoObjectList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="type.label" label="Type" />
      <TextField source="coordinates.latitude" label="Latitude" />
      <TextField source="coordinates.longitude" label="Longitude" />
      <FunctionField
        label="Accessibility"
        render={(record) => <AccessibilityField record={record} />}
      />
      <EditButton basePath="/map/geoobject" />
      <DeleteButton basePath="/map/geoobject" />
    </Datagrid>
  </List>
);

export const GeoObjectEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="type.label" label="Type" />
      <TextInput source="coordinates.latitude" label="Latitude" />
      <TextInput source="coordinates.longitude" label="Longitude" />
      <TextInput source="Accessibility" />
    </SimpleForm>
  </Edit>
);

export const GeoObjectCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" />
      <TextInput source="type.label" label="Type" />
      <TextInput source="coordinates.latitude" label="Latitude" />
      <TextInput source="coordinates.longitude" label="Longitude" />
      <TextInput source="Accessibility" />
    </SimpleForm>
  </Create>
);
