import { CategoryContent } from '../models/contentCategories'
import { Request, Response } from 'express'

interface ICategoryContentRequest extends Request{
  body: {
    title: string,
    url: string,
    image_url: string,
    type: 'cartoon' | 'toon' | 'music' | 'comic',
    size: string,
  },
  query: {
    id: string,
    title: string,
    url: string,
    image_url: string,
    type: 'cartoon' | 'toon' | 'music' | 'comic',
    size: string,
    limit: string
  },
  params: {
    type: 'cartoon' | 'toon' | 'music' | 'comic',
  }
}

class ContentController {
  public async create (req: ICategoryContentRequest, res: Response): Promise<Response> {
    const content = await CategoryContent.create(req.body)
    content.save()
    console.log(req.headers['content-type'])
    return res.json(content)
  }

  public async findOne (req: ICategoryContentRequest, res: Response): Promise<Response> {
    const { id } = req.query

    if (id) {
      const content = await CategoryContent.find({ _id: id })
      return res.status(201).json(content)
    }
    const content = await CategoryContent.find(req.query)

    return res.status(201).json(content)
  }

  public async find (req: ICategoryContentRequest, res: Response): Promise<Response> {
    const content = await CategoryContent.find({type: req.params.type})
    .sort({ createdAt: -1 })
    .limit(Number(req.query.limit))

    return res.status(201).json(content)
  }

  public async findAll (req: ICategoryContentRequest, res: Response): Promise<Response> {
    if (req.query) {
      const content = await CategoryContent.find({}).sort({ createdAt: -1 }).limit(Number(req.query.limit))
      return res.json(content)
    }
    const content = await CategoryContent.find({})

    return res.json(content)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      throw new Error('Especify an id on the request parameters')
    }

    const content = await CategoryContent.findOneAndUpdate({ _id: id }, req.body, { new: true })

    return res.status(201).json({ message: 'Content updated', content })
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    if (!id) {
      throw new Error('Put an id on the request parameters')
    }

    const contentDeleted = await CategoryContent.findOneAndDelete({ _id: id })

    return res.status(201).json({ message: 'Content deleted', contentDeleted })
  }
}

export { ContentController }
