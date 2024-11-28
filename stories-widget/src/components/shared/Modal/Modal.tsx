import {
  memo,
  useState,
  forwardRef,
  useTransition,
  useImperativeHandle,
} from "react";

import * as ModalCss from "./Modal.css?raw";
import { modalRef } from "../../../types/common";

interface Props {
  children: React.ReactNode;
  type: string;
}

const Modal = forwardRef<modalRef, Props>(({ children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      startTransition(() => {
        setIsOpen(true);
        setIsAnimating(true);
      });
    },
    close: () => {
      setIsAnimating(false);
      setTimeout(() => {
        startTransition(() => {
          setIsOpen(false);
        });
      }, 200);
    },
  }));

  if (!isOpen && !isPending) return null;

  return (
    <>
      <style type="text/css">{ModalCss.default}</style>
      <div
        onClick={() =>
          ref && "current" in ref && ref?.current && ref?.current?.close()
        }
        className={`modal-overlay ${isOpen ? "show" : ""}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`modal-content ${
            isAnimating ? (isOpen ? "fade-zoom-in" : "fade-zoom-out") : ""
          }`}
        >
          {children}
        </div>
      </div>
    </>
  );
});

export default memo(Modal);
