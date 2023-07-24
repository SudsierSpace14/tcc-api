"use strict";
exports.__esModule = true;
var express_1 = require("express");
var contentController_1 = require("./controllers/contentController");
var ImageController_1 = require("./controllers/ImageController");
var videoController_1 = require("./controllers/videoController");
var memberController_1 = require("./controllers/middlewares/memberController");
// services
var services_1 = require("./services");
var routes = (0, express_1.Router)();
var imageController = new ImageController_1["default"]();
var videoController = new videoController_1["default"]();
var contentController = new contentController_1.ContentController();
routes.get('/', function (req, res) { return res.send('hello there'); });
// images
routes.get('/images', imageController.findAll);
// routes.get('/image/', imageController.findOne)
routes.post('/image', imageController.createImage);
routes.put('/update/image/:id', imageController.updateImage);
routes["delete"]('/delete/image/:id', imageController.deleteImage);
// videos
routes.get('/videos', videoController.findAll);
routes.get('/video/', videoController.findOne);
routes.post('/videos/create', videoController.create);
routes.put('/video/update/:id', videoController.update);
routes["delete"]('/video/delete/:id', videoController["delete"]);
// content categories
routes.get('/content/all', contentController.findAll);
routes.get('/content', contentController.findOne);
routes.get('/content/:type', contentController.find);
routes.post('/content/create', contentController.create);
routes.put('/content/update/:id', contentController.update);
routes["delete"]('/content/delete/:id', contentController["delete"]);
//members
routes.get('/member', memberController_1.memberControllerMiddleware, services_1.findOne);
routes.get('/members', memberController_1.memberControllerMiddleware, services_1.findAll);
routes.post('/member/create', memberController_1.memberControllerMiddleware, services_1.create);
routes["delete"]('/member/delete/:id', memberController_1.memberControllerMiddleware, services_1.deleteOne);
exports["default"] = routes;
