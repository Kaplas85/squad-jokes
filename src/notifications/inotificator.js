const EmailNotificator = require("../notifications/emailNotificator");
const SmsNotificator = require("../notifications/smsNotificator");
const config = require("../config");

class INotificator {
  constructor() {
    if (config.notifier_method === "email") {
      this.notificator = new EmailNotificator();
    }
    if (config.notifier_method === "sms") {
      this.notificator = new SmsNotificator();
    }
  }

  sendAlert(recipient, message) {
    if (!recipient || !message) {
      throw new Error("Recipient and message are required");
    }

    this.notificator.sendNotification(recipient, message);
  }
}

module.exports = INotificator;
