import axios from 'axios';
import Papa from 'papaparse';
import { BOOK_CSV_URL, MAGAZINE_CSV_URL } from './constants/constant';
import { Book, Magazine } from './dtos/dto';

const csvTextFromUrl = async (url: string): Promise<string> => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error: any) {
        console.log(error);
        return error.message;
    }
};

export const getData = async <T>(url: string): Promise<T[]> => {
    const csvText: string = await csvTextFromUrl(url);
    const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    return data as T[];
};

export const findByIsbn = async (isbn: string): Promise<Book | Magazine | undefined> => {
    const books = await getData<Book>(BOOK_CSV_URL);
    const magazines = await getData<Magazine>(MAGAZINE_CSV_URL);
    const resultByISBN: Book | Magazine | undefined = [...books, ...magazines].find((item) => item.isbn === isbn);
    if (resultByISBN) {
        console.log(`Found One Result with isbn ${isbn}`);
        console.log(resultByISBN);
        return resultByISBN;
    } else {
        console.error(`No book or magazine found with given ISBN ${isbn}`);
        return undefined;
    }
};

export const findAllBooksAndMagazinesByEmail = async (email: string): Promise<(Book | Magazine)[]> => {
    const books = await getData<Book>(BOOK_CSV_URL);
    const magazines = await getData<Magazine>(MAGAZINE_CSV_URL);
    if (email && email !== '') {
        const filteredResults: (Book | Magazine)[] = [...books, ...magazines].filter((item) => item.authors.includes(email.trim()));
        if (filteredResults.length) {
            console.log(`Found these Books and magazines with Author ${email}`);
            console.log(filteredResults);
            return filteredResults;
        } else {
            console.log(`No books or magazines found with Author ${email}`);
            return [];
        }
    }
    return [];
};

export const sortAllBooksAndMagazinesByTitle = async (): Promise<(Book | Magazine)[]> => {
    const books: Book[] = await getData<Book>(BOOK_CSV_URL);
    const magazines: Magazine[] = await getData<Magazine>(MAGAZINE_CSV_URL);
    const filteredResults: (Book | Magazine)[] = [...books, ...magazines].sort((a, b) => (a.title < b.title ? -1 : 1));
    console.log(`Sorted Books and magazines by Title`);
    console.log(filteredResults);
    return filteredResults;
};
