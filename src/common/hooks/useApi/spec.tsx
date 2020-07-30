import { AxiosResponse, AxiosError } from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import { usePost, useGet } from ".";
import api from "./interceptor";

jest.mock("./interceptor");

const mockedApi = api as jest.Mocked<typeof api>;
const TEST_DATA = ["TEST"];

afterEach(jest.clearAllMocks);

describe("API: hooks", () => {
  describe("usePost", () => {
    describe("when a successful call is made", () => {
      beforeEach(() => {
        mockedApi.post.mockResolvedValue({
          data: TEST_DATA,
          headers: {},
        } as AxiosResponse);
      });

      it("should call the post method on the api with the URL and return the response", async () => {
        let response: any;
        const { result } = renderHook(() => usePost("/test-url"));

        await act(async () => {
          response = await result.current.post({
            payload: {},
          });
        });

        expect(response!.payload).toEqual(TEST_DATA);
      });

      it("should remove errors after a successful response", async () => {
        const { result } = renderHook(() => usePost("/test-url"));

        await act(async () => {
          await result.current.post({
            payload: {},
          });
        });

        expect(result.current.errors).toEqual([]);
      });
    });

    describe("when an error is returned", () => {
      beforeEach(() => {
        mockedApi.post.mockRejectedValue({
          response: {
            data: [
              {
                message: "ERROR",
              },
            ],
          },
        } as AxiosError);
      });

      it("should set the errors on the state and return them", async () => {
        const { result } = renderHook(() => usePost("/test-url"));

        await act(async () => {
          try {
            await result.current.post({});
          } catch (e) {
            expect(e.response).toEqual({ data: [{ message: "ERROR" }] });
            expect(result.current.errors).toEqual(["ERROR"]);
          }
        });
      });

      it("should reset errors", async () => {
        const { result } = renderHook(() => usePost("/test-url"));

        await act(async () => {
          try {
            await result.current.post({});
          } catch (e) {
            result.current.reset();
            expect(result.current.errors).toEqual([]);
            expect(result.current.loading).toEqual(false);
          }
        });
      });
    });
  });
  describe("useGet", () => {
    describe("when a successful call is made", () => {
      beforeEach(() => {
        mockedApi.get.mockResolvedValue({
          data: TEST_DATA,
          headers: {},
        } as AxiosResponse);
      });

      it("should call the get method on the api with the URL and return the response", async () => {
        let response: any;
        const { result } = renderHook(() => useGet("/test-url"));

        await act(async () => {
          response = await result.current.get();
        });

        expect(mockedApi.get).toHaveBeenCalledWith("/test-url");
        expect(response!.payload).toEqual(TEST_DATA);
      });

      it("should remove errors after a successful response", async () => {
        const { result } = renderHook(() => useGet("/test-url"));

        await act(async () => {
          await result.current.get();
        });

        expect(result.current.errors).toEqual([]);
      });
    });

    describe("when an error is returned", () => {
      beforeEach(() => {
        mockedApi.get.mockRejectedValue({
          response: {
            data: [
              {
                message: "ERROR",
              },
            ],
          },
        } as AxiosError);
      });

      it("should set the errors on the state and return them", async () => {
        const { result } = renderHook(() => useGet("/test-url"));

        await act(async () => {
          try {
            await result.current.get();
          } catch (e) {
            expect(e.response).toEqual({ data: [{ message: "ERROR" }] });
            expect(result.current.errors).toEqual(["ERROR"]);
          }
        });
      });

      it("should reset errors", async () => {
        const { result } = renderHook(() => useGet("/test-url"));

        await act(async () => {
          try {
            await result.current.get();
          } catch (e) {
            result.current.reset();
            expect(result.current.errors).toEqual([]);
            expect(result.current.loading).toEqual(false);
          }
        });
      });
    });
  });
});
