import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { renderHook, act, HookResult } from "@testing-library/react-hooks";
import useEditUser from ".";
import api from "../../../../common/hooks/useApi/interceptor";
import NotificationsProvider, {
  NotificationType,
} from "../../../../common/providers/notifications";
import userFixture from "../../../../common/fixtures/userFixture";
import * as URLS from "../../../../common/urls";
import useNotifications from "../../../../common/hooks/useNotifications";

jest.mock("../../../../common/hooks/useApi/interceptor");
jest.mock("../../../../common/hooks/useNotifications");

let result: HookResult<ReturnType<typeof useEditUser>>;
const mockedApi = api as jest.Mocked<typeof api>;

const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <NotificationsProvider>{children}</NotificationsProvider>
);

afterEach(jest.clearAllMocks);

describe("useEditUser", () => {
  const mockAddNotification = jest.fn();
  beforeEach(() => {
    // @ts-ignore
    useNotifications.mockReturnValue({
      addNotification: mockAddNotification,
    });
    mockedApi.put.mockResolvedValue({
      headers: {},
      data: {},
    } as AxiosResponse);
    const renderedHook = renderHook(() => useEditUser(), {
      wrapper,
    });
    result = renderedHook.result;
  });

  it("should initalise with saving false", async () => {
    expect(result.current.saving).toBe(false);
  });

  it("should set saving true when saving", async () => {
    act(() => result.current.save(userFixture));
    expect(result.current.saving).toBe(true);
  });

  it("should call the API", async () => {
    await act(async () => await result.current.save(userFixture));
    expect(mockedApi.put).toHaveBeenCalledWith(
      URLS.USERS + userFixture.id,
      userFixture
    );
  });

  it("should show a success message", async () => {
    await act(async () => await result.current.save(userFixture));
    expect(mockAddNotification).toHaveBeenCalledWith("User Updated", 1);
  });

  it("should show a banner on API error", async () => {
    const ERROR = "ERROR";
    mockedApi.put.mockRejectedValue({
      response: { data: [{ message: ERROR }] },
    } as AxiosError);
    await act(async () => await result.current.save(userFixture));
    expect(mockAddNotification).toHaveBeenCalledWith(
      `Error while updating user:${ERROR}`,
      NotificationType.ERROR
    );
  });
});
