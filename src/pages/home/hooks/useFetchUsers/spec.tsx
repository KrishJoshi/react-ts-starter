import React from "react";
import { AxiosError, AxiosResponse } from "axios";
import { renderHook, act, HookResult } from "@testing-library/react-hooks";
import useFetchUsers from ".";
import api from "../../../../common/hooks/useApi/interceptor";
import NotificationsProvider, {
  NotificationType,
} from "../../../../common/providers/notifications";
import userFixture from "../../../../common/fixtures/userFixture";
import * as URLS from "../../../../common/urls";
import useNotifications from "../../../../common/hooks/useNotifications";

jest.mock("../../../../common/hooks/useApi/interceptor");
jest.mock("../../../../common/hooks/useNotifications");

let result: HookResult<ReturnType<typeof useFetchUsers>>;
const mockedApi = api as jest.Mocked<typeof api>;

const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <NotificationsProvider>{children}</NotificationsProvider>
);

afterEach(jest.clearAllMocks);

describe("useFetchUsers", () => {
  const mockAddNotification = jest.fn();
  beforeEach(() => {
    (useNotifications as jest.Mock).mockReturnValue({
      addNotification: mockAddNotification,
    });
    mockedApi.get.mockResolvedValue({
      headers: {},
      data: { data: [userFixture] },
    } as AxiosResponse);
    const renderedHook = renderHook(() => useFetchUsers(), {
      wrapper,
    });
    result = renderedHook.result;
  });

  it("should initalise with loading false", async () => {
    expect(result.current.loading).toBe(false);
  });

  it("should set loading true when fetching", async () => {
    act(() => result.current.fetch());
    expect(result.current.loading).toBe(true);
  });

  it("should call the API", async () => {
    await act(async () => await result.current.fetch());
    expect(mockedApi.get).toHaveBeenCalledWith(URLS.USERS);
  });

  it("should show a success message", async () => {
    await act(async () => await result.current.fetch());
    expect(result.current.users).toEqual([userFixture]);
  });

  it("should show a banner on API error", async () => {
    const ERROR = "ERROR";
    mockedApi.get.mockRejectedValue({
      response: { data: [{ message: ERROR }] },
    } as AxiosError);
    await act(async () => await result.current.fetch());
    expect(mockAddNotification).toHaveBeenCalledWith(
      `Unable to fetch all users`,
      NotificationType.ERROR
    );
  });
});
