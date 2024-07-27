import React from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  CardTitle,
  CardBody,
  CardFooter,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { RouterName } from "../../constants/Constants";
import { post } from "../../Services/api";
import { jwtDecode } from "jwt-decode";
import { IsAuthenticated, SetJwtToken } from "../../Services/auth";
import logo from "../../../public/logo.png";

function SignIn() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleEmailChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  React.useEffect(() => {
    if (IsAuthenticated()) {
      navigate(RouterName.INVOICES);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `/Auth/Login?userName=${userName}&password=${password}`
      );
      if (response.status === 200) {
        setSuccess("Signed in successfully!");
        SetJwtToken(response.data);
        const decodedToken = jwtDecode(response.data);

        const deviceId = decodedToken["DeviceId"];
        const userName = decodedToken["unique_name"] ?? decodedToken["nameid"];

        localStorage.setItem("deviceId", deviceId);
        localStorage.setItem("userName", userName);

        const deviceDetails = await post(`/Device/Get?deviceGuid=${deviceId}`);
        if (deviceDetails.status === 200) {
          localStorage.setItem(
            "deviceDetails",
            JSON.stringify(deviceDetails.data)
          );
          navigate(RouterName.INVOICES);
        } else {
          setError(`Unexpected error: ${deviceDetails.status}`);
        }
      } else {
        setError(`Unexpected error: ${response.data}`);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setError(`Error: ${errorMessage}`);
      } else if (error.request) {
        setError("No response received from server. Please try again later.");
      } else {
        setError(`Request error: ${error.message}`);
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: "30rem", margin: "auto" }}>
        <CardBody className="d-flex flex-column gap-2 justify-content-center">
          <CardTitle className=" text-center">
            <div>
              <img src={logo} alt="Logo" style={{ width: "50px" }} />
              <p>MRA E-Invoicing Portal</p>
            </div>
          </CardTitle>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group controlId="formBasicUserName" className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter user name"
                value={userName}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
          </Form>
        </CardBody>
        <CardFooter className="d-flex flex-row w-100 justify-content-around px-4 gap-2">
          <Button
            className="w-100"
            size="m"
            variant="primary"
            onClick={handleSubmit}
          >
            Login
          </Button>
          {/* <Button
            className="w-100"
            size="m"
            variant="primary"
            onClick={() => (window.location.href = RouterName.ON_BOARD)}
          >
            Onboard
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignIn;
