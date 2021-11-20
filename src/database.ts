import mongoose from 'mongoose';

const URI: string = 'mongodb://localhost/test';


mongoose.connect(URI)
    .then( db => console.log('Database is connected') )
    .catch( err => console.log(err) );
