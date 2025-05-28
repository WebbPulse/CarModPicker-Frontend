import { useParams } from 'react-router-dom';
function ViewUser() {
  const { username } = useParams();

  return (
    <div>
      <h1>View User</h1>
      <p>This is the view user page for user: {username}</p>
      {/* Fetch and display user data using username */}
    </div>
  );
}
export default ViewUser;
