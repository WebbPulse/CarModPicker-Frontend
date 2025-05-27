import { useParams } from 'react-router-dom';

function ViewPart() {
  const { partId } = useParams(); // partId will contain the UUID from the URL

  return (
    <div>
      <h1>View Part</h1>
      <p>This is the view part page for part ID: {partId}</p>
      {/* Fetch and display part data using partId */}
    </div>
  );
}
export default ViewPart;
