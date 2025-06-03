const express = require('express');
const app = express();
const cors = require('cors');
const frontend_url = process.env.FRONTEND_URL;

const allowedOrigins = [
    'http://localhost:3000', 
    'http://localhost:8080',
    `${frontend_url}`   
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

var dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.local' });
}

const bcrypt = require('bcryptjs');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//models------------------------------------------------------------------------------------------------------
const sequelize = require('./config/database');
const faculty = require('./models/faculty');
const user = require('./models/user');
const specialization = require('./models/specialization');
const topic = require('./models/topic');
const specializationTopic = require('./models/specializationTopic');
const topicRequest = require('./models/topicRequest');

//at first run u can set force true to make sure tables are created, might need to create the database first(make sure is the same name as in .env file)
// after that set it to false to avoid dropping existing tables,
sequelize.sync({ force: false, logging: console.log }) // Set force: true to drop tables and recreate them
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error creating database:', error);
    });

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const teacherRoutes = require('./routes/teacher');
app.use('/teacher', teacherRoutes);

const studentRoutes = require('./routes/student');
app.use('/student', studentRoutes);

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

const generalRoutes = require('./routes/general');
app.use('/', generalRoutes);

app.listen(8082, () => {
    console.log('Server is running on port 8082');
});
