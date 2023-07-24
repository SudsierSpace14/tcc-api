import { Request, Response } from 'express'
import { Model } from 'mongoose'

interface IAssignController{
  request: typeof Request
}

class assignController<RequestInterface extends Request>{
    model: Model<any>;
    
    constructor(model: Model<any>){
      this.model = model
    }

    public async assign(func: (constructor: any, model: Model<any>) => void): Promise<void> {
      func(this, this.model)
    }

    public async findOne (req: RequestInterface, res: Response): Promise<Response> {
      const { id } = req.query
      
      if(id){
        const videos = await this.model.find({ _id: id })
        return res.status(201).json(videos)
      }
      const videos = await this.model.find(req.query)

      return res.status(201).json(videos)
    }

    public async update (req: RequestInterface, res: Response): Promise<Response> {
      const { id } = req.params

      if (!id) {
        throw new Error('Put an id on the req params')
      }

      const doc = await this.model.findOneAndUpdate({ _id: id }, req.body)

      return res.status(201).json({ message: "Updated", doc })
    }
}

export { assignController }