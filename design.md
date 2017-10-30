```html
<YHeader>
</YHeader>
<XHeader>
</XHeader>
<Body>
</Body>
```

```js
data () {
  return {
    scroll: {
      x: 0, // pixel
      y: 0  // pixel
    },
    zoom: {}, // wanna make it "browser zoom friendly" instead of having its own zoom level
    channels: [
      {
        id: '',
        name: '',
        description: ''
      }
    ],
    offsetTime: 0,
    days: [
      {
        id: '',
        name: '',
        description: '',
        beginTime: '',
        duration: ''
      }
    ],
    programs: [
      {
        id: '',
        name: '',
        description: '',
        channel: '',
        beginTime: '',
        duration: ''
      }
    ]
  }
}
```
