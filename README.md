React Infinite Loader Hook
=======================

Infinitely load data and content using a React custom hook.

## Installation

```
npm install infinite-loader-react-hook --save
```
```
yarn add infinite-loader-react-hook
```

## How to use

```js
import useInfiniteLoader from 'infinite-loader-react-hook';

const Component = () => {

  const [items, setRef] = useInfiniteLoader(allItems: any[], threshold?: number);

  return <div ref={setRef}>
          {items}
         </div>
}
```
