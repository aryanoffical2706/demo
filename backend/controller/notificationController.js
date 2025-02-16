const Broadcast = require("../models/broadcast");

exports.getNotifications = async (req, res) => {
  try {
    const broadcasts = await Broadcast.find({ userId: req.user._id }).populate(
      "joinRequests.userId",
      "name email"
    );

    const notifications = broadcasts.flatMap((broadcast) =>
      broadcast.joinRequests.map((request) => ({
        broadcastId: broadcast._id,
        requestId: request._id,
        user: request.userId,
        status: request.status,
      }))
    );

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.handleJoinRequest = async (req, res) => {
  const { broadcastId, requestId } = req.params;
  const { status } = req.body;

  try {
    const broadcast = await Broadcast.findById(broadcastId);
    if (!broadcast) return res.status(404).json({ error: "Broadcast not found" });

    const request = broadcast.joinRequests.id(requestId);
    if (!request) return res.status(404).json({ error: "Request not found" });

    request.status = status;
    await broadcast.save();

    res.status(200).json({ message: `Request ${status} successfully` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};