import Video from '../models/video'
import { Request, Response } from 'express'

interface IVideoRequest extends Request{
  body: {
    title: string,
    video_url: string,
    thumbnail_url: string
  },
  query: {
    id: string,
    title: string,
    video_url: string,
    thumbnail_url: string
  }
}

// type VideoBody = {
//   title: string,
//   video_url: string,
//   thumbnail_url: string
// }

// type VideoQuery = {
//   id: string,
//   title: string,
//   video_url: string,
//   thumbnail_url: string
// }

// type VideoRequest = Request<any, any, VideoBody, VideoQuery>

class VideoController {
  public async create (req: IVideoRequest, res: Response): Promise<Response> {
    // if (!title) {
    //   throw new Error('Put a source')
    // }
    // mongoose already do that

    // const nameExist = await Video.findOne({ name })

    // if (nameExist) {
    //   throw new Error('this name is already in some image, put another')
    // }
    // mongoose already do that
    const video = await Video.create(req.body)
    video.save()

    return res.json(video)
  }

  public async findOne (req: IVideoRequest, res: Response): Promise<Response> {
    const { id } = req.query

    if (id) {
      const videos = await Video.find({ _id: id })
      return res.status(201).json(videos)
    }
    const videos = await Video.find(req.query)

    return res.status(201).json(videos)
  }

  public async findAll (req: Request, res: Response): Promise<Response> {
    const videos = await Video.find({})

    return res.json(videos)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      throw new Error('Put an id on the req params')
    }

    const video = await Video.findOneAndUpdate({ _id: id }, req.body)

    return res.status(201).json({ message: 'Video updated', video })
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      throw new Error('Put an id on the request parameters')
    }

    await Video.deleteOne({ _id: id })

    return res.status(201).json({ message: 'Video deleted' })
  }
}

export default VideoController
