import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";

// Atom to manage the isOpen state
const isOpenState = atom({
  key: "isOpenState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Selector to get the current state
const newWarehouseState = selector({
  key: "newWarehouseState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const isOpen = get(isOpenState);
    return { isOpen };
  },
});

// Custom hooks to open and close the modal
export const useNewWarehouse = () => {
  const [state, setState] = useRecoilState(isOpenState);

  const onOpen = () => setState(true);
  const onClose = () => setState(false);

  return {
    isOpen: state,
    onOpen,
    onClose,
  };
};
