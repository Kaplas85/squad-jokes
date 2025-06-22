class EmailNotificator {
  sendNotification(recipient: string, message: string) {
    console.group("Email Notification");
    console.log(`To: ${recipient}`);
    console.log(`Message: ${message}`);
    console.groupEnd();
  }
}

export default EmailNotificator;
