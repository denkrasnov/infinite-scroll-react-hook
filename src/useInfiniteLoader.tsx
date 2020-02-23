import { useState, useCallback, useEffect } from "react";
import { fromEvent } from "rxjs";
import { throttleTime } from "rxjs/operators";

export type SetRefType = (node: Element | null) => void;

export type ReturnType<T> = [T[], SetRefType];

const useInfiniteLoader = <T extends {}>(
  items: T[],
  threshold = 300
): ReturnType<T> => {
  const [stateItems, setStateItems] = useState<T[]>([]);
  const [element, setElement] = useState<Element | null>(null);

  const setRef: SetRefType = useCallback(node => {
    if (node) {
      setElement(node);
    }
  }, []);

  const listener = useCallback(
    (event: Event) => {
      const targetElement = event.target as Element;

      const position = targetElement.getBoundingClientRect();
      const scrolledY = targetElement.scrollTop + position.height + threshold;
      const targetScrollHeight = targetElement.scrollHeight;

      const isAddMore = scrolledY >= targetScrollHeight;
      if (isAddMore) {
        setStateItems(prevItems => {
          const prevLength = prevItems.length;
          const nextItems = items.slice(0, prevLength + 10);

          return nextItems.length !== prevLength ? nextItems : prevItems;
        });
      }
    },
    [items]
  );

  useEffect(() => {
    if (element) {
      setStateItems(items.slice(0, 10));
      const scroll$ = fromEvent(element, "scroll", {
        passive: true
      })
        .pipe(throttleTime(50))
        .subscribe(listener);

      return () => {
        scroll$.unsubscribe();
      };
    }
    return undefined;
  }, [element, items, listener]);

  const nextItems = element ? stateItems : items;
  return [nextItems, setRef];
};

export default useInfiniteLoader;
