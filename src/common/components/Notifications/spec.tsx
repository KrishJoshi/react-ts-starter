import React from "react";
import Toast from ".";
import useNotifications from "../../hooks/useNotifications";
import notification from "../../fixtures/notificationFixture";
import { shallow, ShallowWrapper } from "enzyme";
import { NotificationType } from "../../providers/notifications";

jest.mock("../../hooks/useNotifications");

afterEach(jest.clearAllMocks);

describe("Toast", () => {
  let wrapper: ShallowWrapper;

  describe("default", () => {
    const removeNotification = jest.fn();
    beforeEach(() => {
      (useNotifications as jest.Mock).mockReturnValue({
        notification,
        removeNotification,
      });
      wrapper = shallow(<Toast />);
    });

    it("should show a notification", async () => {
      expect(wrapper.text()).toContain(notification.message);
    });

    it("should show a tick, if notification is of type Success", async () => {
      expect(wrapper.text()).toContain("✅");
    });

    it("should remove notification on close click", async () => {
      expect(removeNotification).not.toHaveBeenCalled();
      wrapper.find("#close-btn").first().simulate("click");
      expect(removeNotification).toHaveBeenCalled();
    });
  });

  describe("error", () => {
    it("should show a stop sign, if notification is of type Error", async () => {
      (useNotifications as jest.Mock).mockReturnValue({
        notification: { ...notification, type: NotificationType.ERROR },
      });
      wrapper = shallow(<Toast />);
      expect(wrapper.text()).toContain("🔴");
    });
  });
});
