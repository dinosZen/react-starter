import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="bg-gray-300 p-4 h-screen">
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/users/1">User Details</Link>
          </li>
          <li>
            <Link to="/not-found">Not Found</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidenav;
