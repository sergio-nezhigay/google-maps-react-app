// resources/GeoObject.js
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
    SelectInput
  } from "react-admin";
  
  const AccessibilityField = ({ record = {} }) => (
    <span>{record.accessibility.map((item) => item.label).join(", ")}</span>
  );
  
  export const GeoObjectList = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="type.label" label="Type" />
        <TextField source="coordinates.latitude" label="Latitude" />
        <TextField source="coordinates.longitude" label="Longitude" />
        <EditButton basepath="/map/geoobject" />
        <DeleteButton basepath="/map/geoobject" />
        <ShowButton basepath="/geoobjects" />
      </Datagrid>
    </List>
  );
  
  export const GeoObjectEdit = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="address" label="address" />
        <SelectInput
         label="Type"
               source="type" // This should match the field in your GeoObject resource
               reference="type" // This should match the name of the related resource
            choices={[
              { id: "INFRASTRUCTURE", label: "Інфраструктура" },
              { id: "TRANSPORT", label: "Транспорт" },
              { id: "PARK", label: "Парки, сквери" },
              { id: "SPORT", label: "Спортивні майданчики" },
              { id: "PLAYGROUND", label: "Ігрові майданчики" },
              { id: "MEDICINE", label: "Медицина" },
              { id: "BUILDING", label: "Житло" },
            ]}
            optionText="label"
          />
        <TextInput source="coordinates.latitude" label="Latitude" />
        <TextInput source="coordinates.longitude" label="Longitude" />
        <SelectArrayInput 
          label="Accessibility"
               source="accessibility" // This should match the field in your GeoObject resource
               reference="accessibility" // This should match the name of the related resource
            choices={[
              { id: "RAMP", label: "Пандус" },
              { id: "ELEVATOR", label: "Ліфт" },
              { id: "LOW_ENTRY", label: "Понижений вхід" },
            ]}
            optionText="label"
          />
        <TextInput source="source" label="source" />
      </SimpleForm>
    </Edit>
  );
  
  export const GeoObjectCreate = (props) => (
    <Create>
      <SimpleForm>
        <TextInput   required={true}  source="name" />
        <TextInput   required={true} source="description" />
        <SelectInput  required={true} 
         label="Type"
               source="type" // This should match the field in your GeoObject resource
               reference="type" // This should match the name of the related resource
            choices={[
              { id: "INFRASTRUCTURE", label: "Інфраструктура" },
              { id: "TRANSPORT", label: "Транспорт" },
              { id: "PARK", label: "Парки, сквери" },
              { id: "SPORT", label: "Спортивні майданчики" },
              { id: "PLAYGROUND", label: "Ігрові майданчики" },
              { id: "MEDICINE", label: "Медицина" },
              { id: "BUILDING", label: "Житло" },
            ]}
            optionText="label"
          />
        <TextInput  required={true}  source="coordinates.latitude" label="Latitude" />
        <TextInput  required={true}  source="coordinates.longitude" label="Longitude" />
          <SelectArrayInput  required={true} 
          label="Accessibility"
               source="accessibility" // This should match the field in your GeoObject resource
               reference="accessibility" // This should match the name of the related resource
            choices={[
              { id: "RAMP", label: "Пандус" },
              { id: "ELEVATOR", label: "Ліфт" },
              { id: "LOW_ENTRY", label: "Понижений вхід" },
            ]}
            optionText="label"
          />
        <TextInput  required={true}  source="source" label="source" />
        <TextInput  required={true}  source="address" label="address" />
      </SimpleForm>
    </Create>
  );
  export const ShowGeoObject = (props) => (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="type.label" label="Type" />
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
  