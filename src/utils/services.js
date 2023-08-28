import axios from "axios";
import {
  APPROVAL_FLOW,
  APPROVAL_LIST,
  APPROVAL_PROCESS,
  CREATCONTRACTFORM,
  CREATEINVOICEFORM,
  EDITBILL,
  EDITBILLFORM,
  EDITCONTRACTFORM,
  FINANCE_CREATION,
  GETINOVICE,
  ITEMS,
  LIST,
  LOGIN,
  NEXTAPPROVAL_LIST,
  PAYMENT,
  PAYMENT_LIST,
  REJECTED_LIST,
  REJECT_PROCESS,
  REPORTS,
  ROLESLIST,
  ROW,
  VENDORLISTING,
  VIEWINOVICE,
  VIEWPAYMENT,
} from "./routes";

export const BASE_URL = "http://localhost:3001"; //devlopment//
// export const BASE_URL = 'http://vendorportalstreams.us-east-1.elasticbeanstalk.com' //production//

axios.defaults.baseURL = BASE_URL;

export const loginService = async (data) => {
  try {
    const response = await axios.post(LOGIN, data, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const vendorList = async (number) => {
  try {
    const response = await axios.get(LIST, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const vendorView = async (id) => {
  try {
    const response = await axios.get(`${ROW}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const invoiceView = async (id) => {
  try {
    const response = await axios.get(`${VIEWINOVICE}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const getInvoice = async (id) => {
  try {
    const response = await axios.get(`${GETINOVICE}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const itemDropDown = async (id) => {
  try {
    const response = await axios.get(ITEMS, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const vendorDropDown = async () => {
  try {
    const response = await axios.get(VENDORLISTING, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const ContractForm = async (data) => {
  try {
    const response = await axios.post(CREATCONTRACTFORM, data, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const EditContractForm = async (data) => {
  try {
    const response = await axios.post(`${EDITCONTRACTFORM}`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const EditBillForm = async (data) => {
  try {
    const response = await axios.post(`${EDITBILLFORM}`, data, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const InvoiceForm = async (data) => {
  try {
    const response = await axios.post(CREATEINVOICEFORM, data, {
      headers: { "content-type": "multipart/form-data" },
    });

    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const getRoles = async () => {
  try {
    const response = await axios.get(ROLESLIST, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const getNextRole = async (value) => {
  try {
    const response = await axios.get(`${NEXTAPPROVAL_LIST}/${value}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const ApprovalFlowApi = async (data) => {
  try {
    const response = await axios.post(APPROVAL_FLOW, data, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const Approvalprocess = async (data) => {
  try {
    const response = await axios.post(APPROVAL_PROCESS, data, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const Rejectprocess = async (data) => {
  try {
    const response = await axios.post(REJECT_PROCESS, data, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const financeCreation = async (data) => {
  try {
    const response = await axios.post(FINANCE_CREATION, data, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const RejectedBYlist = async (data) => {
  try {
    const response = await axios.post(REJECTED_LIST, data, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const payMentList = async () => {
  try {
    const response = await axios.get(PAYMENT_LIST, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const Payment = async (data) => {
  try {
    const response = await axios.post(PAYMENT, data, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const PaymentGetById = async (id) => {
  try {
    const response = await axios.get(`${PAYMENT_LIST}/${id}`, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const PaymentViewById = async (id) => {
  try {
    const response = await axios.get(`${VIEWPAYMENT}/${id}`, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};


export const approvalList = async (data) => {
  try {
    const response = await axios.post(APPROVAL_LIST, data, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};

export const reportGenration = async (data) => {
  try {
    const response = await axios.post(REPORTS, data, {
      headers: { "Content-Type": "application/json" },

    });
    if (response.status === 200) {
      return { res: response.data };
    } else return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
    else throw err.message;
  }
};