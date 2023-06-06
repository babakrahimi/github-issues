import axios from "axios";

const SERVICE_BASE_ADDRESS = "http://localhost:3002";

export async function getData<T>(url: string): Promise<T | null> {
  try {
    const response = await axios.get<T>(`${SERVICE_BASE_ADDRESS}${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${(error as Error).message}`);
    return null;
  }
}
