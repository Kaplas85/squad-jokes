class SmsNotificator {
  sendNotification(recipient: string, message: string) {
    console.group("SMS Notification");
    console.log(`To: ${recipient}`);
    console.log(`Message: ${message}`);
    console.groupEnd();
  }
}

export default SmsNotificator;
