import { findByIsbn, findAllBooksAndMagazinesByEmail, sortAllBooksAndMagazinesByTitle } from '../src/HelperFunction';
import { Book, Magazine } from '../src/dtos/dto';

describe('findByIsbn', () => {
    test('should find a book with given ISBN', async () => {
        const result: Book | Magazine | undefined = await findByIsbn('4545-8558-3232');
        expect(result).toBeDefined();
        if (result) {
            expect(result.title.trim()).toBe('Schlank im Schlaf');
        }
    });

    test('should find a magazine with given ISBN', async () => {
        const result: Book | Magazine | undefined = await findByIsbn('1313-4545-8875');
        expect(result).toBeDefined();
        if (result) {
            expect(result.title.trim()).toBe('Vinum');
        }
    });

    test('should return undefined when no book or magazine found with given ISBN', async () => {
        const result: Book | Magazine | undefined = await findByIsbn('invalid-isbn');
        expect(result).toBeUndefined();
    });
});

describe('findAllBooksAndMagazinesByEmail', () => {
    test('should find books and magazines with given author email', async () => {
        const result: (Book | Magazine)[] = await findAllBooksAndMagazinesByEmail('null-walter@echocat.org');
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
    });

    test('should return empty array when no books or magazines found with given author email', async () => {
        const result: (Book | Magazine)[] = await findAllBooksAndMagazinesByEmail('nand@gmail.com');
        expect(result).toHaveLength(0);
    });
});

describe('sortAllBooksAndMagazinesByTitle', () => {
    test('should sort books and magazines by title', async () => {
        const result: (Book | Magazine)[] = await sortAllBooksAndMagazinesByTitle();
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].title).toBe('Beautiful cooking');
    });
});
