# TODO

your doing too much to the emoji element within the `svgTemplate` strings.
All that needs done is to 'stack' the emoji's (as utf-8 characters) in the 'middle' of a string made of strings.

for example:

```javascript
const svgTemplateHead = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"><text x="50%" y="75%" font-size="250%" text-anchor="middle" fill="white">`
let svgTemplateText = emojiFromArray;
const svtTemplateEnd = '</text></svg>`;
```

this way you are adding each `emojiFromArray` emoji in the middle, in a cheaper way.
