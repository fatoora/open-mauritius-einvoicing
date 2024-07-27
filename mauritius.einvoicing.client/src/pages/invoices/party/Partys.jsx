import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaPlus,FaEdit } from 'react-icons/fa';

function Partys(props) {
    return (
    <Row className='p-4 d-flex gap-4'>
        <Col className='bg-light p-4 rounded shadow-sm'>
            <h5 className='fw-bold mb-4'>Seller Details</h5>
            <div className='mb-3'>
                <Form.Group controlId="sellerSelect">
                    <div className='d-flex gap-2'>
                        <InputGroup className='flex-grow-1'>
                            <Form.Select name="sellerId" value={props.formData.sellerId} onChange={props.handleSelect} className='form-select-lg'>
                                <option value="">Select Seller</option>
                                {props.sellersData.map(seller => <option key={seller.id} value={seller.id}>
                                    {seller.name}
                                </option>)}
                            </Form.Select>
                        </InputGroup>
                        <Button variant="outline-primary" onClick={() => props.setShowSellerModal(true)} className='d-flex align-items-center'>
                            <FaPlus className='me-1' /> Add
                        </Button>
                    </div>
                </Form.Group>
            </div>
            <div className='mb-3'>
                    <Form.Label className='fw-bold'>Name: {props.formData.sellerId != "" ? <FaEdit className='me-1' onClick={() => props.setShowSellerModal(true)} /> : ""}</Form.Label>
                <div>{props.newSellerData.name}</div>
                </div>
                <div className='mb-3'>
                    <Form.Label className='fw-bold'>Email Address:</Form.Label>
                    <div>{props.newSellerData.mailId}</div>
                </div>
            <div className='mb-3'>
                <Form.Label className='fw-bold'>Address:</Form.Label>
                <div>{props.newSellerData.address}</div>
            </div>
            <div className='mb-3'>
                <Row>
                    <Col>
                        <Form.Label className='fw-bold'>VAT Number:</Form.Label>
                        <div>{props.newSellerData.vatNumber}</div>
                    </Col>
                    <Col>
                        <Form.Label className='fw-bold'>BRN:</Form.Label>
                        <div>{props.newSellerData.brn}</div>
                    </Col>
                    <Col>
                        <Form.Label className='fw-bold'>Phone Number:</Form.Label>
                        <div>{props.newSellerData.phoneNo}</div>
                    </Col>
                        
                </Row>
                <Row>
                   <Col>
                     <Form.Label className='fw-bold'>Bank Info:</Form.Label>
                     <div>{props.newSellerData.bankInfo}</div>
                   </Col>
                </Row>
            </div>
        </Col>
        <Col className='bg-light p-4 rounded shadow-sm'>
            <h5 className='fw-bold mb-4'>Buyer Details</h5>
            <div className='mb-3'>
                <Form.Group controlId="buyerSelect">
                    <div className='d-flex gap-2'>
                        <InputGroup className='flex-grow-1'>
                            <Form.Select name="buyerId" value={props.formData.buyerId} onChange={props.handleSelect} className='form-select-lg'>
                                <option value="">Select Buyer</option>
                                {props.buyersData.map(buyer => <option key={buyer.id} value={buyer.id}>
                                    {buyer.name}
                                </option>)}
                            </Form.Select>
                        </InputGroup>
                        <Button variant="outline-primary" onClick={() => props.setShowBuyerModal(true)} className='d-flex align-items-center'>
                            <FaPlus className='me-1' /> Add
                        </Button>
                    </div>
                </Form.Group>
                </div>
                <div className='mb-3'>
                    <Form.Label className='fw-bold'>Buyer Reference Number: {props.formData.buyerId != "" ? <FaEdit className='me-1' onClick={() => props.setShowBuyerModal(true)} /> : ""}</Form.Label>
                    <div>{props.newBuyerData.buyerReference}</div>
                </div>
            <div className='mb-3'>
                    <Form.Label className='fw-bold'>Name:</Form.Label>
                <div>{props.newBuyerData.name}</div>
            </div>
            <div className='mb-3'>
                <Form.Label className='fw-bold'>Address:</Form.Label>
                <div>{props.newBuyerData.address}</div>
            </div>
            <div className='mb-3'>
                    <Row>
                        <Col>
                            <Form.Label className='fw-bold'>VAT Type:</Form.Label>
                            <div>{props.newBuyerData.vatType}</div>
                        </Col>
                    <Col>
                        <Form.Label className='fw-bold'>VAT Number:</Form.Label>
                        <div>{props.newBuyerData.vatNumber}</div>
                    </Col>
                    <Col>
                        <Form.Label className='fw-bold'>BRN:</Form.Label>
                        <div>{props.newBuyerData.brn}</div>
                        </Col>
                </Row>
                </div>

                <div className='mb-3'>
                    <Row>
                        <Col>
                            <Form.Label className='fw-bold'>Contact Person:</Form.Label>
                            <div>{props.newBuyerData.contactPerson}</div>
                        </Col>
                        <Col>
                            <Form.Label className='fw-bold'>Phone Number:</Form.Label>
                            <div>{props.newBuyerData.phoneNo}</div>
                        </Col>
                        <Col>
                            <Form.Label className='fw-bold'>Email Address:</Form.Label>
                            <div>{props.newBuyerData.mailId}</div>
                        </Col>
                    </Row>
                </div>
        </Col>
    </Row>);
}

export default Partys;