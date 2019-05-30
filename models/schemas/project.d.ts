import { Document, Model } from 'mongoose'

interface Project extends Document {
  name: string,
  vardeprueba: string,
  startAt: Date,
}

let blog: Model<Project>;

export = blog;
