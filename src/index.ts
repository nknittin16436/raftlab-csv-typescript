import { Author, Book, Magazine } from './dtos/dto';
import { getData } from './HelperFunction';
export const MAGAZINE_CSV_URL = 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv';
export const BOOK_CSV_URL = 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv';
export const AUTHOR_CSV_URL = 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv';

let Books: Book[] = [];
let Magazines: Magazine[] = [];
let Authors: Author[] = [];


const getAllData = async () => {
    Books = await getData(BOOK_CSV_URL);
    Authors = await getData(AUTHOR_CSV_URL);
    Magazines = await getData(MAGAZINE_CSV_URL);
    console.table(Authors);
    console.table(Magazines);
    console.log(Books);
}
getAllData();




