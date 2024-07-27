import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import logo from "../../public/logo.png"; // Import the logo
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RouterName } from "../constants/Constants";

const Sidebar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") ?? "User";
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" style={{ width: "40px" }} />{" "}
          {/* Use the logo as the Navbar.Brand */}
        </Navbar.Brand>
        <Nav activeKey={location.pathname} className="mr-auto">
          <Nav.Link href="/invoices">Invoices</Nav.Link>
          <Nav.Link href="#" onClick={() => alert("Coming Soon")}>
            Reports
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <div style={{ cursor: "pointer" }}>
            <Dropdown>
              <Dropdown.Toggle>
                <Navbar.Text className="mx-2">{userName} </Navbar.Text>
                <FaUserCircle />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: "250px" }}>
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </Dropdown.Item>
                <Dropdown.Item href={RouterName.CHANGE_PASSWORD}>
                  Change Password
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
