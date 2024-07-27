import { useState } from "react";
import { Card, Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar";
import { toast } from "react-toastify";
import { post } from "../../Services/api";
import { ClearLocalStore } from "../../Services/auth";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    if (currentPassword === newPassword) {
      toast.error("Old and new password cannot be the same!");
      return;
    }

    post(
      `/User/UpdatePassword?currentPassword=${currentPassword}&newPassword=${newPassword}`
    )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Password changed successfully!, Please login again");
          ClearLocalStore();
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error.response.data;
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <Sidebar />
      <Card
        className="mt-3"
        style={{
          padding: "20px",
          minHeight: "300px",
          margin: "auto",
        }}
      >
        <Card.Body>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputGroup>
          <Button
            variant="primary"
            disabled={!currentPassword || !newPassword}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default ChangePassword;
