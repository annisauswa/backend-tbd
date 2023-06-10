const express = require('express')
const bodyParser = require('body-parser');
const bookRoutes = require('./src/book_store/routes');
const storeRoutes = require('./src/book_store/store_routes');
const staffRoutes = require('./src/book_store/staff_routes');
const orderRoutes = require('./src/book_store/order_routes');
const sqlRoutes = require('./src/book_store/sql_routes');
const pool = require('./db');

const app = express();
const cors = require('cors');
const port = 3001;

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Good Reading Bookstore')
})

app.use('/api/book', bookRoutes);

app.use('/api/store', storeRoutes);

app.use('/api/staff', staffRoutes);

app.use('/api/order', orderRoutes);

app.use(bodyParser.json());

app.use('/api/sql', sqlRoutes);

app.listen(port, () => console.log(`app listening on port ${port}!`))