// resources/GeoObject.js
import { useEffect } from "react";
import { useState } from "react";
import {
  FunctionField,
  List,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DeleteButton,
  Datagrid,
  TextField,
  EditButton,
  Show,
  SimpleShowLayout,
  ShowButton,
  SelectArrayInput,
  SelectInput,
} from "react-admin";
import { getType, getAccessibility } from "../utils/enumGet";
const defaltType = [
  { name: "INFRASTRUCTURE", title: "Інфраструктура" },
  { name: "TRANSPORT", title: "Транспорт" },
  { name: "PARK", title: "Парки, сквери" },
  { name: "SPORT", title: "Спортивні майданчики" },
  { name: "PLAYGROUND", title: "Ігрові майданчики" },
  { name: "MEDICINE", title: "Медицина" },
  { name: "BUILDING", title: "Житло" },
];

const defaltAccessibility = [
  { name: "RAMP", title: "Пандус" },
  { name: "ELEVATOR", title: "Ліфт" },
  { name: "LOW_ENTRY", title: "Понижений вхід" },
];
const AccessibilityField = ({ record = {} }) => (
  <span>{record.accessibility.map((item) => item.title).join(", ")}</span>
);

export const GeoObjectList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type.title" label="Type" />
      <TextField source="coordinates.latitude" label="Latitude" />
      <TextField source="coordinates.longitude" label="Longitude" />
      <EditButton basepath="/map/geoobject" />
      <DeleteButton basepath="/map/geoobject" />
      <ShowButton basepath="/geoobjects" />
    </Datagrid>
  </List>
);

export const GeoObjectEdit = (props) => {
  const [type, setType] = useState(defaltType);
  const [accessibility, setAccessibility] = useState(defaltAccessibility);
  useEffect(() => {
    const fetchData = async () => {
      const typesEnum = await getType();
      const accessibilityEnum = await getAccessibility();
      setType(typesEnum);
      setAccessibility(accessibilityEnum);
    };
    fetchData();
  }, []);

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="address" label="address" />
        <SelectInput
          label="Type"
          source="type" // This should match the field in your GeoObject resource
          reference="type" // This should match the name of the related resource
          choices={type}
          optionText="title"
          optionValue="name"
        />
        <TextInput source="coordinates.latitude" label="Latitude" />
        <TextInput source="coordinates.longitude" label="Longitude" />
        <SelectArrayInput
          label="Accessibility"
          source="accessibility" // This should match the field in your GeoObject resource
          reference="accessibility" // This should match the name of the related resource
          choices={accessibility}
          optionText="title"
          optionValue="name"
        />
        <TextInput source="source" label="source" />
      </SimpleForm>
    </Edit>
  );
};

export const GeoObjectCreate = (props) => {
  const [type, setType] = useState(defaltType);
  const [accessibility, setAccessibility] = useState(defaltAccessibility);
  useEffect(() => {
    const fetchData = async () => {
      const typesEnum = await getType();
      const accessibilityEnum = await getAccessibility();
      setType(typesEnum);
      setAccessibility(accessibilityEnum);
    };
    fetchData();
  }, []);

  return (
    <Create>
      <SimpleForm>
        <TextInput required={true} source="name" />
        <TextInput required={true} source="description" />
        <SelectInput
          required={true}
          label="Type"
          source="type" // This should match the field in your GeoObject resource
          reference="type" // This should match the name of the related resource
          choices={type}
          optionValue="name"
          optionText="title"
        />
        <TextInput
          required={true}
          source="coordinates.latitude"
          label="Latitude"
        />
        <TextInput
          required={true}
          source="coordinates.longitude"
          label="Longitude"
        />
        <SelectArrayInput
          required={true}
          label="Accessibility"
          source="accessibility"
          choices={accessibility}
          optionValue="name"
          optionText="title"
          multiple  
        />
        <TextInput required={true} source="source" label="source" />
        <TextInput required={true} source="address" label="address" />
      </SimpleForm>
    </Create>
  );
};
export const ShowGeoObject = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="type.title" label="Type" />
      <TextField source="coordinates.latitude" label="Latitude" />
      <TextField source="coordinates.longitude" label="Longitude" />
      <TextField source="address" label="address"></TextField>
      <TextField source="source" label="source"></TextField>
      <FunctionField
        label="accessibility"
        render={(record) => <AccessibilityField record={record} />}
      />
    </SimpleShowLayout>
  </Show>
);
