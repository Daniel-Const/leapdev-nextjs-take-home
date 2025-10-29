"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  confirmText: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  confirmText,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
