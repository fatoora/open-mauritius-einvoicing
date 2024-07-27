import React, { useEffect } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import { RouterName } from "../../constants/Constants";

function Dashboard() {
  const [ebsMraId, setEbsMraId] = React.useState("");
  const [areaCode, setAreaCode] = React.useState("");
  const [deviceId, setDeviceId] = React.useState("");

  useEffect(() => {
    const cachedData = localStorage.getItem("deviceDetails");
    if (cachedData) {
      const { ebsMraId, areaCode, deviceId } = JSON.parse(cachedData);
      setEbsMraId(ebsMraId);
      setAreaCode(areaCode);
      setDeviceId(deviceId);
    } else {
      window.location.href = RouterName.SIGN_IN;
    }
  }, []);

  const hanndleBack = () => {
    localStorage.removeItem("deviceDetails");
    window.location.href = RouterName.SIGN_IN;
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
        <Card.Body className="d-flex flex-column gap-2 justify-content-center">
          <Card.Title className=" text-right">Account Info ℹ️</Card.Title>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Ebs MraId
            </Form.Label>
            <Col sm="9">
              <Form.Control type={"text"} disabled value={ebsMraId} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Area Code
            </Form.Label>
            <Col sm="9">
              <Form.Control type={"text"} disabled value={areaCode} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              DeviceId
            </Form.Label>
            <Col sm="9">
              <Form.Control type={"text"} disabled value={deviceId} />
            </Col>
          </Form.Group>
        </Card.Body>
        <Card.Footer
          className="bg-grey d-flex flex-row justify-content-around"
          style={{ borderTop: "none" }}
        >
          <button
            style={{ width: "140px", height: "40px" }}
            className="btn btn-primary mx-2"
            onClick={() => hanndleBack()}
          >
            🔙 Back
          </button>
          <button
            style={{ width: "140px", height: "40px" }}
            className="btn btn-primary mx-2"
            onClick={() => (window.location.href = RouterName.INVOICES)}
          >
            Invoices
          </button>
          <button
            style={{ width: "140px", height: "40px" }}
            className="btn btn-primary mx-2"
            onClick={() => (window.alert("coming soon 🚧"))}
          >
            Logs
          </button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Dashboard;
