import { useParams } from "react-router-dom";

function EditPart() {
  const { partId } = useParams(); // partId will contain the UUID from the URL

  return (
    <div>
      <h1>Edit Part</h1>
      <p>This is the edit part page for part ID: {partId}</p>
      {/* Fetch part data using partId and populate form */}
    </div>
  );
}
export default EditPart;