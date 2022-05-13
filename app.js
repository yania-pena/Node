const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const auth = require('./src/middlewares/auth');

// View Engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static('public'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Node JSON CRUD',
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(auth);

// Routes
app.use('/', require('./src/routes/static'));
app.use('/productos', require('./src/routes/products'));
app.use('/usuarios', require('./src//routes/users'));

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));