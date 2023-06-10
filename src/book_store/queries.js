const getBook = "SELECT * FROM book";
const getBookById = "SELECT * FROM book WHERE id = $1";
const checkTitleExists = 'SELECT * FROM book s WHERE s.title = $1'
const addBook = 'INSERT INTO book (id, title, auth_id, publication_year, pages, price, pub_id, last_update) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
const deleteBook = 'DELETE FROM book WHERE id = $1';
const updateBook = 'UPDATE book SET title = $1, publication_year = $2, pages = $3, price = $4 WHERE id = $5';

// const getStore = "SELECT * FROM store";
// const getStaff = "SELECT * FROM staff";
// const getOrder = "SELECT * FROM book_order";

module.exports = {
    getBook,
    getBookById,
    checkTitleExists,
    addBook,
    deleteBook,
    updateBook,
    // getStore,
    // getStaff,
    // getOrder
};