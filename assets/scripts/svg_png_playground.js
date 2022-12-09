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