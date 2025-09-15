import axios from 'axios';

const API_URL = 'http://localhost:3000/bills'; 

export const fetchAllBills = async () => {
  const response = await axios.get<any[]>(API_URL);
  return response.data;
};

export const createBill = async (billData: any) => {
  try {
    const response = await axios.post(API_URL, billData);
    return response.data;
  } catch (error) {
    console.error("Error creating bill:", error);
    throw error;
  }
};

export const updateBill = async (id: number, billData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, billData);
    return response.data;
  } catch (error) {
    console.error(`Error updating bill with ID ${id}:`, error);
    throw error;
  }
};

export const saveBill = async (billData: any) => {
  const response = await axios.post<any>(API_URL, billData);
  return response.data;
};

//TODO: write the rest reqvests