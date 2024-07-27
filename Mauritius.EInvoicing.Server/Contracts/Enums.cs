namespace Mauritius.EInvoicing.Server.Contracts
{
    public enum TaxCode
    {
        TC01, //Taxable SS at rate of 15%
        TC02, // Taxable SS at zero rate
        TC03 //Exempt SS
    }

    public enum ItemTaxNature
    {
        GOODS,
        SERVICES
    }

    public enum InvoiceType
    {
        CREDIT_NOTE,
        DEBIT_NOTE,
        INVOICE
    }
}
