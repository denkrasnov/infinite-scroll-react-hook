import { useState, useCallback, useEffect, useRef } from "react";

export type SetRefType = (node: Element | null) => void;

export type ReturnType<T> = [T[], SetRefType];

/**
 * @param {array} allItems Items to gradually add.
 * @param {object} [observerOptions] Options for Intersection Observer.
 * @returns {array} [items, setRef]: items - every time +20 items are added. setRef - a callback
 * to get ref of an element to observe.
 */
const useInfiniteScroll = <T extends {}>(
  allItems: T[],
  observerOptions?: IntersectionObserverInit
): ReturnType<T> => {
  const [stateItems, setStateItems] = useState<T[]>([]);
  const [element, setElement] = useState<Element | null>(null);

  const itemsRef = useRef(allItems);

  const setRef: SetRefType = useCallback(node => {
    if (node) {
      setElement(node);
    }
  }, []);

  const listener = (entries: any) => {
    const [first] = entries;

    if (first.isIntersecting) {
      setStateItems(prevItems => {
        const prevLength = prevItems.length;
        const nextItems = itemsRef.current.slice(0, prevLength + 20);

        return nextItems.length !== prevLength ? nextItems : prevItems;
      });
    }
  };

  const observer = useRef(new IntersectionObserver(listener, observerOptions));

  useEffect(() => {
    itemsRef.current = allItems;
    setStateItems(allItems.slice(0, 20));
  }, [allItems, element]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  const nextItems = element ? stateItems : [];
  return [nextItems, setRef];
};

export default useInfiniteScroll;
