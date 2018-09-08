# hackollektiv

**Distribute src/client/output.js**

This Script will browserify und uglify src/client/hackollektiv.js. Afterwards public/js/output.js will be replaced.
```javascript
npm run client
```

**Compile SASS**

This script will compile scss/hackollektiv.scss to public/css/styles.css
```javascript
npm run dist:scss
```

**Compile SASS files on change**

If this Script is started, every change in any file in the scss folder will immediately start the compile script.
```javascript
npm run watch:scss
```

**Distribute Components**

Every Folder in src/components will be mapped to a html template. Afterwards the html components will be stored in public/components.
```javascript
npm run dist:components
```

**Distribute Components on change**

If this Script is started, every change in any file in the src/components folder will immediately start the distribute component script.
```javascript
npm run watch:components
```
