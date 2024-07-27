import {
  Row,
  Table,
  Form,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

function InvoiceLineItem(props) {
  return (
    <Row className="p-4 bg-light rounded shadow-sm mb-4">
      <h5 className="fw-bold mb-4">Line Items</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-bottom`}>
                  <ul>
                    <li>TCO1 : Tax at 15%</li>
                    <li>TCO2 : Tax at 0%</li>
                    <li>TCO3 : Tax Exempt</li>
                  </ul>
                </Tooltip>
              }
            >
              <th>Tax Code</th>
            </OverlayTrigger>
            <th>Nature</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>VAT Amount</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.lineItems.map((item, index) => (
            <tr key={index}>
              <td style={{ width: "20%" }}>
                <Form.Control
                  type="text"
                  name={`name`}
                  value={item.name}
                  onChange={(e) => props.handleLineItemChange(e, index)}
                />
              </td>
              <td style={{ width: "10%" }}>
                <Form.Select
                  name={`taxCode`}
                  value={item.taxCode}
                  onChange={(e) => props.handleLineItemChange(e, index)}
                >
                  <option value="TC01">TC01</option>
                  <option value="TC02">TC02</option>

                  <option value="TC03">TC03</option>
                </Form.Select>
              </td>
              <td style={{ width: "10%" }}>
                <Form.Select
                  name={`nature`}
                  value={item.nature}
                  onChange={(e) => props.handleLineItemChange(e, index)}
                >
                  <option value="GOODS">GOODS</option>
                  <option value="SERVICES">SERVICES</option>
                </Form.Select>
              </td>
              <td style={{ width: "8%" }}>
                <Form.Select
                  name={`unit`}
                  value={item.unit}
                  onChange={(e) => props.handleLineItemChange(e, index)}
                >
                  <option value="PCS">PCS</option>
                  <option value="LTR">LTR</option>
                  <option value="KG">KG</option>
                  <option value="THO">THO</option>
                </Form.Select>
              </td>
              <td style={{ width: "10%" }}>
                <Form.Control
                  type="number"
                  name={`quantity`}
                  value={item.quantity}
                  onChange={(e) => props.handleLineItemChange(e, index)}
                />
              </td>
              <td style={{ width: "10%" }}>
                <Form.Control
                  type="number"
                  name={`unitPrice`}
                  value={item.unitPrice}
                  onChange={(e) => props.handleLineItemChange(e, index)}
                />
              </td>
              <td style={{ width: "10%" }}>
                <Form.Control
                  type="number"
                  name={`vatAmount`}
                  disabled={true}
                  value={item.vatAmount}
                  onChange={(e) => props.handleLineItemChange(e, index)}
                />
              </td>
              <td style={{ width: "15%" }}>
                <Form.Control
                  type="number"
                  name={`totalAmount`}
                  disabled={true}
                  value={item.totalAmount}
                  onChange={(e) => props.handleLineItemChange(e, index)}
                />
              </td>
              <td className="text-center" style={{ width: "7%" }}>
                <Button
                  variant="danger"
                  onClick={() => props.handleDeleteLineItem(index)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="outline-primary" onClick={props.handleAddLineItem}>
        <FaPlus className="me-2" /> Add Item
      </Button>
    </Row>
  );
}

export default InvoiceLineItem;
