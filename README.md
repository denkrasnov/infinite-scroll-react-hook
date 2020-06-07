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

  return (
          <div>
            {items}
            <div ref={setRef}/>
          </div>
         );
}
```
`useInfiniteScroll` - is configuread to add +20 items from a provided `allItems` every time the target element intercets the document's viewport or parent element (if provided within `observerOptions` prop);

`setRef` - should get the ref of a target element which will be observed during scrolling. If the target element enters the document's viewport or a parent element (if provided within `observerOptions` prop) then +20 items are added to be displayed.

You can adjust when to start adding +20 additional items by manipulating the target's element position. For example you want to add +20 items during scroll when `200px` left before the end of the items list then you can add custom styles to the target element to achive this: 
`<div ref={setRef} style="bottom: 200px; position: relative " />`

### Props

#### allItems: any[]
A required array with items to gradually provide while scrolling.

#### observerOptions?: IntersectionObserverInit
An optional object argument that is used as `options` for [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver).

