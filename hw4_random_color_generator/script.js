const oneColorBtn = document.getElementById('oneColorBtn');
const paletteBtn = document.getElementById('paletteBtn');
const generateBtn = document.getElementById('generateBtn');
const colorBlocks = document.querySelector('.color-blocks');

const generateColor = () => {
    let rgb = [];
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    rgb.push(red);
    rgb.push(green);
    rgb.push(blue);
    return rgb;
};

const rgbString = (arr) => {
    let color = 'rgb(' + arr[0].toString() + ', ' + arr[1].toString() + ', ' + arr[2].toString() + ')';
    return color;
};


const componentToHex = (a) => {
  var hex = a.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = (arr) => {
    let hex = '#' + componentToHex(arr[0]) + componentToHex(arr[1]) + componentToHex(arr[2]);
    return hex;
};

const addColor = () => {
    const color = generateColor();
    const colorString = rgbString(color);
    const div = document.createElement('div');
    div.className = 'color-block';
    div.innerHTML = `
    <div class="color">
        <p>rgb(${color[0]}, ${color[1]}, ${color[2]})</p>
        <p>${rgbToHex(color)}</p>
    </div>
    `
    div.style.backgroundColor = colorString;
    colorBlocks.appendChild(div);
};

generateBtn.addEventListener('click', () => {
    colorBlocks.innerHTML = '';
    if (oneColorBtn.checked) {
        addColor();
    } else {
        for (let i = 0; i < 5; i++){
            addColor();
        }
    };
});