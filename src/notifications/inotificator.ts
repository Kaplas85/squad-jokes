import config from "@/config";
import EmailNotificator from "./emailNotificator";
import SmsNotificator from "./smsNotificator";

class INotificator {
  notificator!: EmailNotificator | SmsNotificator;

  constructor() {
    if (config.notifier_method === "email") {
      this.notificator = new EmailNotificator();
    }
    if (config.notifier_method === "sms") {
      this.notificator = new SmsNotificator();
    }
  }

  sendAlert(recipient: string, message: string) {
    if (!recipient || !message) {
      throw new Error("Recipient and message are required");
    }

    this.notificator.sendNotification(recipient, message);
  }
}

export default INotificator;
