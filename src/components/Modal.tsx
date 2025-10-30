"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
}

export default function Modal({
  isOpen,
  title,
  description,
  content,
  footer,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-slate-600 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="dark:text-gray-300">
          {description}
        </DialogDescription>
        {content}
      </DialogContent>
      <DialogFooter>{footer}</DialogFooter>
    </Dialog>
  );
}
