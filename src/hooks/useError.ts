import type { Ref } from "vue";
import { ref } from "vue";
import { AxiosError } from "axios";

const error = ref<string>();

export default function useError(): {
  error: Ref<string | undefined>;
  setError(message: string | undefined): void;
  resetError(): void;
  handleError(e: any): void;
} {
  const setError = (message: string) => {
    error.value = message;
  };

  const resetError = () => {
    error.value = undefined;
  };

  const handleError = (e: any) => {
    if (e instanceof AxiosError) {
      const errMsg = {
        name: "Network error",
        code: e.code,
        message: e.message,
        config: {
          method: e.config.method,
          baseURL: e.config.baseURL,
          url: e.config.url,
          params: e.config.params,
        },
        data: e.response?.data,
      };
      setError(JSON.stringify(errMsg));
    } else {
      if (typeof e === "string") {
        setError(e);
      } else {
        setError(JSON.stringify({ ...e, name: e.name || "Unknown error" }));
      }
    }
  };

  return {
    error,
    setError,
    resetError,
    handleError,
  };
}
