const pool = require('../../db');
const queries = require('./queries');

const getBook = async(req, res) => {
    try{
        await pool.query("BEGIN");
        pool.query(queries.getBook, (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
        await pool.query("COMMIT");
    }catch(err){
        await pool.query("ROLLBACK");
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// const getBook = (req, res) => {
//     pool.query(queries.getBook, (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// };

const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBookById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addBook = (req, res) => {
    const { id, title, auth_id, publication_year, pages, price, pub_id, last_update } = req.body;
    pool.query(queries.checkTitleExists, [title], (error, results) => {
        if (results.rows.length) {
            res.send("Book already exists.");
        }
        pool.query(queries.addBook, [id, title, auth_id, publication_year, pages, price, pub_id, last_update], (error, results) => {
            if(error) throw error;
            res.status(201).send(`Book added with title: ${title}`);
        });
    });
};

const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, publication_year, pages, price} = req.body;
    const last_update = new Date();
    pool.query(queries.getBookById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound){
            res.send("Book doesn't exist in the database.")
        }

        pool.query(queries.updateBook, [title, publication_year, pages, price, last_update, id], 
        (error, results) => {
            if (error) throw error;
            res.status(200).send(`Book updated with ID: ${id}`);
        });
    });
};


const deleteBook = async (req, res) => {
    const id = parseInt(req.params.id);
  
    try {
      await pool.query('BEGIN');
  
      // Check if the book exists
      const bookResult = await pool.query(queries.getBookById, [id]);
      const bookExists = bookResult.rows.length > 0;
  
      if (!bookExists) {
        await pool.query('ROLLBACK');
        return res.status(404).send("Book doesn't exist in the database.");
      }

      await pool.query(queries.deleteBookPublisherByBookId, [id]);
      await pool.query(queries.deleteBookAuthorByBookId, [id]);
      await pool.query(queries.deletePaymentById, [id]);
      await pool.query(queries.deleteBookOrderByBookId, [id]);
      await pool.query(queries.deleteInventoryByBookId, [id]);
  
      await pool.query(queries.deleteBook, [id]);
  
      await pool.query('COMMIT');
      res.status(200).send(`Book deleted with id: ${id}`);
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error(error);
      res.status(500).send('An error occurred during book deletion.');
    }
  };
  
  

const getStore = (req, res) => {
    pool.query(queries.getStore, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getStaff = (req, res) => {
    pool.query(queries.getStaff, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getOrder = (req, res) => {
    pool.query(queries.getOrder, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const sqlBuilder = async(req, res) => {
    try{
        await pool.query("BEGIN");
        const { queries } = req.body;
        pool.query(queries, (error, results) => {   
            if (error) throw error;
            res.status(200).json(results.rows);
        });
        await pool.query("COMMIT");
    } catch (error) {
        await pool.query("ROLLBACK");
        console.error('Error executing queries:', error);
        res.status(500).json({ error: 'An error occurred while executing the queries.' });
    }
};

module.exports = {
    getBook,
    getBookById,
    addBook,
    deleteBook,
    updateBook,
    getStore,
    getStaff,
    getOrder,
    sqlBuilder
};