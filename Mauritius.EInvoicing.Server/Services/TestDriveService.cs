using Agoda.IoC.Core;
using Mauritius.EInvoicing.Server.Contracts;
using Mauritius.EInvoicing.Server.Contracts.MraContracts;
using Mauritius.EInvoicing.Server.Data.Entities;
using Newtonsoft.Json;
using Serilog;

namespace Mauritius.EInvoicing.Server.Services
{
    public interface ITestDriveService
    {
        Task PerformTestDrive(Guid deviceId);
    }
    [RegisterPerRequest]

    public class TestDriveService(IInvoiceService invoiceService, IDeviceService deviceService) : ITestDriveService
    {

        public async Task PerformTestDrive(Guid deviceId)
        {
            Log.Information($"Test drive initiated for device {deviceId}");

            var device = await deviceService.RenewToken(deviceId);

            var invoiceRequestForScenario1 = GetInvoiceRequestForScenario1(device);

            var scenario1Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario1);

            if (scenario1Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 1 failed");
            }

            Log.Information($"Scenario 1 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario1Response.Content)}");

            var invoiceRequestForScenario1_1 = GetInvoiceRequestForScenario1_1(device);

            var scenario1_1Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario1_1);

            if (scenario1_1Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 1_1 failed");
            }

            Log.Information($"Scenario 1_1 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario1_1Response.Content)}");

            var invoiceRequestForScenario1_2 = GetInvoiceRequestForScenario1_2(device);

