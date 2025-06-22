import INotificator from "@/notifications/inotificator";
import { Request, Response } from "express";

function notificatorController(req: Request, res: Response) {
  const { recipient, message } = req.body;

  if (!recipient || !message) {
    res.status(400).json({ error: "Recipient and message are required" });
    return;
  }

  const notificator = new INotificator();

  notificator.sendAlert(recipient, message);
  res.status(200).json({ success: true, message: "Alert sent successfully" });
}

export { notificatorController };
