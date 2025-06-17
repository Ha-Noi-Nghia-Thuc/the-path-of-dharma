"use client";

import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
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
  const isSignIn = type === "sign-in";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  return (
    <div className="flex flex-col gap-6 text-primary">
      {/* Tiêu đề chính */}
      <div className="text-center">
        <h1 className="text-3xl tracking-tight">
          {isSignIn ? (
            <>
              Chào mừng trở lại với{" "}
              <span className="font-heading text-primary">Chánh Đạo</span>
            </>
          ) : (
            "Tạo tài khoản thư viện của bạn"
          )}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {isSignIn
            ? "Truy cập kho tàng kinh điển và kết nối với cộng đồng tu học."
            : "Vui lòng điền đầy đủ thông tin bên dưới để bắt đầu hành trình học đạo."}
        </p>
      </div>

      {/* Biểu mẫu */}
      <Form {...form}>
        <form
          className="w-full space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {Object.keys(defaultValues).map((fieldKey) => (
            <FormField
              key={fieldKey}
              control={form.control}
              name={fieldKey as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-sm font-medium">
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
                      } của bạn`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Nút gửi */}
          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold text-white"
          >
            {isSignIn ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </form>
      </Form>

      {/* Điều hướng đăng nhập / đăng ký */}
      <p className="text-center text-sm text-muted-foreground">
        {isSignIn ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-medium text-primary hover:underline"
        >
          {isSignIn ? "Đăng ký ngay" : "Đăng nhập"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
