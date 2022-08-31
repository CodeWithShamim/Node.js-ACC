const express = require("express");
const toolsController = require("../../controllers/tools.controller");
const { limiter } = require("../../middleware/limiter");
const viewCount = require("../../middleware/viewCount");
const router = express.Router();

console.log(toolsController);

router.route("/")
    /**
     * @api {get} /tools All tools
     * @apiDescription Get all the tools
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {Number{1-}}         [page=1]     List page
     * @apiParam  {Number{1-100}}      [limit=10]  Users per page
     *
     * @apiSuccess {Object[]} all the tools.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */
    .get(viewCount, limiter, toolsController.getAllTools)
    /**
     * @api {get} /save All tools
     * @apiDescription Get all the tools
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization   User's access token
     *
     * @apiParam  {Number{1-}}         [page=1]     List page
     * @apiParam  {Number{1-100}}      [limit=10]  Users per page
     *
     * @apiSuccess {Object[]} all the tools.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
     */
    .post(toolsController.savePost);

module.exports = router;