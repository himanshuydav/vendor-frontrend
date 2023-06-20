import axios from 'axios'

const API_URL = 'http://localhost:4000/api/users/'
export const BASE_URL = "http://localhost:3001"; //devlopment//
// export const BASE_URL = "https://collaterals.api.renewbuy.com/api"; //production//

axios.defaults.baseURL = BASE_URL;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post('/login', userData)
    if (response.data) {
        localStorage.setItem("Id", response.data.body[0].id);
        localStorage.setItem("email", response.data.body[0].EmailId);
        localStorage.setItem("isActive", response.data.body[0].IsActive);
        localStorage.setItem("SubsidiaryId", response.data.body[0].SubsidiaryId);
        localStorage.setItem("TermId", response.data.body[0].TermId);
        localStorage.setItem("VendorId", response.data.body[0].VendorId);
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('Id')
    localStorage.removeItem('email')
    localStorage.removeItem('isActive')
    localStorage.removeItem('SubsidiaryId')
    localStorage.removeItem('TermId')
    localStorage.removeItem('VendorId')
    localStorage.removeItem('user')
}


const authService = {
    register,
    logout,
    login,
}

export default authService