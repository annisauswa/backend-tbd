
//Book
const getBook = "SELECT * FROM book ORDER BY id ASC";
const getBookById = "SELECT * FROM book WHERE id = $1";
const checkTitleExists = 'SELECT * FROM book s WHERE s.title = $1'
const addBook = 'INSERT INTO book (id, title, auth_id, publication_year, pages, price, pub_id, last_update) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
const deleteBook = 'DELETE FROM book WHERE id = $1';
const updateBook = 'UPDATE book SET title = $1, publication_year = $2, pages = $3, price = $4, last_update=$5 WHERE id = $6';
const deleteBookPublisherByBookId = 'DELETE FROM book_publisher WHERE book_id = $1';
const deleteBookAuthorByBookId = 'DELETE FROM book_author WHERE book_id = $1';
const deleteInventoryByBookId = 'DELETE FROM inventory WHERE book_id = $1';
const deleteBookOrderByBookId = 'DELETE FROM book_order WHERE inventory_id = $1';
const deletePaymentById = 'DELETE FROM payment WHERE order_id = $1';

//Store
// const getStore = "SELECT * FROM store";

//Staff
// const getStaff = "SELECT * FROM staff";

//Order
// const getOrder = "SELECT * FROM book_order";

module.exports = {
    getBook,
    getBookById,
    checkTitleExists,
    addBook,
    deleteBook,
    updateBook,
    deleteBookPublisherByBookId,
    deleteBookAuthorByBookId,
    deleteInventoryByBookId,
    deleteBookOrderByBookId,
    deletePaymentById,
    // getStore,
    // getStaff,
    // getOrder
};