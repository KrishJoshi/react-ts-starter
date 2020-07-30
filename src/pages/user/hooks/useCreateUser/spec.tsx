import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { renderHook, act, HookResult } from "@testing-library/react-hooks";
import useCreateUser from ".";
import api from "../../../../common/hooks/useApi/interceptor";
import NotificationsProvider, {
  NotificationType,
} from "../../../../common/providers/notifications";
import userFixture from "../../../../common/fixtures/userFixture";
import * as URLS from "../../../../common/urls";
import useNotifications from "../../../../common/hooks/useNotifications";

jest.mock("../../../../common/hooks/useApi/interceptor");
jest.mock("../../../../common/hooks/useNotifications");

let result: HookResult<ReturnType<typeof useCreateUser>>;
const mockedApi = api as jest.Mocked<typeof api>;

const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <NotificationsProvider>{children}</NotificationsProvider>
);

afterEach(jest.clearAllMocks);

describe("useCreateUser", () => {
  const mockAddNotification = jest.fn();
  beforeEach(() => {
    // @ts-ignore
    useNotifications.mockReturnValue({
      addNotification: mockAddNotification,
    });
    mockedApi.post.mockResolvedValue({
      headers: {},
      data: {},
    } as AxiosResponse);
    const renderedHook = renderHook(() => useCreateUser(), {
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
    expect(mockedApi.post).toHaveBeenCalledWith(URLS.USERS, userFixture);
  });

  it("should show a success message", async () => {
    await act(async () => await result.current.save(userFixture));
    expect(mockAddNotification).toHaveBeenCalledWith(
      "User Created",
      NotificationType.SUCCESS
    );
  });

  it("should show a banner on API error", async () => {
    const ERROR = "ERROR";
    mockedApi.post.mockRejectedValue({
      response: { data: [{ message: ERROR }] },
    } as AxiosError);
    await act(async () => await result.current.save(userFixture));
    expect(mockAddNotification).toHaveBeenCalledWith(
      `Error while creating user:${ERROR}`,
      NotificationType.ERROR
    );
  });
});
