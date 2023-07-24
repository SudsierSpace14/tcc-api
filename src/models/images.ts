import Mongoose from 'mongoose'

interface IImage{
    src: string,
    name?: string
}

const ImageSchema = new Mongoose.Schema<IImage>({
  src: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  position: String
}, {
  timestamps: true
})

const Image = Mongoose.model<IImage>('Image', ImageSchema)

export default Image
