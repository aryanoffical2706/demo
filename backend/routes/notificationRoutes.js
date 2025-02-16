const express = require("express");
const notificationController = require("../controller/notificationController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.get("/", authenticate, notificationController.getNotifications);
router.put("/:broadcastId/requests/:requestId", authenticate, notificationController.handleJoinRequest);

module.exports = router;