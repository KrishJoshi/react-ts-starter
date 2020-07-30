import { AxiosError } from 'axios';

interface IApiValidationErrorResponse {
  message: string;
}

export const apiErrorMessage = (e: AxiosError, err: string = ''): string[] => {
  if (e.response && Array.isArray(e.response.data)) {
    const errors = e.response.data as IApiValidationErrorResponse[];
    return errors.map(({ message }) => message);
  }
  return [err];
};
