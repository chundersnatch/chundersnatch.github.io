function svgTemplateWrapper(itemToWrap) {
    const svgTemplateHead=`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" width="100%" viewBox="0 0 100 100"  preserveAspectRatio="none"><text x="50%" y="50%">`;
    const svgTemplateText=`<tspan dx="0" dy="0" width="64" height="64" font-size="250%" text-anchor="middle" fill="white">${itemToWrap}</tspan>`;
    const svgTemplateEnd=`</text></svg>`;
    const svgTemplate=`${svgTemplateHead}${svgTemplateText}${svgTemplateEnd}`;
}

let svg = svgTemplate; //<svg> element string

function svgToPng(svg, callback) {
    const url = getSvgUrl(svg);
    svgUrlToPng(url, (imgData) => {
        callback(imgData);
        URL.revokeObjectURL(url);
    });
}

function getSvgUrl(svg) {
    return URL.createObjectURL(new Blob([svg], {
        type: 'image/svg+xml'
    }));
}

let imgListStr = "";

function svgUrlToPng(svgUrl, callback) {
    const svgImage = document.createElement('img');
    document.getElementById("emojiCanvasOutContainer").appendChild(svgImage);
    svgImage.src = svgUrl;
    imgListStr = `${imgListStr}${svgTemplateText}`;
}

svgToPng(svg);

const link = document.createElement('a');
link.hidden=true;
link.href=getPngUrl(getSvgUrl(svg));
link.download;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);


let getSvgUrl = new Blob([svg], {type: 'image/svg+xml'});
let b64str = DOMURL.createObjectURL(svgData);

let test = new Blob([svg,svg], {})
/*
 Note:
 SVG file upload is initially read as plaintext
 The Blob object created is then encoded as a Base64 String
*/

const canvas = document.getElementById('mycanvas');
const img = canvas.toDataURL('image/png');

/* Embed in HTML <img> Element */ 
const loadImage = (url) => new Promise((resolve, reject) => {
   const img = new Image(); // alt: document.createElement('img')
   img.addEventListener('load', () => resolve(img));
   img.addEventListener('error', (err) => reject(err));
   img.src = url;
});

let _img = await loadImage(b64str);
let imgH=_img.naturalHeight; // original file height
let imgW=_img.naturalWidth; // original file width 

/* Draw Image on HTML5 Canvas

Note:
Ensure that the correct scaling is used
or low resolution images occurs.
*/

const scale = window.devicePixelRatio*2;

/* Instantiate canvas */
let _canvas = document.createElement('canvas');
_canvas.width=imgW;
_canvas.height=imgH;
let _ctx = _canvas.getContext('2d');
_canvas['style']['width'] = `${Math.round(imgW/scale)}px`;
_canvas['style']['height'] = `${Math.round(imgH/scale)}px`;
_canvas['style']['margin'] = '0';
_canvas['style']['padding'] = '0';
_ctx.scale(scale, scale);
_ctx.drawImage(_img, 0, 0, Math.round(imgW/scale), Math.round(imgH/scale));
 
/* Note: _canvas['style']['height'] is NOT equivalent to _canvas.height */
 
 
// Step 3. Generate Download Link
let dwnLink=document.createElement('a');     

// Note: fileName = original .svg filename dwnLink.download=fileName.substr(0,fileName.lastIndexOf('.'))+'.png';
dwnLink.href=_canvas.toDataURL();
dwnLink.innerText='🔗 Link';
document.getElementById('downloadLink').innerHTML=dwnLink.outerHTML;








// resirch; //

const blob = new Blob([svg], {type: 'image/svg+xml'});
const url = URL.createObjectURL(blob);
const image = document.createElement('img');
image.addEventListener('load', () => URL.revokeObjectURL(url), {once: true});
image.src = url;

// resirch 2; //

const $clonedSvgElement = $svgElement.cloneNode(true) as SVGElement;

// make any tweaks to colors (such as replacing css variables with calculated values)
const $background = $svgElement.querySelector('[data-background]') as SVGGraphicsElement;
const $clonedBackground = $clonedSvgElement.querySelector('[data-background]') as SVGGraphicsElement;
$clonedBackground.setAttribute('fill', getComputedStyle($background).fill);

const $textElements = $svgElement.querySelectorAll('text');
const $clonedTextElements = $clonedSvgElement.querySelectorAll('text');
for (let i = 0; i < $clonedTextElements.length; i++) {
const $textElement = $textElements[i];
const $clonedTextElement = $clonedTextElements[i];
const computedStyles = getComputedStyle($textElement);
const attributes = {
  color: computedStyles.color,
  fill: computedStyles.color,
  'font-family': 'SharpSansNo2',
  'font-size': computedStyles.fontSize,
  'font-weight': computedStyles.fontWeight,
  'letter-spacing': computedStyles.letterSpacing
};
for (const key in attributes) {
  const value = key ? attributes[key] : '';
  if (value) {
    $clonedTextElement.setAttribute(key, value);
  }
}
}

// export current state to HTML
const data = new XMLSerializer().serializeToString($clonedSvgElement);

// generate blob with base64 data of image
const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
const URL = window.URL || window.webkitURL || window;
const blobURL = URL.createObjectURL(blob);

// generate image with canvas data (to convert to PNG and other formats)
const image = new Image();
document.body.appendChild(image);
const canvas = document.createElement('canvas');
canvas.width = this.currentPoster.width * scale;
canvas.height = this.currentPoster.height * scale;
const context = canvas.getContext('2d');
let png: string;

// wait for image to load
image.onload = () => {
if (context) {
  context.drawImage(image, 0, 0, this.currentPoster.width * scale, this.currentPoster.height * scale);
  png = canvas.toDataURL();

  // trigger download
  const download = function (href, name) {
    const link = document.createElement('a');
    link.download = name;
    link.style.opacity = '0';
    document.body.append(link);
    link.href = href;
    link.click();
    link.remove();
  };
  download(png, 'sddw-poster.png');
}
};
image.src = blobURL;