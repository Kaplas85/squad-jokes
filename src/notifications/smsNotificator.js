class SmsNotificator {
  sendNotification(recipient, message) {
    console.group("SMS Notification");
    console.log(`To: ${recipient}`);
    console.log(`Message: ${message}`);
    console.groupEnd();
  }
}

module.exports = SmsNotificator;
