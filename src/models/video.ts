import Mongoose from 'mongoose'

interface IVideo{
  title: string,
  video_id: string,
  thumbnail_url: string,
}

const VideoSchema = new Mongoose.Schema<IVideo>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  video_id: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Video = Mongoose.model<IVideo>('Video', VideoSchema)

export default Video
