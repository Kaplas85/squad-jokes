const INotificator = require("../notifications/inotificator");

function notificatorController(req, res) {
  const { recipient, message } = req.body;

  if (!recipient || !message) {
    return res
      .status(400)
      .json({ error: "Recipient and message are required" });
  }

  const notificator = new INotificator();

  notificator.sendAlert(recipient, message);
  res.status(200).json({ success: true, message: "Alert sent successfully" });
}

module.exports = notificatorController;
