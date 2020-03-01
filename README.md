Infinite Scroll React Hook
=======================

Infinitely scroll content by gradually adding items using a React custom hook.
Current `useInfiniteScroll` React custom hook uses [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Installation

```
npm install infinite-scroll-react-hook --save
```
or

```
yarn add infinite-scroll-react-hook
```

## How to use

```js
import useInfiniteScroll from 'infinite-scroll-react-hook';

const Component = () => {

  const [items, setRef] = useInfiniteScroll(allItems, observerOptions);

  return (<div>
            {items}
            <div ref={setRef}/>
         </div>);
}
```

### Props

#### allItems: any[]
A required array with items to gradually provide while scrolling.

#### observerOptions?: IntersectionObserverInit
An optional object argument that is used as `options` for [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver).

