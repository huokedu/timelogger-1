/**
 * Core Config dependencies;
 */
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const secrets = require('./devconfig/secrets');

/**
 * Routes
 * @index: Public files & static assets,
 * @api: API Endpoints.
 */
// const index = require('./routes/index');


/**
 * CROSS ORIGIN RESOURCE SHARING CONFIGURATION;
 */
const incomingOriginWhitelist = [
    // For the machines that use `Origin`
    'http://localhost:4000',
    // For the machines that use `host`
    'localhost:4000',
];

const corsConfig = (req, next) => {
    let corsOptions;
    let incomingOrigin = req.header('host') || req.header('Origin');
    if (incomingOriginWhitelist.indexOf(incomingOrigin) !== -1) {
        corsOptions = {
            origin: true
        };
        return next(null, corsOptions);
    } else {
        corsOptions = {
            origin: false
        };
        return next(new Error('You like going under the hood! I like you, send an email to dev@techverse.com'));
    }
};

module.exports = (app, express) => {
    const api = require('./routes/api')(express);

    /**
     * Initialised the CORS Configuration;
     * Uncomment the line below and comment the line below the line below
     * to initialize the CORS CONFIGURATION;
     */
    app.use(cors(corsConfig), (req, res, next) => {
        // req.io = io;
        next();
    });

    /**
     *  View engine setup
     */
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');


    /**
     *  Only uncomment the line below after placing your favicon in `/public` folder.
     *  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
     */

    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));


    /**
     * Initializes the frontend and backend api routes;
     */
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/api', api);
    app.use(logger('short'));
 4



    /**
     *  catch 404 and forward to error handler
     */
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /**
     * error handler
     */
    app.use(function (err, req, res) {
        /**
         * set locals, only providing error in development
         */
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        /**
         * render the error page
         */
        res.status(err.status || 500);
        console.log(err);
        res.render('error');
    });

};
