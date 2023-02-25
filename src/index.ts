import { AUTHOR_CSV_URL, BOOK_CSV_URL, MAGAZINE_CSV_URL } from './constants/constant';
import { Author, Book, Magazine } from './dtos/dto';
import { findAllBooksAndMagazinesByEmail, findByIsbn, getData, sortAllBooksAndMagazinesByTitle, writeDataToCsvFile } from './HelperFunction';


let Books: Book[] = [];
let Magazines: Magazine[] = [];
let Authors: Author[] = [];


const getAllData = async (): Promise<void> => {
    Books = await getData<Book>(BOOK_CSV_URL);
    Authors = await getData<Author>(AUTHOR_CSV_URL);
    Magazines = await getData<Magazine>(MAGAZINE_CSV_URL);
    console.table(Authors);
    console.table(Magazines);
    console.log(Books);
}
getAllData();

const isbnToBeSearched: string = "2215-0012-5487";
// findByIsbn(isbnToBeSearched);


const emailToBeSearched: string = "null-mueller@echocat.org";
// findAllBooksAndMagazinesByEmail(emailToBeSearched);



//uncomment below line to sort books and magazines by title
// sortAllBooksAndMagazinesByTitle();

const book: Book = {
    title: 'To Kill a Mockingbird',
    authors: 'Harper Lee',
    description: "This ia book to kill a mocking bird",
    isbn: '978-0446310789'
};


const magazine: Magazine = {
    title: 'National Geographic',
    publishedAt: 'March 2021',
    authors: 'Susan Goldberg',
    isbn: '0027-9358'
};

// writeDataToCsvFile(book);
// writeDataToCsvFile(magazine);




