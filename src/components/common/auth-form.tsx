"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ZodTypeAny } from "zod";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodTypeAny;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "sign-in" | "sign-up";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignIn = type === "sign-in";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    setIsSubmitting(true);

    try {
      const result = await onSubmit(data);

      if (result.success) {
        toast.success(isSignIn ? "Đăng nhập thành công" : "Đăng ký thành công");
        router.push("/");
      } else {
        toast.error(
          result.error ||
            (isSignIn
              ? "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
              : "Đăng ký thất bại. Vui lòng thử lại.")
        );
      }
    } catch (error) {
      console.error("Auth form error:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-foreground">
          {isSignIn ? "Đăng nhập" : "Tạo tài khoản"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignIn
            ? "Chào mừng bạn trở lại với Chánh Đạo"
            : "Tham gia cộng đồng học Phật"}
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {Object.keys(defaultValues).map((fieldKey) => (
            <FormField
              key={fieldKey}
              control={form.control}
              name={fieldKey as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES] ??
                      field.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={
                        FIELD_TYPES[field.name as keyof typeof FIELD_TYPES] ??
                        "text"
                      }
                      placeholder={`Nhập ${
                        FIELD_NAMES[field.name as keyof typeof FIELD_NAMES] ??
                        field.name
                      }`}
                      disabled={isSubmitting}
                      className="text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Đang xử lý..."
              : isSignIn
              ? "Đăng nhập"
              : "Đăng ký"}
          </Button>
        </form>
      </Form>

      {/* Navigation link */}
      <p className="text-center text-sm text-muted-foreground">
        {isSignIn ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-medium text-foreground hover:underline transition-colors"
        >
          {isSignIn ? "Đăng ký" : "Đăng nhập"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
