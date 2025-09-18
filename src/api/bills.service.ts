import axios from 'axios';

const API_URL = 'http://localhost:3000/bills'; 

export const fetchAllBills = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching bills:', error);
    throw error;
  }
};

export const fetchBillById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bill with ID ${id}:`, error);
    throw error;
  }
};

//USE WITH DTO
export const createBill = async (billData: any) => {
  try {
    const response = await axios.post(API_URL, billData);
    return response.data;
  } catch (error) {
    console.error('Error creating bill:', error);
    throw error;
  }
};

export const updateBill = async (id: number, billData: any) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, billData);
    return response.data;
  } catch (error) {
    console.error(`Error updating bill with ID ${id}:`, error);
    throw error;
  }
};

export const deleteBill = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting bill with ID ${id}:`, error);
    throw error;
  }
};

