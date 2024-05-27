"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const survey_1 = __importDefault(require("./models/survey"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
/**
 * Connects to MongoDB and starts the server.
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
        app.listen(3001, () => {
            console.log('Server running on port 3001');
        });
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
});
/**
 * @api {post} /basketball-forms Create a new form entry
 * @apiName CreateForm
 * @apiGroup Form
 *
 * @apiBody {String} name Name of the user
 * @apiBody {String} email Email of the user
 * @apiBody {String} favoriteTeams Array of favorite teams
 * @apiBody {String} favoritePlayer Favorite player
 * @apiBody {String} comments User comments
 * @apiBody {Object} favoriteTeamDetails Details of the favorite team
 *
 * @apiSuccess {ObjectId} id ID of the newly created form
 */
app.post('/basketball-forms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = new survey_1.default(req.body);
        yield form.save();
        res.status(201).send({ id: form._id });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: 'Error saving form', details: error.message });
        }
        else {
            res.status(400).send({ error: 'Unknown error saving form' });
        }
    }
}));
/**
 * @api {get} /basketball-forms/:id Get a form by ID
 * @apiName GetFormById
 * @apiGroup Form
 *
 * @apiParam {ObjectId} id Form's unique ID
 *
 * @apiSuccess {Object} form Form data
 */
app.get('/basketball-forms/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = yield survey_1.default.findById(req.params.id);
        if (!form) {
            res.status(404).send({ error: 'Form not found' });
            return;
        }
        res.send(form);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: 'Error fetching form', details: error.message });
        }
        else {
            res.status(500).send({ error: 'Unknown error fetching form' });
        }
    }
}));
/**
 * @api {get} /basketball-forms Get all form entries
 * @apiName GetForms
 * @apiGroup Form
 *
 * @apiSuccess {Object[]} forms List of form entries
 */
app.get('/basketball-forms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield survey_1.default.find();
        res.send(forms);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: 'Error fetching forms', details: error.message });
        }
        else {
            res.status(500).send({ error: 'Unknown error fetching forms' });
        }
    }
}));
/**
 * @api {get} /teams Get all NBA teams
 * @apiName GetTeams
 * @apiGroup Teams
 *
 * @apiSuccess {Object[]} teams List of NBA teams
 */
app.get('/teams', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://api.balldontlie.io/v1/teams', {
            headers: { 'Authorization': `${process.env.BALLDONTLIE_API_KEY}` }
        });
        console.log(response.data);
        res.send(response.data);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: 'Error fetching teams', details: error.message });
        }
        else {
            res.status(500).send({ error: 'Unknown error fetching teams' });
        }
    }
}));
/**
 * @api {get} /players Get player details by name
 * @apiName GetPlayerByName
 * @apiGroup Players
 *
 * @apiParam {String} search Player's name
 *
 * @apiSuccess {Object} player Player details
 */
app.get('/players', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.balldontlie.io/v1/players`, {
            headers: { 'Authorization': `${process.env.BALLDONTLIE_API_KEY}` },
            params: { per_page: 100 }
        });
        res.send(response.data);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: 'Error fetching player', details: error.message });
        }
        else {
            res.status(500).send({ error: 'Unknown error fetching player' });
        }
    }
}));
startServer();
