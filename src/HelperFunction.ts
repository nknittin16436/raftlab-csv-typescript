import axios from 'axios';
import Papa from 'papaparse';
import { BOOK_CSV_URL, MAGAZINE_CSV_URL } from './constants/constant';
import { Book, Magazine } from './dtos/dto';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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




export const writeDataToCsvFile = (publication: Book | Magazine) => {
    const header = [
        { id: 'title', title: 'Title' },
        { id: 'authors', title: 'Authors' },
        { id: 'isbn', title: 'isbn' }
    ];
    let file_name: string = '';
    const data = [];

    if ('description' in publication) {
        file_name = "book.csv"
        header.push({ id: 'description', title: 'Description' });
        data.push({
            title: publication.title,
            authors: publication.authors,
            isbn: publication.isbn,
            description: publication.description
        });
    } else if ('publishedAt' in publication) {
        file_name = "magazine.csv"
        header.push({ id: 'publishedAt', title: 'Published At' });
        data.push({
            title: publication.title,
            authors: publication.authors,
            isbn: publication.isbn,
            publishedAt: publication.publishedAt
        });
    }

    const csvWriter = createCsvWriter({
        path: file_name,
        header,
        fieldDelimiter: ';'
    });

    csvWriter.writeRecords(data)
        .then(() => console.log(`CSV file ${file_name} has been written successfully.`))
        .catch((error: any) => console.error(`Error occurred while writing CSV file: ${error}`));
}