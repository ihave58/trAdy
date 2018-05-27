import express from 'express';
import packageJson from '../package';
import {json as jsonBodyParser, urlencoded as urlEncodedBodyParser} from 'body-parser';
import cookieParser from 'cookie-parser';

import webpackDevConfig from '../webpack/webpack.config.dev';

import expressSession from 'express-session';
import {KiteConnect} from 'kiteconnect';

const {port, apiKey} = packageJson.config;
const publicDirectory = webpackDevConfig.output.path;

const expressSessionMiddleware = expressSession({
    secret: process.getuid().toString(),
    resave: false,
    saveUninitialized: true
});

const kiteConnect = new KiteConnect({
    api_key: apiKey
});

const app = express();

app.use(jsonBodyParser());
app.use(urlEncodedBodyParser({extended: true}));
app.use(cookieParser());
app.use(expressSessionMiddleware);

app.get('/', (request, response) => {
    if(request.query.requestToken && !request.session.requestToken) {
        request.session.isAuthenticated = true;
        request.session.requestToken = request.query.requestToken;
    }

    response.redirect('/dashboard');
});

app.get('/login', (request, response) => {
    response.redirect(kiteConnect.getLoginURL());
});

app.get('/dashboard', (request, response) => {
    response.sendFile('index.html', {
        root: publicDirectory
    });
});

app.use(express.static(publicDirectory));
app.listen(port);
