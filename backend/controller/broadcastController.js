const Broadcast = require("../models/broadcast");

exports.createBroadcast = async (req, res) => {
  const { date, time, location, activity } = req.body;

  try {
    const newBroadcast = new Broadcast({
      userId: req.user._id,
      date,
      time,
      location,
      activity,
    });
    await newBroadcast.save();

    res.status(201).json({ message: "Broadcast created successfully", broadcast: newBroadcast });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllBroadcasts = async (req, res) => {
  try {
    const broadcasts = await Broadcast.find().populate("userId", "name email");
    res.status(200).json(broadcasts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.joinBroadcast = async (req, res) => {
    const broadcastId = req.params.id;
    const userId = req.user._id;
  
    try {
      const broadcast = await Broadcast.findById(broadcastId);
      if (!broadcast) return res.status(404).json({ error: "Broadcast not found" });
  
      const existingRequest = broadcast.joinRequests.find(
        (request) => request.userId.toString() === userId
      );
      if (existingRequest) return res.status(400).json({ error: "Request already sent" });
  
      broadcast.joinRequests.push({ userId, status: "pending" });
      await broadcast.save();
  
      res.status(200).json({ message: "Join request sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };