"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTerm } from "@/lib/actions/terms";
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
  termId: string;
  triggerClassName?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export function DeleteDialog({
                               termId,
                               triggerClassName,
                               title = "Delete term?",
                               description = "This action cannot be undone.",
                               confirmLabel = "Delete",
                               cancelLabel = "Cancel",
                             }: DeleteDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTerm(termId);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete term:", error);
      setIsDeleting(false);
    }
  };

  return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className={triggerClassName} style={{ backgroundColor: 'var(--sra-primary-red)' }}>
            <Trash />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  style={{ backgroundColor: 'var(--sra-primary-red)' }}
              >
                <Trash />
                {isDeleting ? "Deleting..." : confirmLabel}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
}