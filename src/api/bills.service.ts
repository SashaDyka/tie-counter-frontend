import axios from 'axios';

const API_URL = 'http://localhost:3000/bills'; 

export const fetchAllBills = async () => {
  const response = await axios.get<any[]>(API_URL);
  return response.data;
};

export const saveBill = async (billData: any) => {
  const response = await axios.post<any>(API_URL, billData);
  return response.data;
};

//TODO: write the rest reqvests