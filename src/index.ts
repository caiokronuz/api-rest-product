import dotenv from 'dotenv';
dotenv.config();

import express, {Request, Response} from 'express';
import { useRoutes } from './routes';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
useRoutes(app)

app.get('/', (req: Request, res: Response) => {
    res.json({
        msg: 'Hello World!'
    })
})

app.listen(3333)