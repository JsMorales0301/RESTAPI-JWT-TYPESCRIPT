import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './database';

const main = () => {
    app.listen(app.get('port'));
    console.log(`Server ready in ${ app.get('port') }`);
}

main();

