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
        <TextField source="reportId"></TextField>
            <TextField source="createdAt"></TextField>
            <TextField source="geoObjectId"></TextField>
            <TextField source="text"></TextField>
        </SimpleShowLayout>
    </Show>
)