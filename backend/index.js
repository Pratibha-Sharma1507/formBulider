const express = require('express');
const mongoose = require('mongoose');
const formRoutes = require('./route/formRoute');
const formRoutes1 = require('./route/formRoutes1');
const cors = require('cors')
const app = express();
app.use(express.json());

app.use(cors(
    {
     origin: ['http://localhost:3000'],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}
));


// Use form routes
app.use('/api', formRoutes);
app.use('/api', formRoutes1);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formBuilder1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
