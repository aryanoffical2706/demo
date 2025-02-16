const express = require("express");
const broadcastController = require("../controller/broadcastController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, broadcastController.createBroadcast);
router.get("/", authenticate, broadcastController.getAllBroadcasts);
router.post("/:id/join", authenticate, broadcastController.joinBroadcast);
module.exports = router;