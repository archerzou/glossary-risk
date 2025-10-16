"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const Editor = dynamic(() => import("@tinymce/tinymce-react").then((m) => m.Editor), {
  ssr: false,
});

const TermSchema = z.object({
  term: z.string().min(1, "Term name is required"),
  definition: z.string().min(1, "Definition is required"),
  categoryId: z.string().min(1, "Category is required"),
});

export type TermFormValues = z.infer<typeof TermSchema>;

export function TermForm({
  mode,
  defaultValues,
  onSubmitAction,
  submitLabel,
  className,
  title,
  categories,
}: {
  mode: "create" | "edit";
  defaultValues?: Partial<TermFormValues>;
  onSubmitAction: (values: TermFormValues) => Promise<void> | void;
  submitLabel?: string;
  className?: string;
  title?: string;
  categories: { id: string; name: string }[];
}) {
  const form = useForm<TermFormValues>({
    resolver: zodResolver(TermSchema),
    defaultValues: {
      term: defaultValues?.term || "",
      definition: defaultValues?.definition || "",
      categoryId: defaultValues?.categoryId || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(async (v) => { await onSubmitAction(v); })} className={cn("space-y-6", className)}>
        <h1 className="text-3xl font-semibold">{title ?? (mode === "create" ? "Create a Term" : "Edit Term")}</h1>

        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Term Name <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Input required {...field} placeholder="Risk term" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="definition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Definition of Term <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  initialValue={defaultValues?.definition || ""}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
                    content_style:
                      "body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 16px }",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <select className="w-full h-12 rounded-md border bg-background px-3" required {...field}>
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit">
          {submitLabel ?? (mode === "create" ? "Submit" : "Save")}
        </Button>
      </form>
    </Form>
  );
}
