import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { renderHook, act, HookResult } from "@testing-library/react-hooks";
import useDeleteUser from ".";
import api from "../../../../common/hooks/useApi/interceptor";
import NotificationsProvider, {
  NotificationType,
} from "../../../../common/providers/notifications";
import userFixture from "../../../../common/fixtures/userFixture";
import * as URLS from "../../../../common/urls";
import useNotifications from "../../../../common/hooks/useNotifications";

jest.mock("../../../../common/hooks/useApi/interceptor");
jest.mock("../../../../common/hooks/useNotifications");

let result: HookResult<ReturnType<typeof useDeleteUser>>;
const mockedApi = api as jest.Mocked<typeof api>;

const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <NotificationsProvider>{children}</NotificationsProvider>
);

afterEach(jest.clearAllMocks);

describe("useDeleteUser", () => {
  const mockAddNotification = jest.fn();
  beforeEach(() => {
    (useNotifications as jest.Mock).mockReturnValue({
      addNotification: mockAddNotification,
    });
    mockedApi.delete.mockResolvedValue({
      headers: {},
      data: {},
    } as AxiosResponse);
    const renderedHook = renderHook(() => useDeleteUser(), {
      wrapper,
    });
    result = renderedHook.result;
  });

  it("should initalise with removing false", async () => {
    expect(result.current.removing).toBe(false);
  });

  it("should set removing true when removing", async () => {
    act(() => result.current.remove(userFixture.id));
    expect(result.current.removing).toBe(true);
  });

  it("should call the API", async () => {
    await act(async () => await result.current.remove(userFixture.id));
    expect(mockedApi.delete).toHaveBeenCalledWith(URLS.USERS + userFixture.id);
  });

  it("should show a success message", async () => {
    await act(async () => await result.current.remove(userFixture.id));
    expect(mockAddNotification).toHaveBeenCalledWith(
      "User Removed",
      NotificationType.SUCCESS
    );
  });

  it("should show a banner on API error", async () => {
    const ERROR = "ERROR";
    mockedApi.delete.mockRejectedValue({
      response: { data: [{ message: ERROR }] },
    } as AxiosError);
    await act(async () => await result.current.remove(userFixture.id));
    expect(mockAddNotification).toHaveBeenCalledWith(
      `User unable to remove`,
      NotificationType.ERROR
    );
  });
});
