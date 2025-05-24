import { useParams } from 'react-router-dom';


function ViewCar() {
  const { carId } = useParams(); // carId will contain the UUID from the URL

  return (
    <div>
      <h1>View Car</h1>
      <p>This is the view car page for car ID: {carId}</p>
      {/* Fetch and display car data using carId */}
    </div>
  );
}
export default ViewCar;