export interface Book {
    title: string;
    isbn: string;
    authors: string;
    description: string;
}
export interface Magazine {
    title: string;
    isbn: string;
    authors: string;
    publishedAt: string;

}

export interface Author {
    email: string;
    firstname: string;
    lastname: string;
}

export interface ResultsArray {
    Books?: Book[];
    Magazines?: Magazine[];
    Authors?: Author[];
}