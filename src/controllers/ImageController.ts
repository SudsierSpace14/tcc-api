import Image from '../models/images'
import { Request, Response } from 'express'
// import { IImage } from '../@types/image'

interface IImageRequest{
  src: string,
  name: string
}

class ImageController {
  public async createImage (req: Request<null, null, IImageRequest>, res: Response): Promise<Response> {
    const { src, name } = req.body
    if (!src) {
      throw new Error('Put a source')
    }

    const nameExist = await Image.findOne({ name })

    if (nameExist) {
      throw new Error('this name is already in some image, put another')
    }

    const image = await Image.create(req.body)
    image.save()

    return res.json(image)
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    const images = await Image.find({})

    return res.json(images)
  }

  // public async findOne (req: IImageRequest, res: Response): Promise<Response> {
  //   // const { id } = req.query

  //   // if (id) {
  //   //   const videos = await Video.find({ _id: id })
  //   //   return res.status(201).json(videos)
  //   // }
  //   // const videos = await Video.find(req.query)

  //   return res.status(201).json({})
  // }

  public async updateImage (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      throw new Error('Put an id on the req params')
    }

    await Image.updateOne({ _id: id }, req.body)

    return res.status(201).json({ message: 'Image updated' })
  }

  async deleteImage (req: Request, res: Response) {
    const { id } = req.params

    if (!id) {
      throw new Error('Put an id on the req params')
    }

    await Image.deleteOne({ _id: id })

    res.status(201).json({ message: 'Image deleted' })
  }
}

export default ImageController
