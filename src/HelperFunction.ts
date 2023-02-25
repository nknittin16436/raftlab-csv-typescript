import axios from 'axios';
import Papa from "papaparse";

const csvTextFromUrl = async (url: string): Promise<string> => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error: any) {
        console.log(error);
        return error.message;
    }
}


export const getData = async (url: string): Promise<[]> => {
    const csvText = await csvTextFromUrl(url);
    const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true, });
    return data as [];
}

