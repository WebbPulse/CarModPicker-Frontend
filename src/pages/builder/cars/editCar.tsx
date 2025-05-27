import { useParams } from 'react-router-dom';

function EditCar() {
  const { carId } = useParams(); // carId will contain the UUID from the URL

  return (
    <div>
      <h1>Edit Car</h1>
      <p>This is the edit car page for car ID: {carId}</p>
      {/* Fetch car data using carId and populate form */}
    </div>
  );
}
export default EditCar;
