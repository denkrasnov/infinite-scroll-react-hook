import { renderHook, act } from "@testing-library/react";

import useInfiniteScroll from "..";

describe("useInfiniteScroll", () => {
  const itemsMock = [
    { name: "name_1" },
    { name: "name_2" },
    { name: "name_3" },
    { name: "name_4" },
    { name: "name_5" },
    "6",
    "7",
    "8",
    "9",
    "10",
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    "__21__",
    "__22__"
  ];

  const windowIntersectionObserver = window.IntersectionObserver;
  const observe = jest.fn();
  const unobserve = jest.fn();

  beforeAll(() => {
    (window as any).IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve
    }));
  });

  afterAll(() => {
    window.IntersectionObserver = windowIntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("useInfiniteScroll when rendered", () => {
    it("should return correct data when element exists", () => {
      const { result } = renderHook(() => useInfiniteScroll(itemsMock));
      const html = document.createElement("div");

      act(() => {
        result.current[1](html);
      });

      expect(result.current).toEqual([
        itemsMock.slice(0, 20),
        expect.any(Function)
      ]);
    });

    it("should return correct data when items is empty array", () => {
      const items: any[] = [];
      const { result } = renderHook(() => useInfiniteScroll(items));
      const html = document.createElement("div");

      act(() => {
        result.current[1](html);
      });

      expect(result.current).toEqual([items, expect.any(Function)]);
    });

    it("should return correct data when parentElement does not exist", () => {
      const { result } = renderHook(() => useInfiniteScroll(itemsMock));

      act(() => {
        result.current[1](null);
      });

      expect(result.current).toEqual([[], expect.any(Function)]);
    });
  });

  describe("observer", () => {
    it("creates an observer on the element ref", () => {
      const { result } = renderHook(() => useInfiniteScroll(itemsMock));
      const html = document.createElement("div");

      act(() => {
        result.current[1](html);
      });

      expect(observe).toBeCalledWith(html);
    });

    it("unobserve when unmount", () => {
      const { result, unmount } = renderHook(() =>
        useInfiniteScroll(itemsMock)
      );
      const html = document.createElement("div");

      act(() => {
        result.current[1](html);
      });

      unmount();

      expect(unobserve).toHaveBeenCalled();
    });
  });

  describe("when the element is in view", () => {
    it("should return more items", () => {
      const { result } = renderHook(() => useInfiniteScroll(itemsMock));
      const html = document.createElement("div");
      const mockEntry = { isIntersecting: true };

      act(() => {
        result.current[1](html);
      });

      expect(result.current).toEqual([
        itemsMock.slice(0, 20),
        expect.any(Function)
      ]);

      const [
        [observerCallback]
      ] = (window.IntersectionObserver as jest.Mock).mock.calls;

      act(() => {
        observerCallback([mockEntry]);
      });

      expect(result.current).toEqual([itemsMock, expect.any(Function)]);
    });

    it("should return correct data when no items to add", () => {
      const items = itemsMock.slice(0, 20);
      const mockEntry = { isIntersecting: true };
      const { result } = renderHook(() => useInfiniteScroll(items));
      const html = document.createElement("div");

      act(() => {
        result.current[1](html);
      });
      expect(result.current).toEqual([items, expect.any(Function)]);

      const [
        [observerCallback]
      ] = (window.IntersectionObserver as jest.Mock).mock.calls;

      act(() => {
        observerCallback([mockEntry]);
      });

      expect(result.current).toEqual([items, expect.any(Function)]);
    });
  });

  describe("when the element is not in view", () => {
    it("should return correct data", () => {
      const mockEntry = { isIntersecting: false };
      const { result } = renderHook(() => useInfiniteScroll(itemsMock));
      const html = document.createElement("div");

      act(() => {
        result.current[1](html);
      });

      const [
        [observerCallback]
      ] = (window.IntersectionObserver as jest.Mock).mock.calls;

      act(() => {
        observerCallback([mockEntry]);
      });

      expect(result.current).toEqual([
        itemsMock.slice(0, 20),
        expect.any(Function)
      ]);
    });
  });
});
