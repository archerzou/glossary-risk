"use client";

import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type DeleteDialogProps = {
  triggerClassName?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  actionButtonProps?: React.ComponentProps<typeof Button>;
  children?: ReactNode;
  submitOnConfirm?: boolean;
};

export function DeleteDialog({
  triggerClassName,
  title = "Delete term?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  actionButtonProps,
  children,
  submitOnConfirm = true,
}: DeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={triggerClassName}>
          <Trash />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              type={submitOnConfirm ? "submit" : "button"}
              {...actionButtonProps}
            >
              <Trash />
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
