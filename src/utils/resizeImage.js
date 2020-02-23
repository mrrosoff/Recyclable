const resizeImage = (uri, maxDim, callback) => {
    var reader = new FileReader();
    reader.readAsDataURL(new Blob([uri]));
    reader.onloadend = function (e) {
        const contents = e.target.result;
        const memoryImg = document.createElement('img');
        memoryImg.src = contents;
        const width = memoryImg.width;
        const height = memoryImg.height;

        const newScale = maxDim / Math.min(width, height);
        const newWidth = parseInt(width * newScale);
        const newHeight = parseInt(height * newScale);

        var sourceImage = new Image();

        sourceImage.onload = function() {
            // Create a canvas with the desired dimensions
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;

            // Scale and draw the source image to the canvas
            canvas.getContext("2d").drawImage(sourceImage, 0, 0, newWidth, newHeight);

            // Convert the canvas to a data URL in PNG format
            callback(canvas.toDataURL());
        }

        sourceImage.src = uri;
    }
};

export default resizeImage;