import { Form, Button, Modal } from 'react-bootstrap';

function AddSeller(props) {
    var formName = "Add";
    if (props.sellerId != "") {
        formName = "Update";
    }
    return (<Modal show={props.showSellerModal} onHide={() => props.setShowSellerModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>{formName} Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="sellerName" className='mb-3'>
                    <Form.Label className='fw-bold'>Name</Form.Label>
                    <Form.Control type="text" value={props.newSellerData.name} onChange={e => props.setNewSellerData({
                        ...props.newSellerData,
                        name: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="sellerName" className='mb-3'>
                    <Form.Label className='fw-bold'>Email Address</Form.Label>
                    <Form.Control type="text" value={props.newSellerData.mailId} onChange={e => props.setNewSellerData({
                        ...props.newSellerData,
                        mailId: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="sellerAddress" className='mb-3'>
                    <Form.Label className='fw-bold'>Address</Form.Label>
                    <Form.Control type="text" value={props.newSellerData.address} onChange={e => props.setNewSellerData({
                        ...props.newSellerData,
                        address: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="sellerVatNumber" className='mb-3'>
                    <Form.Label className='fw-bold'>VAT Number</Form.Label>
                    <Form.Control type="text" value={props.newSellerData.vatNumber} onChange={e => props.setNewSellerData({
                        ...props.newSellerData,
                        vatNumber: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="sellerBrn" className='mb-3'>
                    <Form.Label className='fw-bold'>BRN</Form.Label>
                    <Form.Control type="text" value={props.newSellerData.brn} onChange={e => props.setNewSellerData({
                        ...props.newSellerData,
                        brn: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="sellerPhoneNo" className='mb-3'>
                    <Form.Label className='fw-bold'>Phone Number</Form.Label>
                    <Form.Control type="text" value={props.newSellerData.phoneNo} onChange={e => props.setNewSellerData({
                        ...props.newSellerData,
                        phoneNo: e.target.value
                    })} />
                </Form.Group>
                <Form.Group controlId="sellerBankInfo" className='mb-3'>
                    <Form.Label className='fw-bold'>Bank Info</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={props.newSellerData.bankInfo}
                        onChange={e => props.setNewSellerData({
                            ...props.newSellerData,
                            bankInfo: e.target.value
                        })}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => props.setShowSellerModal(false)}>Close</Button>

            {formName == "Add" ?
                <Button variant="primary" onClick={props.handleSellerSubmit}>Save Seller</Button>
                :
                <Button variant="primary" onClick={props.handleUpdateSellerSubmit}>Update Seller</Button>
            }
        </Modal.Footer>
    </Modal>);
}

export default AddSeller;