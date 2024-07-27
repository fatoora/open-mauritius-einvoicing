import { useState, useEffect, useRef } from "react";
import {
  Table,
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
  Modal,
  Badge,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { RouterName } from "../../constants/Constants";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { get } from "../../Services/api";
import Sidebar from "../SideBar";

const InvoiceList = () => {
  const navigate = useNavigate();
  const [invoiceLogs, setInvoiceLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  // const [selectedLog, setSelectedLog] = useState(null);
  const itemsPerPage = 10;
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().endOf("month").toDate(),
    key: "selection",
  });
  const targetRef = useRef();

  useEffect(() => {
    const deviceDetails = JSON.parse(localStorage.getItem("deviceDetails"));

    if (!deviceDetails || !deviceDetails.deviceId) {
      navigate(RouterName.SIGN_IN);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [currentPage]);

  const fetchInvoices = () => {
    const deviceDetails = JSON.parse(localStorage.getItem("deviceDetails"));

    setIsError(false);
    setIsLoading(true);
    get(`/InvoiceRequest/GetInvoices`, {
      deviceId: deviceDetails.deviceId,
      page: currentPage,
      pageSize: itemsPerPage,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    })
      .then((response) => {
        if (response.status === 200) {
          setInvoiceLogs(response.data);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchInvoices();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDateRangeSelect = (ranges) => {
    var startDate = ranges.selection.startDate;
    var endDate = ranges.selection.endDate;
    setDateRange({ startDate, endDate, key: "selection" });
  };

  const popover = (
    <Popover id="popover-basic" style={{ minWidth: " 580px" }}>
      <Popover.Body>
        <DateRangePicker
          ranges={[dateRange]}
          onChange={handleDateRangeSelect}
        />
      </Popover.Body>
    </Popover>
  );

  const handleView = (log) => {
    window.localStorage.setItem("invoiceData", JSON.stringify(log));
    handleShowModal();
  };
    const handlePrint = () => {
        const printWindow = window.frames[0];
        var invData = localStorage.getItem("invoiceData");
        var invoiceDetailJson = JSON.parse(invData)
        window.document.title = invoiceDetailJson.invoiceNumber;
        printWindow.print();
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
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              rootClose
            >
              <Form.Control
                type="text"
                value={`📅  ${dayjs(dateRange.startDate).format(
                  "YYYY-MM-DD"
                )} - ${dayjs(dateRange.endDate).format("YYYY-MM-DD")}`}
                readOnly
              />
            </OverlayTrigger>

            <Button
              variant="primary"
              className="rounded-end"
              onClick={() => handleSearch()}
            >
              Search
            </Button>

            <Button
              variant="primary"
              className="rounded"
              style={{ marginLeft: "10px" }}
              onClick={() => navigate(RouterName.CREATE_INVOICE)}
            >
              Create +
            </Button>
          </InputGroup>
          <>
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <Spinner animation="grow" />
              </div>
            ) : isError ? (
              <div className="text-center" style={{ paddingTop: "40px" }}>
                <h5>Oops! Something went wrong.</h5>
              </div>
            ) : (
              <div className="w-100">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Invoice Number</th>
                      <th>Buyer</th>
                      <th>Total Amount</th>
                      <th>Date</th>
                      <th>Created By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceLogs && invoiceLogs.length > 0 ? (
                      invoiceLogs.map((log, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex justify-content-between">
                              {log.invoiceNumber}
                              {log.invoiceType !== "INVOICE" && NoteBadge(log)}
                            </div>
                          </td>
                          <td>{log.buyerName}</td>
                          <td>
                            {parseFloat(log.totalAmount).toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: log.currency,
                              }
                            )}
                          </td>
                          <td>
                            {dayjs(log.createdDateTime).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </td>
                          <td>{log.createdBy}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => handleView(log)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <div className="d-flex ">
                  <Button
                    variant="primary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ width: "90px", textAlign: "center" }}
                  >
                    Previous
                  </Button>
                  <Form.Control
                    className="mx-2"
                    value={currentPage}
                    onChange={(e) => {
                      if (e.target.value < 1) {
                        setCurrentPage(1);
                      } else {
                        setCurrentPage(e.target.value);
                      }
                    }}
                    type="number"
                    style={{ width: "50px", textAlign: "center" }}
                  />
                  <Button
                    variant="primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ width: "90px", textAlign: "center" }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        </Card.Body>

        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body ref={targetRef}>
            <iframe
              src={RouterName.PRINT_INVOICE}
              style={{ width: "100%", height: "600px" }}
            ></iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlePrint}>
              Print
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </>
  );

  function NoteBadge(log) {
    let noteType = log.invoiceType === "CREDIT_NOTE" ? "CN" : "DN";
    let noteTypeLabel =
      log.invoiceType === "CREDIT_NOTE" ? "Credit Note" : "Debit Note";

    return (
      <OverlayTrigger
        key="top"
        placement="bottom"
        overlay={
          <Tooltip id={`tooltip-top`}>
            {noteTypeLabel} for Invoice Number{" : "}
            {log.invoiceReferenceNumber} , Reason : {log.noteReason}
          </Tooltip>
        }
      >
        <Badge pill bg="secondary">
          {noteType}
        </Badge>
      </OverlayTrigger>
    );
  }
};

export default InvoiceList;
