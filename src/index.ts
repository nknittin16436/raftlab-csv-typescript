import { AUTHOR_CSV_URL, BOOK_CSV_URL, MAGAZINE_CSV_URL } from './constants/constant';
import { Author, Book, Magazine } from './dtos/dto';
import { findAllBooksAndMagazinesByEmail, findByIsbn, getData, sortAllBooksAndMagazinesByTitle } from './HelperFunction';


let Books: Book[] = [];
let Magazines: Magazine[] = [];
let Authors: Author[] = [];


const getAllData = async (): Promise<void> => {
    Books = await getData<Book>(BOOK_CSV_URL);
    Authors = await getData<Author>(AUTHOR_CSV_URL);
    Magazines = await getData<Magazine>(MAGAZINE_CSV_URL);
    // console.table(Authors);
    // console.table(Magazines);
    // console.log(Books);
}
getAllData();

const isbnToBeSearched: string = "2215-0012-5487";
findByIsbn(isbnToBeSearched);


const emailToBeSearched: string = "null-mueller@echocat.org";
// findAllBooksAndMagazinesByEmail(emailToBeSearched);

// sortAllBooksAndMagazinesByTitle();




