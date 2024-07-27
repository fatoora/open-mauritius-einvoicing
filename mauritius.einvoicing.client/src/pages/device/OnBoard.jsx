
import { Card, Form, Button, Alert, CardTitle, CardBody, CardFooter } from "react-bootstrap";
import React from "react";
import axios from 'axios';
import { RouterName } from "../../constants/Constants";

function OnBoard() {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [ebsMraId, setEbsMraId] = React.useState('');
    const [areaCode, setAreaCode] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const handleOnboard = () => {
        const userDetails = { userName, password, ebsMraId, areaCode };
        axios.post('/Device/OnBoard', userDetails).then((res) => {
            if (res.status === 200) {
                setSuccess("OnBoard Success");
                window.location.href = RouterName.SIGN_IN;
            } else {
                window.alert('OnBoard Failed');
                setError("OnBoard Failed");
            }
        });
    }
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
    <CardTitle className=" text-center">OnBoard 💯</CardTitle>
    {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter User Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ebs MraId</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Ebs MraId"
                                value={ebsMraId}
                                onChange={(e) => setEbsMraId(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Area Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Area Code"
                                value={areaCode}
                                onChange={(e) => setAreaCode(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
        </CardBody>
        <CardFooter className="d-flex flex-row w-100 justify-content-between">
        <Button className="w-100" size="lg" variant="primary" onClick={handleOnboard}>Onboard</Button>
        </CardFooter>
    </Card>
</div>
  );
}

export default OnBoard;