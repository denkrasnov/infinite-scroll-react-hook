import { renderHook, act } from "@testing-library/react-hooks";

import useInfiniteLoader from "..";

const THRESHOLD = 300;

describe("useInfiniteLoader", () => {
  const itemsMock = [
    { name: "name_1" },
    { name: "name_2" },
    { name: "name_3" },
    { name: "name_4" },
    { name: "name_5" },
    { name: "name_6" },
    { name: "name_7" },
    { name: "name_8" },
    { name: "name_9" },
    { name: "name_10" },
    { name: "name_11" },
    { name: "name_12" }
  ];
  describe("useInfiniteLoader return", () => {
    it("should return correct data when parentElement exists", async () => {
      const { result, unmount } = renderHook(() =>
        useInfiniteLoader(itemsMock)
      );
      const html = document.createElement("div");

      act(() => {
        result.current[1](html);
      });

      expect(result.current).toEqual([
        itemsMock.slice(0, 10),
        expect.any(Function)
      ]);

      unmount();
    });

    it("should return correct data when threshold provided in args", () => {
      const { result } = renderHook(() => useInfiniteLoader(itemsMock, 300));

      expect(result.current).toEqual([itemsMock, expect.any(Function)]);
    });

    it("should return correct data when parentElement does not exist", () => {
      const { result } = renderHook(() => useInfiniteLoader(itemsMock));

      act(() => {
        result.current[1](null);
      });

      expect(result.current).toEqual([itemsMock, expect.any(Function)]);
    });
  });

  describe("listener()", () => {
    it("should return more items when scroll", () => {
      const { result } = renderHook(() => useInfiniteLoader(itemsMock));
      const html = document.createElement("div");

      act(() => {
        result.current[1](html);
        const customEvent = new Event("scroll");
        html.dispatchEvent(customEvent);
      });

      expect(result.current).toEqual([
        itemsMock.slice(0, 10),
        expect.any(Function)
      ]);

      act(() => {
        const customEvent = new Event("scroll");
        html.dispatchEvent(customEvent);
      });

      expect(result.current).toEqual([itemsMock, expect.any(Function)]);
    });

    it("should return correct data when isAddMore = false", () => {
      const { result } = renderHook(() => useInfiniteLoader(itemsMock));
      const html = document.createElement("div");
      html.scrollTop = -THRESHOLD - 1;

      act(() => {
        result.current[1](html);
      });

      expect(result.current).toEqual([
        itemsMock.slice(0, 10),
        expect.any(Function)
      ]);

      act(() => {
        const customEvent = new Event("scroll");
        html.dispatchEvent(customEvent);
      });

      expect(result.current).toEqual([
        itemsMock.slice(0, 10),
        expect.any(Function)
      ]);
    });

    it("should return correct data when no items to add", () => {
      const items = itemsMock.slice(0, 10);
      const { result } = renderHook(() => useInfiniteLoader(items));
      const html = document.createElement("div");
      html.scrollTop = -THRESHOLD;

      act(() => {
        result.current[1](html);
      });

      expect(result.current).toEqual([items, expect.any(Function)]);

      act(() => {
        const customEvent = new Event("scroll");
        html.dispatchEvent(customEvent);
      });

      expect(result.current).toEqual([items, expect.any(Function)]);
    });
  });
});
