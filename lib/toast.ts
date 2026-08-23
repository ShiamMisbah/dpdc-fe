import { toast } from "@/components/ui/toast";

type PromiseToastOptions<T> = {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: unknown) => string);
};

export function promiseToast<T>(
  promise: Promise<T>,
  options: PromiseToastOptions<T>,
) {
  return toast.promise(promise, {
    loading: options.loading,
    success: options.success,
    error: options.error,
  });
}
