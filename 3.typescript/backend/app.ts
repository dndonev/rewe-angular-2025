import express, { Application, Request, Response } from 'express';

const app: Application = express();


app.get('api/users', (req: Request, res: Response) => {
    res.json({});
});

app.listen();