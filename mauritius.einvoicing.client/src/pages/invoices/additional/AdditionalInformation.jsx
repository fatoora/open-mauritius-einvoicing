import { Form, Row, Col, Tooltip,OverlayTrigger } from "react-bootstrap";
import { FaInfoCircle } from 'react-icons/fa';

function AdditionalInformation(props) {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}></Tooltip>
    );
  return (
    <Row className="p-4 bg-light rounded shadow-sm mb-4">
          <h5 className="fw-bold mb-4">Additional Information  <OverlayTrigger
              placement="right"
              overlay={renderTooltip({
                  children: "Any unfilled value will not be displayed on the invoice",
              })}
          ><i><FaInfoCircle /></i></OverlayTrigger></h5>
      <Row className="mb-3">
        <Col xs={12} md={4} lg={4} className="mb-3">
          <Form.Group controlId="salesOrderNo">
            <Form.Label className="fw-bold">Sales Order No</Form.Label>
            <Form.Control
              type="text"
              name="salesOrderNo"
              value={props.formData.salesOrderNo}
              onChange={props.handleInputChange}
              aria-label="Enter Sales Order No"
              placeholder="e.g., SO-12345"
            />
          </Form.Group>
        </Col>
         <Col xs={12} md={4} lg={4} className="mb-3">
          <Form.Group controlId="poNumber">
            <Form.Label className="fw-bold">PO Number</Form.Label>
            <Form.Control
              type="text"
              name="poNumber"
              value={props.formData.poNumber}
              onChange={props.handleInputChange}
              aria-label="Enter PO Number"
              placeholder="e.g., PO-12345"
            />
          </Form.Group>
              </Col>
              <Col xs={12} md={4} lg={4} className="mb-3">
                  <Form.Group controlId="poNumber">
                      <Form.Label className="fw-bold">System invoice</Form.Label>
                      <Form.Control
                          type="text"
                          name="systemInvoice"
                          value={props.formData.systemInvoice}
                          onChange={props.handleInputChange}
                          aria-label="Enter System invoice"
                          placeholder="e.g., INV-12345"
                      />
                  </Form.Group>
              </Col>
        <Col xs={12} md={4} lg={4} className="mb-3">
          <Form.Group controlId="modeOfShipment">
            <Form.Label className="fw-bold">Mode Of Shipment</Form.Label>
            <Form.Control
              type="text"
              name="modeOfShipment"
              value={props.formData.modeOfShipment}
              onChange={props.handleInputChange}
              aria-label="Enter Mode Of Shipment"
              placeholder="e.g., Air, Sea"
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4} lg={4} className="mb-3">
          <Form.Group controlId="portOfLoading">
            <Form.Label className="fw-bold">
              On Board/port Of Loading
            </Form.Label>
            <Form.Control
              type="text"
              name="portOfLoading"
              value={props.formData.portOfLoading}
              onChange={props.handleInputChange}
              aria-label="Enter Port Of Loading"
              placeholder="e.g., Port Louis"
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Form.Group controlId="portOfDischarge">
            <Form.Label className="fw-bold">
              For Transportation To /port Of Discharge
            </Form.Label>
            <Form.Control
              type="text"
              name="portOfDischarge"
              value={props.formData.portOfDischarge}
              onChange={props.handleInputChange}
              aria-label="Enter Port Of Discharge"
              placeholder="e.g., Rotterdam"
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Form.Group controlId="noOfPackage">
            <Form.Label className="fw-bold">No Of Packages</Form.Label>
            <Form.Control
              type="text"
              name="noOfPackage"
              value={props.formData.noOfPackage}
              onChange={props.handleInputChange}
              aria-label="Enter No Of Packages"
              placeholder="e.g., 100"
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Form.Group controlId="netWeight">
            <Form.Label className="fw-bold">Total Net Weight</Form.Label>
            <Form.Control
              type="text"
              name="netWeight"
              value={props.formData.netWeight}
              onChange={props.handleInputChange}
              aria-label="Enter Net Weight"
              placeholder="e.g., 100 kg"
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Form.Group controlId="grossWeight">
            <Form.Label className="fw-bold">Total Gross Weight</Form.Label>
            <Form.Control
              type="text"
              name="grossWeight"
              value={props.formData.grossWeight}
              onChange={props.handleInputChange}
              aria-label="Enter Gross Weight"
              placeholder="e.g., 120 kg"
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Form.Group controlId="paymentTerms">
            <Form.Label className="fw-bold">Payment Terms</Form.Label>
            <Form.Control
              as="textarea"
              name="paymentTerms"
              value={props.formData.paymentTerms}
              onChange={props.handleInputChange}
              aria-label="Enter Payment Terms"
              placeholder="e.g., Net 30 days"
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Form.Group controlId="deliveryTerms">
            <Form.Label className="fw-bold">Delivery Terms</Form.Label>
            <Form.Control
              as="textarea"
              name="deliveryTerms"
              value={props.formData.deliveryTerms}
              onChange={props.handleInputChange}
              aria-label="Enter Delivery Terms"
              placeholder="e.g., Net 30 days"
            />
          </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-3">
                  <Form.Group controlId="commodityCode">
                      <Form.Label className="fw-bold">H.s.commodity Code</Form.Label>
                          <Form.Control
                              type="text"
                              name="commodityCode"
                              value={props.formData.commodityCode}
                              onChange={props.handleInputChange}
                              aria-label="Enter Commodity Code"
                              placeholder="e.g., 123456"
                          />
                  </Form.Group>
              </Col>
              <Col xs={12} md={4} lg={4} className="mb-3">
                  <Form.Group controlId="incoTerms">
                      <Form.Label className="fw-bold">Inco Terms</Form.Label>
                      <Form.Control
                          type="text"
                          name="incoTerms"
                          value={props.formData.incoTerms}
                          onChange={props.handleInputChange}
                          aria-label="Enter Inco Terms"
                          placeholder="e.g., EXW (EX WORKS)"
                      />
                  </Form.Group>
              </Col>
      </Row>
    </Row>
  );
}

export default AdditionalInformation;
