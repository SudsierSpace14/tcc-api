import { Router } from 'express';
import { ContentController } from './controllers/contentController';
import ImageController from './controllers/ImageController';
import VideoController from './controllers/videoController';
import { memberControllerMiddleware } from './controllers/middlewares/memberController';


// services
import { create, findOne, findAll, deleteOne } from './services'

const routes = Router()

const imageController = new ImageController()
const videoController = new VideoController()
const contentController = new ContentController()

routes.get('/', (req, res) => res.send('hello there'))

// images
routes.get('/images', imageController.findAll)
// routes.get('/image/', imageController.findOne)
routes.post('/image', imageController.createImage)
routes.put('/update/image/:id', imageController.updateImage)
routes.delete('/delete/image/:id', imageController.deleteImage)

// videos
routes.get('/videos', videoController.findAll)
routes.get('/video/', videoController.findOne)
routes.post('/videos/create', videoController.create)
routes.put('/video/update/:id', videoController.update)
routes.delete('/video/delete/:id', videoController.delete)

// content categories
routes.get('/content/all', contentController.findAll)
routes.get('/content', contentController.findOne)
routes.get('/content/:type', contentController.find)
routes.post('/content/create', contentController.create)
routes.put('/content/update/:id', contentController.update)
routes.delete('/content/delete/:id', contentController.delete)

//members
routes.get('/member', memberControllerMiddleware, findOne)
routes.get('/members', memberControllerMiddleware, findAll)
routes.post('/member/create', memberControllerMiddleware, create)
routes.delete('/member/delete/:id', memberControllerMiddleware, deleteOne)

export default routes
