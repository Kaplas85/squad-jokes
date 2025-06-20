class EmailNotificator {
  sendNotification(recipient, message) {
    console.group("Email Notification");
    console.log(`To: ${recipient}`);
    console.log(`Message: ${message}`);
    console.groupEnd();
  }
}

module.exports = EmailNotificator;
