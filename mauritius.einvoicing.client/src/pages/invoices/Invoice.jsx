import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { RouterName } from "../../constants/Constants";
import InvoiceLineItem from "./invoiceLineItem/InvoiceLineitem";
import Partys from "./party/Partys";
import AdditionalInformation from "./additional/AdditionalInformation";
import AddSeller from "./seller/AddSeller";
import AddBuyer from "./buyer/AddBuyer";
import { get, post } from "../../Services/api";
import Sidebar from "../SideBar";
import { getMraErrorMessage, isMraError } from "../../Services/mraError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [isLoading, setLoading] = useState(false);
  const [sellersData, setSellersData] = useState([]);
  const [buyersData, setBuyersData] = useState([]);
  const [newSellerData, setNewSellerData] = useState({
    name: "",
    address: "",
    vatNumber: "",
    brn: "",
    phoneNo: "",
    bankInfo: "",
    mailId: "",
  });
  const [newBuyerData, setNewBuyerData] = useState({
    name: "",
    address: "",
    vatNumber: "",
    brn: "",
    phoneNo: "",
    buyerReference: "",
    vatType: "",
    mailId: "",
    contactPerson: ""
  });

  const [formData, setFormData] = useState({
    deviceId: "",
    currency: "USD",
    invoiceNumber: "",
    totalVatAmount: 0,
    totalAmountWithoutVat: 0,
    totalAmountPaid: 0,
    invoiceTotal: 0,
    sellerId: "",
    buyerId: "",
    conversionRate:0,
    lineItems: [
      {
        name: "",
        taxCode: "TC03",
        quantity: 0,
        nature: "GOODS",
        unitPrice: 0.0,
        vatAmount: 0.0,
        totalAmount: 0.0,
        unit: "PCS",
      },
    ],

    deliveryTerms: "",
    paymentTerms: "",
    noteReason: "",
    salesOrderNo: "",
    modeOfShipment: "",
    portOfLoading: "",
    portOfDischarge: "",
    netWeight: "",
    grossWeight: "",
    commodityCode: "",
    invoiceReferenceNumber: "",
    invoiceType: "INVOICE", // Default value when not adjustment
    noOfPackage: "",
    totalAmtWoVatMur: 0,
    fobCharge: 0,
    frightCharge: 0,
    insuranceCharge: 0,
    poNumber: "",
    incoTerms: "",
    systemInvoice: "",
  });

  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getAllSellers();
    getAllBuyers();
    const deviceDetails = JSON.parse(localStorage.getItem("deviceDetails"));
    if (deviceDetails) {
      setFormData((prevState) => ({
        ...prevState,
        deviceId: deviceDetails.deviceId,
      }));
    }
  }, []);

  useEffect(() => {
    calculateTotals(formData.lineItems);
  }, [formData.lineItems]);

  useEffect(()=>{
    setFormData((prevState) => ({ ...prevState, totalAmtWoVatMur: ((parseFloat(formData.totalAmountWithoutVat)+parseFloat(formData.insuranceCharge)+parseFloat(formData.frightCharge)+parseFloat(formData.fobCharge))*formData.conversionRate).toFixed(2)}));
  },[formData.fobCharge,formData.frightCharge,formData.insuranceCharge,formData.conversionRate])

  const getAllSellers = async () => {
    try {
      const res = await get("/Party/GetAllSellers");
      if (res.status === 200) setSellersData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllBuyers = async () => {
    try {
      const res = await get("/Party/GetAllBuyers");
      if (res.status === 200) setBuyersData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelect = async (e) => {
    const { name, value } = e.target;
    handleInputChange(e);
    if (name === "sellerId") {
      try {
        if (value) {
          const res = await get(`/Party/GetSeller?sellerId=${value}`);
          if (res.status === 200) setNewSellerData(res.data);
        } else {
          setNewSellerData({ name: "", address: "", vatNumber: "", brn: "", phoneNo: "", bankInfo: "", mailId: "" });
        }
      } catch (error) {
        console.error(error);
      }
    } else if (name === "buyerId") {
      try {
        if (value) {
          const res = await get(`/Party/GetBuyer?buyerId=${value}`);
          if (res.status === 200) setNewBuyerData(res.data);
        } else {
          setNewBuyerData({ name: "", address: "", vatNumber: "", brn: "", phoneNo: "", buyerReference: "", vatType: "", mailId: "", contactPersion: "" });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLineItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedLineItems = [...formData.lineItems];
    if (name == "unitPrice") {
      const regex = /^(\d+)?(\.\d{0,2})?$/;
      if (regex.test(value) != true) {
        toast.error(
          "Unit Price of item should consist of a maximum of two decimal places"
        );
        return;
      }
    }
    if (name == "quantity") {
      const regex = /^(\d+)?(\.\d{0,3})?$/;
      if (regex.test(value) != true) {
        toast.error(
          "Quantity of item should consist of a maximum of three decimal places"
        );
        return;
      }
    }
    if (index < updatedLineItems.length) {
      updatedLineItems[index] = {
        ...updatedLineItems[index],
        [name]: value,
      };
      const { vatAmount, lineTotalAmount } = calculateLineItemAmounts(
        updatedLineItems[index]
      );
      updatedLineItems[index].vatAmount = vatAmount;
      updatedLineItems[index].totalAmount = lineTotalAmount;
    } else {
      const newLineItem = { [name]: value };
      updatedLineItems.push(newLineItem);
      const { vatAmount, lineTotalAmount } =
        calculateLineItemAmounts(newLineItem);
      newLineItem.vatAmount = vatAmount;
      newLineItem.lineTotalAmount = lineTotalAmount;
    }

    setFormData((prevState) => ({
      ...prevState,
      lineItems: updatedLineItems,
    }));

    calculateTotals(updatedLineItems);
  };

  const calculateLineItemAmounts = (item) => {
    const quantity = parseFloat(item.quantity);
    const unitPrice = parseFloat(item.unitPrice);
    const rate = item.taxCode === "TC01" ? 0.15 : 0.0;

    let vatAmount = quantity * unitPrice * rate;
    vatAmount = parseFloat(truncateToTwoDecimals(parseFloat(vatAmount)));

    let lineTotalAmount = quantity * unitPrice + vatAmount;

    lineTotalAmount = truncateToTwoDecimals(parseFloat(lineTotalAmount));
    return { vatAmount, lineTotalAmount };
  };

  const calculateTotals = (lineItems) => {
    let totalVatAmount = 0.0;
    let totalAmountWithoutVat = 0.0;

    lineItems.forEach((item) => {
      const { vatAmount, lineTotalAmount } = calculateLineItemAmounts(item);

      item.vatAmount = vatAmount;
      item.totalAmount = lineTotalAmount;
      totalVatAmount += vatAmount;
        totalAmountWithoutVat += parseFloat(item.quantity) * parseFloat(item.unitPrice);
    });

    const invoiceTotal = truncateToTwoDecimals(
      parseFloat(totalVatAmount) + parseFloat(totalAmountWithoutVat)
    );
    totalVatAmount = truncateToTwoDecimals(parseFloat(totalVatAmount));
    totalAmountWithoutVat = truncateToTwoDecimals(
      parseFloat(totalAmountWithoutVat)
    );

    setFormData((prevState) => ({
      ...prevState,
      lineItems,
      totalVatAmount,
      totalAmountWithoutVat,
      invoiceTotal,
      totalAmountPaid: invoiceTotal,
    }));
  };
  // Truncate number to two decimal places without rounding
  const truncateToTwoDecimals = (num) => {
    const numStr = num.toString();
    const dotIndex = numStr.indexOf(".");
    // If there is a decimal point, and there are more than two digits after it, slice the string
    if (dotIndex !== -1 && numStr.length > dotIndex + 3) {
      return parseFloat(numStr.substring(0, dotIndex + 3));
    }
    return parseFloat(numStr); // Return as is if no truncation needed
  };
  const handleAddLineItem = () => {
    setFormData((prevState) => ({
      ...prevState,
      lineItems: [
        ...prevState.lineItems,
        {
          name: "",
          taxCode: "TC03",
          quantity: 0,
          nature: "GOODS",
          unitPrice: 0.0,
          vatAmount: 0.0,
          totalAmount: 0.0,
          unit: "PCS",
        },
      ],
    }));
  };

  const handleDeleteLineItem = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      lineItems: prevState.lineItems.filter((_, i) => i !== index),
    }));
    calculateTotals(formData.lineItems.filter((_, i) => i !== index));
  };

  const handleSaveInvoice = () => {
    setLoading(true);
    let isInvalid = false;
    isInvalid = validate(formData, isInvalid);

    if (isInvalid) {
      setLoading(false);
      return;
    }

    post("/InvoiceRequest/Submit", formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Invoice saved successfully.");
          navigate(RouterName.INVOICES);
        }
      })
      .catch((error) => {
        console.error(error);

        if (isMraError(error.response.data.Message)) {
          const erros = getMraErrorMessage(error.response.data.Message);
          if (erros && error !== "" && erros !== undefined) {
            toast.error(erros);
          } else {
            toast.error("Something went wrong, Please try again later.");
          }
        } else {
          toast.error("Something went wrong, Please try again later.");
          console.log(error.response.data);
        }
        setLoading(false);
      });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}></Tooltip>
  );

  const handleSellerSubmit = async () => {
    if (newSellerData.brn.length >11) {
      toast.error("Please enter brn length is maximum 11");
      return;
    }
    try {
      const res = await post("/Party/AddSeller", newSellerData);
      if (res.status === 200) {
        setNewSellerData(res.data);
        getAllSellers();
      }
    } catch (error) {
      console.error(error);
    }
    setShowSellerModal(false);
  };

  const handleUpdateSellerSubmit = async () => {
    try {
      const res = await post("/Party/UpdateSeller?sellerId=" + formData.sellerId, newSellerData);
      if (res.status === 200) {
        setNewSellerData(newSellerData);
        getAllSellers();
      }
    } catch (error) {
      console.error(error);
    }
    setShowSellerModal(false);
  };
  const [isAdjustment, setIsAdjustment] = useState(false);

  const handleToggleChange = (e) => {
    const isChecked = e.target.checked;
    setIsAdjustment(isChecked);

    if (isChecked && formData.invoiceType === "INVOICE") {
      setFormData((prevState) => ({
        ...prevState,
        invoiceType: "CREDIT_NOTE", // Default value when adjustment
      }));
    }

    if (!isChecked) {
      setFormData((prevState) => ({
        ...prevState,
        invoiceType: "INVOICE", // Default value when not adjustment
        invoiceReferenceNumber: "", // Clear when not adjustment
        noteReason: "", // Clear when not adjustment
      }));
    }
  };

  const handleBuyerSubmit = async () => {
    if (newBuyerData.vatType === "") {
      toast.error("Please select a VAT Type.");
      return;
    }
    if (newBuyerData.brn.length >11) {
      toast.error("Please enter brn length is maximum 11");
      return;
    }
    try {
      const res = await post("/Party/AddBuyer", newBuyerData);
      if (res.status === 200) {
        setNewBuyerData(res.data);
        getAllBuyers();
      }
    } catch (error) {
      console.error(error);
    }
    setShowBuyerModal(false);
  };
  const handleUpdateBuyerSubmit = async () => {
    try {
      const res = await post("/Party/UpdateBuyer?buyerId=" + formData.buyerId, newBuyerData);
      if (res.status === 200) {
        setNewBuyerData(newBuyerData);
        getAllBuyers();
      }
    } catch (error) {
      console.error(error);
    }
    setShowBuyerModal(false);
  };
  return (
    <>
      <Sidebar />
      <Container className="p-2">
        <Form>
          <Partys
            sellersData={sellersData}
            buyersData={buyersData}
            newSellerData={newSellerData}
            newBuyerData={newBuyerData}
            formData={formData}
            setShowSellerModal={setShowSellerModal}
            setShowBuyerModal={setShowBuyerModal}
            handleSelect={handleSelect}
          ></Partys>
          <div className="p-4 bg-light rounded shadow-sm mb-4">
            <h5 className="fw-bold mb-4">Invoice Details</h5>
            <Row>
              <Col xs={4} md={4} lg={4} className="mb-3">
                <Form.Group controlId="currency">
                  <Form.Label className="fw-bold">Currency</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={renderTooltip({
                      children: "Select the currency for the transaction",
                    })}
                  >
                    <Form.Select
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      aria-label="Select Currency"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="MUR">MUR</option>
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group controlId="invoiceNumber">
                  <Form.Label className="fw-bold">Invoice Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3 align-content-end">
                <Form.Group controlId="isAdjustment" className="mt-4">
                  <Form.Switch
                    label="Is Adjustment"
                    name="isAdjustment"
                    checked={isAdjustment}
                    onChange={handleToggleChange}
                    className="custom-switch"
                    style={{ fontSize: "1.2rem" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {isAdjustment && (
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="invoiceType">
                    <Form.Label className="fw-bold">Invoice Type</Form.Label>
                    <OverlayTrigger
                      placement="right"
                      overlay={renderTooltip({
                        children: "Select invoice type",
                      })}
                    >
                      <Form.Select
                        name="invoiceType"
                        value={formData.invoiceType}
                        onChange={handleInputChange}
                        aria-label="Select invoice type"
                      >
                        <option value="CREDIT_NOTE">CREDIT NOTE</option>
                        <option value="DEBIT_NOTE">DEBIT NOTE</option>
                      </Form.Select>
                    </OverlayTrigger>
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="invoiceReferenceNumber">
                    <Form.Label className="fw-bold">
                      Invoice Reference Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="invoiceReferenceNumber"
                      value={formData.invoiceReferenceNumber}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="noteReason">
                    <Form.Label className="fw-bold">Reason</Form.Label>
                    <Form.Control
                      type="text"
                      name="noteReason"
                      value={formData.noteReason}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </div>
          <AdditionalInformation
            formData={formData}
            handleInputChange={handleInputChange}
            renderTooltip={renderTooltip}
          ></AdditionalInformation>
          <InvoiceLineItem
            lineItems={formData.lineItems}
            handleLineItemChange={handleLineItemChange}
            handleAddLineItem={handleAddLineItem}
            handleDeleteLineItem={handleDeleteLineItem}
          ></InvoiceLineItem>
          <Container fluid className="mb-3">
            <Form.Group className="d-flex justify-content-end">
              <Row className="w-100">
                <Col md={4} className="d-flex flex-column"></Col>
                <Col md={8} className="">
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Invoice Total
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="text"
                        name="invoiceTotal"
                        value={parseFloat(formData.invoiceTotal).toLocaleString(
                          "en-US",
                          { style: "currency", currency: formData.currency }
                        )}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Total Vat Amount
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="text"
                        name="totalVatAMnt"
                        value={parseFloat(
                          formData.totalVatAmount
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: formData.currency,
                        })}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Total Amount Without Vat
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="text"
                        name="totalAmountWithoutVat"
                        value={parseFloat(
                          formData.totalAmountWithoutVat
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: formData.currency,
                        })}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Total Amount Paid
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="number"
                        name="toalAmountPaid"
                        value={formData.totalAmountPaid}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row> */}
                  {/*Additional charges start*/}
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        FOB Charges
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="number"
                        name="fobCharge"
                        value={formData.fobCharge}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Fright Charges
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="number"
                        name="frightCharge"
                        value={formData.frightCharge}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Insurance Charges
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="number"
                        name="insuranceCharge"
                        value={formData.insuranceCharge}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Total Amount
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="text"
                        name="totalAmount"
                        value={parseFloat(parseFloat(formData.totalAmountWithoutVat)+(parseFloat(formData.insuranceCharge)+parseFloat(formData.frightCharge)+parseFloat(formData.fobCharge))).toLocaleString(
                          "en-US",
                          { style: "currency", currency: formData.currency }
                        )}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Conversion Rate
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="number"
                        name="conversionRate"
                        value={formData.conversionRate}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  {/*Additional charges End*/}
                  <Row className="mb-1">
                    <Col
                      md={6}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Label className="fw-bold mb-0">
                        Total Amount Without Vat In Mauritius Currency
                      </Form.Label>
                    </Col>
                    <Col md={2} className="text-end">
                      :
                    </Col>
                    <Col
                      md={3}
                      xs="auto"
                      className="text-left d-flex align-items-center gap-2"
                    >
                      <Form.Control
                        type="number"
                        name="totalAmtWoVatMur"
                        value={formData.totalAmtWoVatMur}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Group>
          </Container>

          <Row className="mb-3">
            <Col className="d-flex justify-content-end gap-4">
              {/*<Button variant="success" onClick={handleSaveInvoice}>*/}
              {/*  Submit Invoice*/}
              {/*</Button>*/}
              <Button
                variant="success"
                disabled={isLoading}
                onClick={!isLoading ? handleSaveInvoice : null}
              >
                {isLoading ? 'Loading...' : 'Submit Invoice'}
              </Button>
            </Col>
          </Row>
        </Form>
        <AddSeller
          sellerId={formData.sellerId}
          newSellerData={newSellerData}
          setNewSellerData={setNewSellerData}
          showSellerModal={showSellerModal}
          setShowSellerModal={setShowSellerModal}
          handleSellerSubmit={handleSellerSubmit}
          handleUpdateSellerSubmit={handleUpdateSellerSubmit}
        ></AddSeller>
        <AddBuyer
          buyerId={formData.buyerId}
          newBuyerData={newBuyerData}
          setNewBuyerData={setNewBuyerData}
          showBuyerModal={showBuyerModal}
          setShowBuyerModal={setShowBuyerModal}
          handleBuyerSubmit={handleBuyerSubmit}
          handleUpdateBuyerSubmit={handleUpdateBuyerSubmit}

        ></AddBuyer>
      </Container>
    </>
  );
};

export default CreateInvoice;
function validate(formData, isInvalid) {
  if (formData.sellerId === "") {
    toast.error("Please select a seller.");
    isInvalid = true;
  }

  if (formData.buyerId === "") {
    toast.error("Please select a buyer.");
    isInvalid = true;
  }

  if (formData.invoiceNumber === "") {
    toast.error("Please enter invoice number.");
    isInvalid = true;
  }

  if (
    formData.invoiceType != "INVOICE" &&
    formData.invoiceReferenceNumber === ""
  ) {
    toast.error("Please enter invoice  reference number for adjustment.");
    isInvalid = true;
  }

  if (formData.invoiceType != "INVOICE" && formData.noteReason === "") {
    toast.error("Please enter reason for adjustment.");
    isInvalid = true;
  }

  if (formData.totalAmountWithoutVat === 0) {
    toast.error(
      "Total amount without vat should not be zero. Please add line items."
    );
    isInvalid = true;
  }

  if (formData.currency === "USD" && formData.totalAmtWoVatMur == 0) {
    toast.error(
      "Total amount without vat in mauritius currency should not be zero."
    );
    isInvalid = true;
  }
  return isInvalid;
}
