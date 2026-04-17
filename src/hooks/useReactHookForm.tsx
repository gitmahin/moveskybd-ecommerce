// MSG_WARNING: Need to update this hook for compatitable with Zod v4
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, useForm } from "react-hook-form";

interface UseReactFormPropsType<T extends z.ZodTypeAny> {
  zodSchema: T;
}

export const useReactForm = <T extends z.ZodTypeAny>({
  zodSchema,
}: UseReactFormPropsType<T>) => {
  type FormData = z.infer<T> extends object ? z.infer<T> : FieldValues;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(zodSchema),
  });

  return {
    register,
    handleSubmit,
    setValue,
    errors,
  };
};
