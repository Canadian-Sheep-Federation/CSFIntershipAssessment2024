import express, {Router, Express} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const port: number = 4000;
const charLimit: number = 10000;

//setup express
const app: Express = express();
app.use(cors());
app.use(express.json());


//setup mongoose
mongoose.connect("mongodb://database:27017/CSF_Takehome");
const db: mongoose.Connection = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
const uselessFactSchema = new mongoose.Schema({
  name: String,
  uselessFact: String,
  postedDate: Date,
  rating: Number
});
const uselessFacts = mongoose.model("uselessFacts", uselessFactSchema);

//add routes
export const router: Router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
  let {name, uselessFact, rating} = req.body;

  if(!validStr(name)  || name.length  <= 0) return res.status(400).json({error: "Please enter a name."});
  if(name.length >= charLimit) return res.status(400).json({error: `Please enter a name that is less than ${charLimit} characters.`});

  if(!validStr(uselessFact)  || uselessFact.length  <= 0) return res.status(400).json({error: "Please enter a useless fact."});
  
  if(name.length >= charLimit) return res.status(400).json({error: `please enter a useless fact that is less than ${charLimit} characters.`});
  
  if(typeof rating !== 'number' || rating < 0 || rating > 1) {
    return res.status(400).json({error: 'please enter a rating that is number and is greater than or equal to 0 and less than or equal to 1.'})
  }
  
  try {
    uselessFacts.create({name: name, uselessFact: uselessFact, postedDate: Date.now(), rating: rating});
  } catch(e) {
    console.log(e);
    return res.status(500).send();
  }

  return res.status(200).send();
});

router.get('/', async (req, res) => {
  let output: any[] = [];

  try{
    let databaseContents = await uselessFacts.find({}).select("name")
                                .select("_id").select("uselessFact")
                                .select("postedDate").select("rating");

    databaseContents.forEach((val) => {
      output.push({
        _id: val._id.valueOf().toString(),
        uselessFact: val.uselessFact,
        postedDate: val.postedDate,
        rating: val.rating,
        name: val.name
      });
    });

  } catch(e) {
    console.log(e);
    return res.status(500).send();
  }
  

  return res.status(200).json(output);
});

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  
  if(id.length !== 24) {//id length is fixed in mongodb
    return res.status(400).json({error: "invalid id"});
  } 

  try {
    let databaseContents = await uselessFacts.findById(id).select("name")
                                .select("_id").select("uselessFact")
                                .select("postedDate").select("rating").limit(1);

    if(databaseContents === null || databaseContents === undefined) return res.status(404).send();

    return res.status(200).json(databaseContents);
  } catch(e) {
    console.log(e);
    return res.status(500).send();
  }
})

app.use('/', router);
app.listen(port, () => console.log("Server Started on " + port));


//helper functions
function validStr(val: any) {
  return !(val == undefined || val === null || (typeof val !== 'string' && !(val instanceof String)));
}