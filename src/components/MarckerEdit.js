import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    SimpleForm,
    ReferenceInput,
    TextInput,
} from "react-admin";


export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="id" reference="markers" />
            <TextInput source="name" />
            <TextInput source="schedule" />
            <TextInput source="address" />
        </SimpleForm>
    </Edit>
);