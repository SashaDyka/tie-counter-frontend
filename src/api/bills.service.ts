import axios from "axios";
import type { CreateBillDto, UpdateBillDto, BillResponseDto, } from "../types/dto";

const API_URL = "http://localhost:3000/bills";

export const fetchAllBills = async (): Promise<BillResponseDto[]> => {
  try {
    const response = await axios.get<BillResponseDto[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw error;
  }
};

export const fetchBillById = async (id: number): Promise<BillResponseDto> => {
  try {
    const response = await axios.get<BillResponseDto>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bill with ID ${id}:`, error);
    throw error;
  }
};

export const createBill = async (billData: CreateBillDto): Promise<BillResponseDto> => {
  try {
    const response = await axios.post<BillResponseDto>(API_URL, billData);
    return response.data;
  } catch (error) {
    console.error("Error creating bill:", error);
    throw error;
  }
};

export const updateBill = async (id: number,  billData: UpdateBillDto): Promise<BillResponseDto> => {
  try {
    const response = await axios.patch<BillResponseDto>(`${API_URL}/${id}`, billData);
    return response.data;
  } catch (error) {
    console.error(`Error updating bill with ID ${id}:`, error);
    throw error;
  }
};

export const deleteBill = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting bill with ID ${id}:`, error);
    throw error;
  }
};
