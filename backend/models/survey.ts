import mongoose, { Document, Model, Schema } from 'mongoose';

interface ISurvey extends Document {
  name: string;
  email: string;
  favoriteTeams: string;
  favoritePlayer: string;
  comments?: string;
  favoriteTeamDetails: {
    teamId: number;
    teamName: string;
    conference: string;
    division: string;
  };
}

const SurveySchema: Schema = new Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true },
  favoriteTeams: { type: String, required: true },
  favoritePlayer: { type: String, required: true },
  comments: { type: String },
  favoriteTeamDetails: {
    teamId: { type: Number, required: true },
    teamName: { type: String, required: true },
    conference: { type: String, required: true },
    division: { type: String, required: true },
  }
}, {
  timestamps: true,
});

const Form: Model<ISurvey> = mongoose.model<ISurvey>('Form', SurveySchema);

export default Form;
