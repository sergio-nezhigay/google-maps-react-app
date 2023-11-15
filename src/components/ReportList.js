import { Datagrid, List, TextField ,ShowButton, Show, SimpleShowLayout ,DeleteButton} from "react-admin";

export const ReportList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="reportId"></TextField>
            <TextField source="createdAt"></TextField>
            <TextField source="geoObjectId"></TextField>
            <ShowButton basepath="/reports" />
            <DeleteButton basepath="/map/reports"> </DeleteButton>
        </Datagrid>
    </List>
)

export const ShowReport = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
        <TextField source="geoObject.id" label="id" />
      <TextField source="geoObject.name" label="Name" />
      <TextField source="geoObject.description" label="Description" />
      <TextField source="geoObject.type.title" label="Type" />
      <TextField source="geoObject.coordinates.latitude" label="Latitude" />
      <TextField source="geoObject.coordinates.longitude" label="Longitude" />
      <TextField source="geoObject.address" label="address"></TextField>
      <TextField source="geoObject.source" label="source"></TextField>
            <TextField source="createdAt"></TextField>
            <TextField source="geoObjectId"></TextField>
            <TextField source="text"></TextField>
        </SimpleShowLayout>
    </Show>
)