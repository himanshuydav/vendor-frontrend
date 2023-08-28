import React, { useEffect, useState } from 'react'
import { vendorList } from '../../utils/services';
import FinanceBill from '../../component/common/FinanceBill';
import { Helmet } from 'react-helmet';
import Spinner from '../../component/common/Spinner';


const FinanceInvoiceList = () => {
  const [loading, setLoading] = useState(false);
  const [financeInvoiceList, setFinanceInvoiceList] = useState([])

  const handlePendingList = async () => {
    try {
      setLoading(true)
      const result = await vendorList();
      setLoading(false)
      const response = result.res.InvoiceList[0].lines.reverse()
      setFinanceInvoiceList(response)
      console.log(result, "Check")

    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    handlePendingList()
  }, [])

  return (
    <div>
      <Helmet>
        <title>Vendor Portal || Bill</title>
      </Helmet>


      <div className="card mt-4">
        <div className="card-body">
          <h3 className="card-title">Bills</h3>
          {
            loading ? <Spinner />
              :
              <div className="form-group row">
                <FinanceBill financeInvoiceList={financeInvoiceList} handlePendingList={handlePendingList} />
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default FinanceInvoiceList