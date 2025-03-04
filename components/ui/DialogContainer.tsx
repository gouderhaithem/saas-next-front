import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DialogContainerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

const DialogContainer: React.FC<DialogContainerProps> = ({ open, onClose, title, children, className }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={`max-w-md md:max-w-lg lg:max-w-xl ${className}`}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default DialogContainer;
