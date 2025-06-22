import config from "@/config";
import EmailNotificator from "@/notifications/emailNotificator";
import SmsNotificator from "@/notifications/smsNotificator";
import app from "@/server";
import request from "supertest";

describe("notifications", () => {
  test("should send email notification", async () => {
    config.notifier_method = "email";
    const spy = jest.spyOn(EmailNotificator.prototype, "sendNotification");
    const res = await request(app).post("/notifications/").send({
      recipient: "test@nodomain.com",
      message: "This is a test email notification",
    });

    expect(res.status).toBe(200);
    expect(spy).toHaveBeenCalled();
  });

  test("should send sms notification", async () => {
    config.notifier_method = "sms";
    const spy = jest.spyOn(SmsNotificator.prototype, "sendNotification");
    const res = await request(app).post("/notifications/").send({
      recipient: "+584422442424",
      message: "This is a test sms notification",
    });

    expect(res.status).toBe(200);
    expect(spy).toHaveBeenCalled();
  });

  test("should return 400 for missing recipient or message", async () => {
    const res = await request(app).post("/notifications/").send({
      recipient: "",
      message: "This is a test notification",
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Recipient and message are required");
  });
});
