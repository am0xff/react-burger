import { useCallback, useState } from "react";

const useModal = (initialValue = false) => {
  const [open, setOpen] = useState(initialValue);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return {
    open,
    onOpen,
    onClose
  }
}

export default useModal;