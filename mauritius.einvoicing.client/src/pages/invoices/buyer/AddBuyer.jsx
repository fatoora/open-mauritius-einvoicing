import { Form, Button, Modal } from 'react-bootstrap';

function AddBuyer(props) {
    var formName = "Add";
    if (props.buyerId != "") {
        formName = "Update";
    }
    return (<Modal show={props.showBuyerModal} onHide={() => props.setShowBuyerModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>{formName} Buyer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="buyerReference" className='mb-3'>
                    <Form.Label className='fw-bold'>Buyer Reference Number</Form.Label>
                    <Form.Control type="text" value={props.newBuyerData.buyerReference} onChange={e => props.setNewBuyerData({
                        ...props.newBuyerData,
                        buyerReference: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="buyerName" className='mb-3'>
                    <Form.Label className='fw-bold'>Name</Form.Label>
                    <Form.Control type="text" value={props.newBuyerData.name} onChange={e => props.setNewBuyerData({
                        ...props.newBuyerData,
                        name: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="buyerAddress" className='mb-3'>
                    <Form.Label className='fw-bold'>Address</Form.Label>
                    <Form.Control type="text" value={props.newBuyerData.address} onChange={e => props.setNewBuyerData({
                        ...props.newBuyerData,
                        address: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="vatType" className='mb-3'>
                    <Form.Label className="fw-bold">VAT Type</Form.Label>
                  
                        <Form.Select
                            name="vatType"
                            value={props.newBuyerData.vatType}
                        onChange={e => props.setNewBuyerData({
                            ...props.newBuyerData,
                            vatType: e.target.value
                        })}
                            aria-label="Select VAT Type"
                        >
                            <option value="">Select VAT Type</option>
                        <option value="VATR">VATR (VAT Registered Person)</option>
                            <option value="NVTR">NVTR (Non VAT Registered Person)</option>
                            <option value="EXMP">EXMP (Exempt Person)</option>
                        </Form.Select>
                </Form.Group>
                {props.newBuyerData.vatType =="VATR" ?
                <Form.Group controlId="buyerVatNumber" className='mb-3'>
                    <Form.Label className='fw-bold'>VAT Number</Form.Label>
                    <Form.Control type="text" value={props.newBuyerData.vatNumber} onChange={e => props.setNewBuyerData({
                        ...props.newBuyerData,
                        vatNumber: e.target.value
                    })} />
                   
                </Form.Group>
                    : ""}
                <Form.Group controlId="buyerBrn" className='mb-3'>
                    <Form.Label className='fw-bold'>BRN</Form.Label>
                    <Form.Control type="text" value={props.newBuyerData.brn} onChange={e => props.setNewBuyerData({
                        ...props.newBuyerData,
                        brn: e.target.value
                    })} />
                </Form.Group>

                <Form.Group controlId="contactPerson" className='mb-3'>
                    <Form.Label className='fw-bold'>Contact Person</Form.Label>
                    <Form.Control type="text" value={props.newBuyerData.contactPerson} onChange={e => props.setNewBuyerData({
                        ...props.newBuyerData,
                        contactPerson: e.target.value
                    })} />
                </Form.Group>

                <Form.Group controlId="buyerPhoneNo" className='mb-3'>
                    <Form.Label className='fw-bold'>Phone Number</Form.Label>
                    <Form.Control type="text" value={props.newBuyerData.phoneNo} onChange={e => props.setNewBuyerData({
                        ...props.newBuyerData,
                        phoneNo: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="contactPerson" className='mb-3'>
                    <Form.Label className='fw-bold'>Email Address</Form.Label>
                    <Form.Control type="text" value={props.newBuyerData.mailId} onChange={e => props.setNewBuyerData({
                        ...props.newBuyerData,
                        mailId: e.target.value
                    })} />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => props.setShowBuyerModal(false)}>Close</Button>
            
            {formName == "Add" ?
                <Button variant="primary" onClick={props.handleBuyerSubmit}>Save Buyer</Button>
                :
                <Button variant="primary" onClick={props.handleUpdateBuyerSubmit}>Update Buyer</Button>
            }
        </Modal.Footer>
    </Modal>);
}

export default AddBuyer;