"use client";

import * as React from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const Form = FormProvider;

const FormField = Controller;

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FormItem({ className, ...props }, ref) {
    return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
  }
);

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  function FormLabel({ className, ...props }, ref) {
    return <label ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />;
  }
);

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FormControl({ className, ...props }, ref) {
    return <div ref={ref} className={className} {...props} />;
  }
);

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function FormDescription({ className, ...props }, ref) {
    return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />;
  }
);

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function FormMessage({ className, children, ...props }, ref) {
    if (!children) return null;
    return (
      <p ref={ref} className={cn("text-sm text-destructive", className)} {...props}>
        {children}
      </p>
    );
  }
);

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
