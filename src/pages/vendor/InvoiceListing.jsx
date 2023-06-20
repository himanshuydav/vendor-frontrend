import React from "react";

const InvoiceListing = () => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Invoice List</h3>

          <div className="form-group row">
            <div className="col-lg-3">
              <input
                type="text"
                className="form-control"
           
                placeholder="Search"
              />
            </div>

            <div className="col-lg-6"></div>

            <div className="col-lg-3" style={{ textAlign: "right" }}>
              <label>
                Show
                <select
                
                >
                  <option value={10}>10</option>

                  <option value={20}>20</option>

                  <option value={50}>50</option>

                  <option value={100}>100</option>
                </select>
                entries
              </label>
            </div>
          </div>

          <table
            className="table table-bordered table-striped mt-2"
            id="MyTable"
          >
            <thead>
              <tr>
                <th>Sno.</th>

                <th className="text-center">Vendor Name</th>

                <th className="text-center">Vendor Contract</th>

                <th className="text-center">Pending Bill</th>

                <th className="text-center">Total Bill</th>

                <th className="text-center">Status</th>

                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
            <tr>
                  <td colSpan="7">No inlistfound</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceListing;
