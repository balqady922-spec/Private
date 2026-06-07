const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else {
            if (filePath.endsWith('.png')) {
                results.push(filePath);
            }
        }
    });
    return results;
}

async function fix() {
    const files = walk('android/app/src/main/res');
    let count = 0;
    for (const file of files) {
        try {
            const img = await loadImage(file);
            const canvas = createCanvas(img.width, img.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(file, buffer);
            count++;
        } catch(e) {
            console.error('Failed to process', file, e.message);
        }
    }
    console.log(`Re-encoded ${count} PNG files via node-canvas.`);
}

fix();
