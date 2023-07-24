import { Request, Response } from 'express'

interface IControllerMiddlewareRequest extends Request{
  body: {
    name: string,
    role: string
  },
  query: {
    id: string
  }
}

async function create(
  req: IControllerMiddlewareRequest,
  res: Response
): Promise<Response> {
  const doc = await req.model.create(req.body)
  doc.save()

  return res.status(201).json(doc)
}

async function findOne(
  req: IControllerMiddlewareRequest,
  res: Response
):
Promise<Response> {
  const { id } = req.query

  if(req.func) req.func() // optional validation function

  if (id) {
    const docs = await req.model.find({ _id: id })
    return res.status(302).json(docs) 
  }
  const docs = await req.model.find(req.query)
  return res.status(302).json(docs)
}

async function findAll(
  req: Request, 
  res: Response
): Promise<Response> {
  const docs = await req.model.find({})

  return res.json(docs)
}

async function update(){

}

async function deleteOne(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params

  if (!id) {
    throw new Error('Put an id on the request parameters')
  }

  await req.model.deleteOne({ _id: id })
  return res.status(201).json({ message: 'Data deleted' })
}

export {
  create,
  findOne,
  findAll,
  deleteOne
}