import { useState } from "react";
import { AxiosResponse } from "axios";
import api from "./interceptor";
import { apiErrorMessage } from "./utils";

type Methods = "post" | "put" | "delete" | "get";

interface IHTTPRequest<D extends object> {
  payload?: D;
  urlExtra?: string | number;
}

const initialValues = { loading: false, errors: "" };
export function useApi<R extends object>(method: Methods, url: string) {
  const [loading, setLoading] = useState(initialValues.loading);
  const [errors, setErrors] = useState<string>(initialValues.errors);

  function reset() {
    setLoading(initialValues.loading);
    setErrors(initialValues.errors);
  }

  async function sendRequest<D extends object>({
    payload,
    urlExtra = "",
  }: IHTTPRequest<D> = {}) {
    let response: AxiosResponse<R>;
    setLoading(true);

    try {
      if (method === "post" || method === "put") {
        response = await api[method]<R>(url + urlExtra, payload);
      } else if (method === "delete") {
        response = await api.delete(url + urlExtra);
      } else {
        response = await api.get<R>(url);
      }

      setErrors("");
      return {
        payload: response.data,
      };
    } catch (e) {
      const apiErrors = apiErrorMessage(e, e.message).join(", ");
      setErrors(apiErrors);
      throw apiErrors;
    } finally {
      setLoading(false);
    }
  }

  return {
    errors,
    loading,
    sendRequest,
    reset,
  };
}

export function useDelete<R extends object>(url: string) {
  const post = useApi<R>("delete", url);

  return {
    errors: post.errors,
    delete: post.sendRequest,
    loading: post.loading,
    reset: post.reset,
  };
}

export function usePost<R extends object>(url: string) {
  const post = useApi<R>("post", url);

  return {
    errors: post.errors,
    post: post.sendRequest,
    loading: post.loading,
    reset: post.reset,
  };
}

export function usePut<R extends object>(url: string) {
  const put = useApi<R>("put", url);

  return {
    errors: put.errors,
    put: put.sendRequest,
    loading: put.loading,
    reset: put.reset,
  };
}

export function useGet<R extends object>(url: string) {
  const get = useApi<R>("get", url);

  return {
    errors: get.errors,
    get: get.sendRequest,
    loading: get.loading,
    reset: get.reset,
  };
}
