import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {createStore} from 'state-pool';


const store = createStore();
store.setState("isLogin", false);
store.setState("user_id", undefined);

function ColorSchemesExample() {
  const [isLogin, setIsLogin] = store.useState("isLogin");
  const [user_id, setUser_id] = store.useState("user_id");

  return (
      <Navbar bg="primary" sticky="top" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Project Management</Navbar.Brand>
          <Nav className="me-auto">
            {isLogin?<Nav.Link href="/home">Home</Nav.Link>: null}
            <NavDropdown title="Project" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Project1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Project1
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default ColorSchemesExample;