import Mongoose from 'mongoose'
import { ICategoryContent } from '../@types/models'

interface ContentModel extends Mongoose.Model<ICategoryContent>{
  validateSize(): boolean
}

const ContentSchema = new Mongoose.Schema<ICategoryContent, ContentModel>({
  title: {
    type: String,
    required: true
  },
  url: String,
  image_url: String,
  type: String,
  gif: String,
  size: {
    type: String,
    // default: "1/4"
  }
}, {
  timestamps: true
})

// ContentSchema.method('validateSize', function validateSize(){
//   if(!this.size && this.type === 'comic'){
//     throw new Error("size is required")
//   }
// })

ContentSchema.pre('save', function(){
  if(!this.size && this.type === 'comic'){
    throw new Error("Size is required")
  }
})

export const CategoryContent = Mongoose.model<ICategoryContent, ContentModel>('Content', ContentSchema)