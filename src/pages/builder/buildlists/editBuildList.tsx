import { useParams } from 'react-router-dom';

function EditBuildList() {
  const { buildListId } = useParams(); // buildListId will contain the UUID from the URL

  return (
    <div>
      <h1>Edit Build List</h1>
      <p>This is the edit build list page for build list ID: {buildListId}</p>
      {/* Fetch build list data using buildListId and populate form */}
    </div>
  );
}
export default EditBuildList;
