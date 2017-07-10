# primary-color
get image cover primary color js plugin

### How To Use ?
```javascript
  <script src="../lib/getPrimaryColor.js"></script>
  ...
  const primary = new primaryColor()
  primary.getPrimaryColor({
    cover: "./demo.jpg",        //your cover
    success(primaryColor) {
        console.log(primaryColor);
        document.body.style.backgroundColor = primaryColor
    },
    error(err) {
        console.log(err);
    }
})
```
