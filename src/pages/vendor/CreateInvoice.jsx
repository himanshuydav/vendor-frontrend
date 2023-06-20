import React from 'react'

const CreateInvoice = () => {
  return (
        <>
         <div className="card border-secondary mt-4">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-4">
                          <label htmlfor="vendor" className="form-label">
                            Legal Name
                          </label>
                          <input
                            type="text"
                            name="vendor"
                            id="vendor"
                            // value={name}
                            // onChange={(e) => handle(e)}
                            className="form-control"
                            required
                            disabled
                          />
                        </div>

                        <div className=" col-md-4 ">
                          <label htmlFor="contractname" className="form-label">
                            Contract Name
                          </label>
                          <input
                            id="contractname"
                            // value={contractname}
                            // onChange={(e) => handle(e)}
                            className="form-control"
                            name="contractname"
                            required
                            disabled
                          />
                        </div>
                      </div>
                      {/* <div className=" col-md-4  mt-4  my-3"> */}
                        <div className="row">
                          <div className="col-md-4  mt-4  my-3">
                            <label htmlfor="pendingbill">Pending Bill</label>

                            <input
                              type="interger"
                              name="pendingbill"
                              id="pendingbill"
                            //   onChange={(e) => handle(e)}
                              className="form-control"
                              required
                              disabled
                            />
                          </div>
                          

                          <div className="col-md-4 mt-4 my-3">
                            <label htmlfor="totalbilled">TotalBilled</label>

                            <input
                              type="integer"
                              name="totalbilled"
                              id="totalbilled"
                            //   onChange={(e) => handle(e)}
                              className="form-control"
                              required
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-lg-12  col-md-12 col-sm-12 mt-4 pt-2">
                          <div className="table-responsive">
                            <h5 className="mb-3">Line Information</h5>

                            <table className="table table-bordered table-striped">
                              <thead>
                                <tr>
                                  <th
                                    className="text-center"
                                    // onChange={(e) => handle(e)}
                                  >
                                    Item
                                  </th>
                                  <th
                                    className="text-center"
                                    // onChange={(e) => handle(e)}
                                  >
                                    Base Rate
                                  </th>
                                  <th
                                    className="text-center"
                                    // onChange={(e) => handle(e)}
                                  >
                                    Quantity
                                  </th>
                                  <th
                                    className="text-center"
                                    // onChange={(e) => handle(e)}
                                  >
                                    Total Amount
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {/* {lineItems.map((row, index) => (
                                  <tr key={index}>
                                    <td>{row.ItemName}</td>

                                    <td>{row.Rate}</td>

                                    <td>{row.Quantity}</td>

                                    <td>{row.Amount}</td>
                                  </tr>
                                ))} */}
                              </tbody>
                            </table>
                          </div>
                        </div>

             
                          <div className="row">
                            <div className="col-lg-6  col-md-4 col-sm-12 mt-5 ">
                              <div class="mb-3">
                                <label
                                  forhtml="formFileMultiple"
                                  className="form-label"
                                >
                                  Upload file
                                </label>

                                <input
                                  class="form-control"
                                  type="file"
                                  id="formFileMultiple"
                       
                                  disabled
                                />
                              </div>
                            </div>

                            <div className="  col-lg-6 col-md-4 col-sm-12 mt-3 my-3 ">
                              <div className="row">
                                <div className="col-lg-6 col-md-4 col-sm-12 mt-3 my-2 ">
                                  <label>
                                    <b>Total</b>
                                  </label>
                                </div>
                                </div>

                                <div className="col-lg-6 col-md-4 col-sm-12 mt-3">
                                  <input
                                    type="integer"
                                    name="TotalAmount"
                                    id="total"
                                    className="form-control"
                        
                                  />
                                </div>
                              </div>
             

                            <div className="row mb-3">
                              <div className="col-md-12">
                                <button
                                  type="button"
                                  className="btn btn-success float-end"
                          
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
      
                      
                    </form>
                  </div>
                </div>
        </>
  )
}

export default CreateInvoice