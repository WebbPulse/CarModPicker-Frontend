import { useParams } from 'react-router-dom';

function ViewBuildList() {
  const { buildListId } = useParams(); // buildListId will contain the UUID from the URL

  return (
    <div>
      <h1>View Build List</h1>
      <p>This is the view build list page for build list ID: {buildListId}</p>
      {/* Fetch and display build list data using buildListId */}
    </div>
  );
}
export default ViewBuildList;
