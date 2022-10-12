import type { Ref } from "vue";
import { ref } from "vue";

const error = ref<string>();

export default function useError(): {
  error: Ref<string | undefined>;
  setError(message: string | undefined): void;
} {
  const setError = (message: string) => {
    error.value = message;
  };

  return {
    error,
    setError,
  };
}
