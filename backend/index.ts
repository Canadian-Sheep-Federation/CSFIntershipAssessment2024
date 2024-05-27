import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import Form from './models/survey';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

/**
 * Connects to MongoDB and starts the server.
 */
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');

    app.listen(3001, () => {
      console.log('Server running on port 3001');
    });

  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

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
app.post('/basketball-forms', async (req: Request, res: Response): Promise<void> => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).send({ id: form._id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: 'Error saving form', details: error.message });
    } else {
      res.status(400).send({ error: 'Unknown error saving form' });
    }
  }
});

/**
 * @api {get} /basketball-forms/:id Get a form by ID
 * @apiName GetFormById
 * @apiGroup Form
 *
 * @apiParam {ObjectId} id Form's unique ID
 *
 * @apiSuccess {Object} form Form data
 */
app.get('/basketball-forms/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      res.status(404).send({ error: 'Form not found' });
      return;
    }
    res.send(form);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: 'Error fetching form', details: error.message });
    } else {
      res.status(500).send({ error: 'Unknown error fetching form' });
    }
  }
});

/**
 * @api {get} /basketball-forms Get all form entries
 * @apiName GetForms
 * @apiGroup Form
 *
 * @apiSuccess {Object[]} forms List of form entries
 */
app.get('/basketball-forms', async (req: Request, res: Response): Promise<void> => {
  try {
    const forms = await Form.find();
    res.send(forms);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: 'Error fetching forms', details: error.message });
    } else {
      res.status(500).send({ error: 'Unknown error fetching forms' });
    }
  }
});

/**
 * @api {get} /teams Get all NBA teams
 * @apiName GetTeams
 * @apiGroup Teams
 *
 * @apiSuccess {Object[]} teams List of NBA teams
 */
app.get('/teams', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get('https://api.balldontlie.io/v1/teams', {
      headers: { 'Authorization': `${process.env.BALLDONTLIE_API_KEY}` }
    });

    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: 'Error fetching teams', details: error.message });
    } else {
      res.status(500).send({ error: 'Unknown error fetching teams' });
    }
  }
});

/**
 * @api {get} /players Get player details by name
 * @apiName GetPlayerByName
 * @apiGroup Players
 *
 * @apiParam {String} search Player's name
 *
 * @apiSuccess {Object} player Player details
 */
app.get('/players', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`https://api.balldontlie.io/v1/players`, {
      headers: { 'Authorization': `${process.env.BALLDONTLIE_API_KEY}` },
      params: { per_page: 100 }
    });
    res.send(response.data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: 'Error fetching player', details: error.message });
    } else {
      res.status(500).send({ error: 'Unknown error fetching player' });
    }
  }
});

startServer();
