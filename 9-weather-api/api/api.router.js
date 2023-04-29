import express from 'express';

import * as configController from './config.controller.js';
import * as weatherController from './weather.controller.js';

const apiRouter = express.Router();

apiRouter.route('/health').get((req, resp) => {
  resp.json({ status: 'ok' });
})

apiRouter.route('/config')
  .get((req, resp) => {
    configController.get(req, resp);
  })
  .post((req, resp, next) => {
    configController.put(req, resp, next);
  })

apiRouter.route('/').get((req, resp, next) => {
  weatherController.get(req, resp, next);
})

export default apiRouter;
