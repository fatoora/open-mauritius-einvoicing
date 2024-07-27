import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import { ToWords } from 'to-words';
import '../../../../src/index.css';
import { get } from '../../../Services/api';
import logo from "../../../../public/logo.png"; // Import the logo
function InvoicePrint() {
    
    const toWords = new ToWords({
        localeCode: 'en-US',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            //currencyOptions: {
            //    // can be used to override defaults for the selected locale
            //    name: 'Rupee',
            //    plural: 'Rupees',
            //    symbol: '',
            //    fractionalUnit: {
            //        name: 'Paisa',
            //        plural: 'Paise',
            //        symbol: '',
            //    },
            //},
        },
    });

    const [invoiceData, setInvoiceData] = useState({});
    const [sellerData, setSellerData] = useState({});
    const [buyerData, setBuyerData] = useState({});
    const date = dayjs(invoiceData.createdDateTime).format('DD-MM-YYYY');

    const [cipMaputoTotal, setCipMaputoTotal] = useState(0);
    let qtyTotal = 0; // Initialize total quantity

  
    const containerRef = useRef(null);
    useEffect(() => {
        const fetchInvoiceData = async () => {
            const invoice = window.localStorage.getItem('invoiceData');
            if (invoice) {
                var invoiceDetailJson = JSON.parse(invoice)
                setInvoiceData(invoiceDetailJson);
                setCipMaputoTotal(invoiceDetailJson.totalAmount + invoiceDetailJson.fobCharge + invoiceDetailJson.frightCharge + invoiceDetailJson.insuranceCharge);
                document.title = invoiceDetailJson.invoiceNumber; //For invoice save file name
            }

            if (invoiceData.sellerId) {
                await getSeller();
            }

            if (invoiceData.buyerId) {
                await getBuyer();
            }
        };

        fetchInvoiceData();

       
        if (containerRef.current) {
            //const elements = Array.from(containerRef.current.getElementsByClassName('printable_col'));
            var className = 'printable_col';
            const elements = Array.from(containerRef.current.querySelectorAll(`.${className}`));
            var totalUsedHeight = 0;
            var totalHeight = 600;
            elements.forEach((element,index) => {
               
                totalUsedHeight += element.offsetHeight;
                if (totalUsedHeight >= totalHeight) {
                    if (totalUsedHeight >= 645) {
                        insertPageBreakBefore(elements[index - 1]); //QR code column
                    } else {
                        insertPageBreakBefore(element); //QR code column
                    }
                    totalUsedHeight = 0;
                    //elements[index - 1].innerHTML = elements[index - 1].innerHTML + '<br>';
                }
                
            });
            //console.log(totalUsedHeight);
            //for (let i = 0; i < elements.length; i++) {
            //var i = elements.length;
           
            //if (i == 18) {
            //    insertPageBreakBefore(elements[17]); //QR code column
            //}
            //else if (i >= 18 && i <= 20) {
            //    insertPageBreakBefore(elements[18]); //QR code column
            //}else if (i >= 18 && i<=25) {
            //        insertPageBreakBefore(elements[22]); //QR code column
            //    }
        }
    }, [invoiceData.sellerId, invoiceData.buyerId]);

    function insertPageBreakBefore(element) {
        if (element.className == 'printable_col is_line') {

            var idName = 'is_line_' + element.id;
            const child_elements = Array.from(containerRef.current.querySelectorAll(`.${idName}`));
            for (var i = 0; i < child_elements.length; i++) {

                child_elements[i].className = child_elements[i].className + ' new-page';
                element.className = element.className + ' new-page';
            }
        } else {
            const breakElement = document.createElement('div');
            breakElement.className = 'new-page';
            element.parentNode.insertBefore(breakElement, element);
        }
    }
    // Parse invoiceLineItems if it's a string
    let parsedInvoiceLineItems = [];
    if (typeof invoiceData.invoiceLineItems === 'string') {
        try {
            parsedInvoiceLineItems = JSON.parse(invoiceData.invoiceLineItems);
        } catch (error) {
            console.error('Error parsing invoiceLineItems:', error);
        }
    } else {
        parsedInvoiceLineItems = invoiceData.invoiceLineItems || [];
    }
    parsedInvoiceLineItems.forEach(item => {
        qtyTotal += item.Quantity; // Calculate total quantity
    });
    const getSeller = async () => {
       
        try {
            const res = await get(`/Party/GetSeller?sellerId=${invoiceData.sellerId}`);
            if (res.status === 200) {
                setSellerData(res.data);
            }
        } catch (error) {
            console.error('Error fetching seller:', error);
        }
    };

    const getBuyer = async () => {
        try {
            const res = await get(`/Party/GetBuyer?buyerId=${invoiceData.buyerId}`);
            if (res.status === 200) {
                setBuyerData(res.data);
            }
        } catch (error) {
            console.error('Error fetching buyer:', error);
        }
    };

    return (
        
        <div className='w-100' ref={containerRef}>
            <div className='header' style={{ position: 'fixed', top: 0, width: '100%', textAlign: 'center', background: 'white', paddingTop: '5mm' }}>
                <Row>
                    <Col xs={3} md={3} lg={3} className="d-flex justify-content-end mb-3">
                        <img src={logo} width='50' style={{ marginRight: '-26px', marginTop:'-12px' }} />
                    </Col>
                    <Col xs={9} md={9} lg={9} className="d-flex justify-content-start">
                        <h1 className='text-center' style={{ fontWeight: 'bold' }}>DEVBEE PRIVATE LIMITED</h1>
                    </Col>
                   <hr />
                 </Row>
            </div>

            <div className='content' style={{ marginTop: '20mm', marginBottom: '20mm', fontSize: '11px', height:'560px' }}>
                <Row>
                    <Col className="mb-0">
                        <p></p>
                        <div className="w-100 printable_col">
                            <p className="mb-0" style={{ textDecoration: 'underline' }}><b>CONSIGNEE:</b></p>
                            <p className="mb-0"><b>{invoiceData.buyerName != null ? invoiceData.buyerName : buyerData.name}</b></p>
                            <p className="mb-0">{invoiceData.buyerAddress != null ? invoiceData.buyerAddress : buyerData.address}</p>
                            <p className="mb-0"><b>{buyerData.contactPerson}</b></p>
                            <p className="mb-0"><b>CONTACT : {invoiceData.buyerPhoneNo != null ? invoiceData.buyerPhoneNo : buyerData.phoneNo}</b></p>
                            {buyerData.vatNumber != null && buyerData.vatNumber !="" ? <p className="mb-0"><b>VAT: {buyerData.vatNumber} </b></p> : ""}
                            {buyerData.brn != null && buyerData.brn != "" ? <p className="mb-0"><b>BRN: {buyerData.brn} </b></p> : ""}
                            <p className="mb-0"><b>{buyerData.mailId}</b></p>
                        </div>
                    </Col>
                    <Col className="text-end"></Col>
                    <Col className="text-end"></Col>
                    <Col className="mb-0">
                        <div className="w-75 mx-auto">
                            <p className="mb-0"><b>{date}</b></p>
                            <p></p>
                        </div>
                        <div className="w-100 printable_col">
                            <p className="mb-0" style={{ textDecoration: 'underline' }}><b>SHIPPER:</b></p>
                            <p className="mb-0"><b>{sellerData.name}</b></p>
                            <p className="mb-0">{sellerData.address}</p>
                            <p className="mb-0"><b>VAT NUMBER: {sellerData.vatNumber}</b></p>
                            <p className="mb-0"><b>{sellerData.mailId}</b></p>
                        </div>
                    </Col>
                </Row>
                <p className='mb-0 text-center' style={{ textDecoration: "underline" }}><b>COMMERCIAL INVOICE NO.</b></p>
                <p className='text-center mb-0' style={{ textDecoration: "underline" }}><b>{invoiceData.invoiceNumber}</b></p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, auto)', gap: '10px', margin: '0px' }}>
                    <div style={{ fontWeight: 'bold', textDecoration: "underline"}}>DESCRIPTION OF GOODS</div>
                    <div style={{ fontWeight: 'bold', textDecoration: "underline"}}>QUANTITY SHIPPED</div>
                    <div style={{ fontWeight: 'bold', textDecoration: "underline" }}>UNIT</div>
                    <div style={{ fontWeight: 'bold', textDecoration: "underline"}}>PRICE</div>
                    <div style={{ fontWeight: 'bold', textDecoration: "underline"}}>VAT</div>
                    <div style={{ fontWeight: 'bold', textDecoration: "underline"}}>TOTAL AMT(USD)</div>

                    {parsedInvoiceLineItems && parsedInvoiceLineItems.map((item, index) => (
                      
                        <React.Fragment key={index}>
                           
                            <div className='printable_col is_line' id={index} style={{ width: "150px" }}>{item.Name}</div>
                            <div className={`currency is_line_${index}`} style={{ width: "100px" }}>{item.Quantity.toFixed(3)}</div>
                            <div className={`currency is_line_${index}`} style={{ width: "10px" }}>{item?.Unit != null ? item?.Unit:"PCS"}</div>
                            <div className={`currency is_line_${index}`} style={{ width: "20px" }}>{item.UnitPrice != null ? item.UnitPrice.toFixed(2) : ""}</div>
                            <div className={`currency is_line_${index}`} style={{ width: "20px" }}>{item.VatAmount != null ? item.VatAmount.toLocaleString() : ""}</div>
                            <div className={`currency is_line_${index}`}>{item.TotalAmount != null ? item.TotalAmount.toFixed(2) : ""}</div>
                        </React.Fragment>
                    ))}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div style={{ borderTop: '1px solid black', borderBottom: "1px solid black" }} className='currency'>{invoiceData.totalAmount != null ? invoiceData.totalAmount.toFixed(2) : ""}</div>
                    {invoiceData.fobCharge != 0 && invoiceData.fobCharge != "" && invoiceData.fobCharge != null &&(
                         <>
                            <div style={{ fontWeight: 'bold' }}>FOB CHARGES</div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div style={{ fontWeight: 'bold' }} className='currency printable_col'>{invoiceData.fobCharge != null ? invoiceData.fobCharge.toLocaleString() : ""}</div>
                          </>
                        )
                    }
                    {invoiceData.frightCharge != 0 && invoiceData.frightCharge != "" && invoiceData.frightCharge != null &&(
                        <>
                        <div>FREIGHT CHARGES</div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                            <div className='currency printable_col'>{invoiceData.frightCharge != null ? invoiceData.frightCharge.toLocaleString() : ""}</div>
                        </>
                    )
                    }
                    {invoiceData.insuranceCharge != 0 && invoiceData.insuranceCharge != "" && invoiceData.insuranceCharge != null &&(
                        <>
                            <div>INSURANCE CHARGES</div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div className='currency printable_col'>{invoiceData.insuranceCharge}</div>
                        </>
                    )
                    }
                    <div style={{ fontWeight: 'bold' }}>TOTAL</div>
                    <div style={{ fontWeight: 'bold', borderTop: '1px solid black', borderBottom: "1px solid black", width: "100px" }} className='currency'>{qtyTotal.toFixed(3)}</div>
                       
                    <div></div>
                    <div></div>
                    <div style={{ fontWeight: 'bold' }}>{invoiceData.incoTerms}</div>
                    <div style={{ fontWeight: 'bold', borderTop: '1px solid black', borderBottom: "1px solid black" }} className='currency'>{cipMaputoTotal.toFixed(2)}</div>
                </div>

                <p className='mt-2' style={{ fontSize: "11px" }}><b>{toWords.convert(cipMaputoTotal.toString())}</b></p>
                 
                <div style={{ fontSize: "11px" }}>
                    {invoiceData.salesOrderNo != "" && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                                <div>SALES ORDER NUMBER</div>
                                <div>:</div>
                                <div>{invoiceData.salesOrderNo}</div>
                            </div>
                        </>
                    )
                    }

                    {invoiceData.poNumber != "" && invoiceData.poNumber != null &&(
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>PO NUMBER</div>
                            <div>:</div>
                                <div>{invoiceData.poNumber}</div>
                            </div>
                        </>
                    )
                    }
                    {invoiceData.systemInvoice != "" && invoiceData.systemInvoice != null && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>INVOICE NO</div>
                            <div>:</div>
                                <div>{invoiceData.systemInvoice}</div>
                                </div>
                        </>
                    )
                    }
                    {invoiceData.commodityCode != "" && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>H.S.COMMODITY CODE</div>
                            <div>:</div>
                                <div>{invoiceData.commodityCode}</div>
                               </div>
                        </>
                    )
                    }
                    {invoiceData.modeOfShipment != "" && (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>MODE OF SHIPMENT</div>
                            <div>:</div>
                                <div>{invoiceData.modeOfShipment}</div>
                                </div>
                        </>
                    )
                    }
                   
                    {invoiceData.portOfLoading != "" && (
                        <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>ON BOARD</div>
                            <div>:</div>
                                <div>{invoiceData.portOfLoading}</div>
                            </div>
                        </>
                    )
                    }
                    {invoiceData.portOfDischarge != "" && (
                        <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>FOR TRANSPORTATION TO</div>
                            <div>:</div>
                                <div>{invoiceData.portOfDischarge}</div>
                            </div>
                        </>
                    )
                    }

                    {invoiceData.paymentTerms != "" && (
                        <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>PAYMENT TERMS</div>
                            <div>:</div>
                            <div>
                                {invoiceData.paymentTerms} <br/><b>{sellerData.bankInfo}</b>
                                </div>
                            </div>
                        </>
                    )
                    }
                   

                    {invoiceData.deliveryTerms != "" && invoiceData.deliveryTerms != null &&(
                        <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>DELIVERY TERMS</div>
                            <div>:</div>
                                <div>{invoiceData.deliveryTerms}</div>
                            </div>
                        </>
                    )
                    }
                   

                    {buyerData.buyerReference != "" && buyerData.buyerReference != null &&(
                        <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>BUYER REFERENCE</div>
                            <div>:</div>
                                <div>{buyerData.buyerReference}</div>
                            </div>
                        </>
                    )
                    }
                   

                    {invoiceData.noOfPackage != "" && invoiceData.noOfPackage != null &&(
                        <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>No OF PACKAGES</div>
                            <div>:</div>
                                <div>{invoiceData.noOfPackage}</div>
                            </div>
                        </>
                    )
                    }
                    

                    {invoiceData.netWeight != "" && (
                        <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>TOTAL NET WEIGHT IN KG</div>
                            <div>:</div>
                                <div>{invoiceData.netWeight}</div>
                            </div>
                        </>
                    )
                    }
                    

                    {invoiceData.grossWeight != "" && (
                        <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', columnGap: '10px' }} className='printable_col'>
                            <div>TOTAL GROSS WEIGHT IN KG</div>
                            <div>:</div>
                                <div>{invoiceData.grossWeight}</div>
                            </div>
                        </>
                    )
                    }
                   
                </div>
                <div className='printable_col'>
                    <p className='mt-2' style={{ fontSize: "11px" }}><b>WE HEREBY CERTIFY THAT THIS INVOICE IS TRUE AND CORRECT AND THAT THE GOODS<br /> ARE OF MAURITIUS ORIGIN.</b></p>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <p className='mt-2' style={{ fontSize: "11px" }}>FOR EMPAK(AFRICA)LTD</p>
                            <p className='mb-5 mt-4' style={{ fontSize: "11px" }}>AUTHORISED SIGNATORY</p>
                        </div>
                        <img src={`data:image/png;base64,${invoiceData.qrCode}`} alt="qrCode" style={{ width: '100px', height: '100px', marginTop: '-15px' }} />
                    </div>
                </div>
            </div>

            <div className='footer' style={{ position: 'fixed', bottom: 0, width: '100%', background: 'white', fontSize: '15px' }}>
                <hr className='color-black mb-0' />
                {/* <div className="container-fluid py-2">
                    <div className="row mt-1">
                        <div className="col-md-4">
                            <p className="mb-0"></p>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-9">
                            <p className="mb-0"></p>
                        </div>
                        <div className="col-3">
                            <p className="mb-0"></p>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-4">
                            <p className="mb-0"></p>
                        </div>
                        <div className="col-4 d-flex justify-content-start bg-red">
                            <p className="mb-0" style={{ marginLeft: '-10px'} }></p>
                        </div>
                        <div className="col-4 text-end bg-red">
                            <a href="" style={{ textDecoration: 'none' }} className='text-white'></a>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default InvoicePrint;