            var scenario1_2Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario1_2);

            if (scenario1_2Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 1_2 failed");
            }

            Log.Information($"Scenario 1_2 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario1_2Response.Content)}");


            var invoiceRequestForScenario2 = GetInvoiceRequestForScenario2(device);

            var scenario2Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario2);

            if (scenario2Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 2 failed");
            }

            Log.Information($"Scenario 2 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario2Response.Content)}");

            var invoiceRequestForScenario3 = GetInvoiceRequestForScenario3(device);

            var scenario3Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario3);

            if (scenario3Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 3 failed");
            }

            Log.Information($"Scenario 3 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario3Response.Content)}");

            var invoiceRequestForScenario4 = GetInvoiceRequestForScenario4(device);

            var scenario4Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario4);

            if (scenario4Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 4 failed");
            }

            Log.Information($"Scenario 4 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario4Response.Content)}");

            var invoiceRequestForScenario5 = GetInvoiceRequestForScenario5(device);

            var scenario5Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario5);

            if (scenario5Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 5 failed");
            }

            Log.Information($"Scenario 5 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario5Response.Content)}");

            var invoiceRequestForScenario6 = GetInvoiceRequestForScenario6(device);

            var scenario6Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario6);

            if (scenario6Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 6 failed");
            }

            Log.Information($"Scenario 6 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario6Response.Content)}");

            var invoiceRequestForScenario7 = GetInvoiceRequestForScenario7(device);

            var scenario7Response = await invoiceService.TransmitInvoice(device, invoiceRequestForScenario7);

            if (scenario7Response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception("Scenario 7 failed");
            }

            Log.Information($"Scenario 7 completed for device {deviceId} , content : {JsonConvert.SerializeObject(scenario7Response.Content)}");


        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario1(Device device)
        {
            var invoice = GetStdInvoice();

            var invoiceRequest = invoiceService.GetMraInvoiceRequest([invoice], device);

            return invoiceRequest;

        }

        private MRAInvoice GetStdInvoice()
        {
            var lineItems = new List<ItemList>();
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 1",
                quantity = "1",
                taxCode = TaxCode.TC01.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "15.00",
                totalPrice = "115.00",
                itemNo = "1"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 2",
                quantity = "1",
                taxCode = TaxCode.TC01.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "15.00",
                totalPrice = "115.00",
                itemNo = "2"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 3",
                quantity = "1",
                taxCode = TaxCode.TC01.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "15.00",
                totalPrice = "115.00",
                itemNo = "3"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 4",
                quantity = "1",
                taxCode = TaxCode.TC02.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "0.00",
                totalPrice = "100.00",
                itemNo = "4"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 5",
                quantity = "1",
                taxCode = TaxCode.TC02.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "0.00",
                totalPrice = "100.00",
                itemNo = "5"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 6",
                quantity = "1",
                taxCode = TaxCode.TC02.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "0.00",
                totalPrice = "100.00",
                itemNo = "6"
            });

            var seller = new SellerTax()
            {
                brn = "",
                businessAddr = "Mauritius",
                tan = "27323903",
                name = "test"
            };

            var buyer = new BuyerTax()
            {
                brn = "",
                businessAddr = "Mauritius",
                tan = "27323903",
                name = "test",
                buyerType = "VATR"
            };

            var invoice = new MRAInvoice()
            {
                invoiceCounter = "1",
                transactionType = "B2B",
                personType = "VATR",
                invoiceTypeDesc = "STD",
                currency = "MUR",
                invoiceIdentifier = "S001",
                previousNoteHash = "0",
                totalVatAmount = "45",
                totalAmtWoVatCur = "600",
                totalAmtWoVatMur = "600",
                totalAmtPaid = "0",
                invoiceTotal = "645",
                dateTimeInvoiceIssued = DateTime.Now.ToString("yyyyMMdd HH:mm:ss"),
                seller = seller,
                buyer = buyer,
                itemList = lineItems,
                salesTransactions = "CASH"
            };
            return invoice;
        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario2(Device device)
        {
            var invoice = GetDebitNote();

            var invoiceRequest = invoiceService.GetMraInvoiceRequest([invoice], device);

            return invoiceRequest;

        }

        private static MRAInvoice GetDebitNote()
        {
            var lineItems = new List<ItemList>();
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 1",
                quantity = "1",
                taxCode = TaxCode.TC01.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "15.00",
                totalPrice = "115.00",
                itemNo = "1"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 2",
                quantity = "1",
                taxCode = TaxCode.TC01.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "15.00",
                totalPrice = "115.00",
                itemNo = "2"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 3",
                quantity = "1",
                taxCode = TaxCode.TC01.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "15.00",
                totalPrice = "115.00",
                itemNo = "3"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 4",
                quantity = "1",
                taxCode = TaxCode.TC02.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "0.00",
                totalPrice = "100.00",
                itemNo = "4"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 5",
                quantity = "1",
                taxCode = TaxCode.TC02.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "0.00",
                totalPrice = "100.00",
                itemNo = "5"
            });
            lineItems.Add(new ItemList
            {
                itemDesc = "Item 6",
                quantity = "1",
                taxCode = TaxCode.TC02.ToString(),
                nature = ItemTaxNature.GOODS.ToString(),
                unitPrice = "100.00",
                amtWoVatCur = "100.00",
                amtWoVatMur = "100.00",
                vatAmt = "0.00",
                totalPrice = "100.00",
                itemNo = "6"
            });

            var seller = new SellerTax()
            {
                brn = "",
                businessAddr = "Mauritius",
                tan = "27323903",
                name = "test"
            };

            var buyer = new BuyerTax()
            {
                brn = "",
                businessAddr = "Mauritius",
                tan = "27323903",
                name = "test",
                buyerType = "VATR"
            };

            var invoice = new MRAInvoice()
            {
                invoiceCounter = "1",
                transactionType = "B2B",
                personType = "VATR",
                invoiceTypeDesc = "DRN",
                currency = "MUR",
                invoiceIdentifier = "C001",
                previousNoteHash = "0",
                totalVatAmount = "45",
                totalAmtWoVatCur = "600",
                totalAmtWoVatMur = "600",
                totalAmtPaid = "0",
                invoiceTotal = "645",
                dateTimeInvoiceIssued = DateTime.Now.ToString("yyyyMMdd HH:mm:ss"),
                seller = seller,
                buyer = buyer,
                itemList = lineItems,
                salesTransactions = "CASH",
                invoiceRefIdentifier = "S001",
                reasonStated = "test reason"
            };
            return invoice;
        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario3(Device device)
        {
            var invoice = GetDebitNote();
            invoice.invoiceTypeDesc = "CRN";
            invoice.invoiceIdentifier = "C002";
            invoice.invoiceRefIdentifier = "S001";

            var invoiceRequest = invoiceService.GetMraInvoiceRequest([invoice], device);

            return invoiceRequest;
        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario4(Device device)
        {
            List<MRAInvoice> invoices = new List<MRAInvoice>();

            for (int i = 1; i < 11; i++)
            {
                var invoice = GetStdInvoice();
                invoice.invoiceCounter = i.ToString();
                invoice.invoiceIdentifier = $"Sc00{i}";
                invoices.Add(invoice);
            }



            var invoiceRequest = invoiceService.GetMraInvoiceRequest(invoices, device);

            return invoiceRequest;

        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario5(Device device)
        {
            var invoice = GetStdInvoice();
            invoice.invoiceCounter = "5";
            invoice.invoiceIdentifier = $"Sf001";
            invoice.seller.tan = "87654321";

            var invoiceRequest = invoiceService.GetMraInvoiceRequest([invoice], device);

            return invoiceRequest;
        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario6(Device device)
        {
            var invoice = GetStdInvoice();
            invoice.invoiceCounter = "6";
            invoice.invoiceIdentifier = $"Sp001";
            invoice.invoiceTypeDesc = "PRF";

            var invoiceRequest = invoiceService.GetMraInvoiceRequest([invoice], device);

            return invoiceRequest;
        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario7(Device device)
        {
            var invoice = GetStdInvoice();
            invoice.invoiceCounter = "7";
            invoice.invoiceIdentifier = $"St001";
            invoice.invoiceTypeDesc = "TRN";

            var invoiceRequest = invoiceService.GetMraInvoiceRequest([invoice], device);

            return invoiceRequest;
        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario1_1(Device device)
        {
            var invoice = GetStdInvoice();
            invoice.invoiceIdentifier = $"S002";


            var invoiceRequest = invoiceService.GetMraInvoiceRequest([invoice], device);

            return invoiceRequest;
        }

        private MRAInvoiceRequest GetInvoiceRequestForScenario1_2(Device device)
        {
            var invoice = GetStdInvoice();
            invoice.invoiceIdentifier = $"S003";


            var invoiceRequest = invoiceService.GetMraInvoiceRequest([invoice], device);

            return invoiceRequest;
        }
    }
}
