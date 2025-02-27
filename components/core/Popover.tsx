import { useRef } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useDismiss,
  useRole,
  useInteractions,
  Placement,
} from "@floating-ui/react";

export const Popover = (
  props: React.ComponentProps<"div"> & {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    referenceElement: any;
    placement?: Placement
  }
) => {
  const { isOpen, setIsOpen, referenceElement, className, placement = "bottom-start", style } = props;
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    elements: {
      reference: referenceElement,
    },
    placement,
    middleware: [
      offset(16),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([dismiss, role]);

  return (
    <div
      ref={refs.setFloating}
      style={{
        ...floatingStyles,
        boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
        ...style
      }}
      className={className}
      {...getFloatingProps()}
    >
      {props.children}
    </div>
  );
};
