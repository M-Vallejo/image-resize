'use strict';

window.onload = function() {
    let crop = document.getElementById("crop-square");
    let cropContainer = document.getElementById("modal-container");
    let cropSquare = document.getElementById("crop-square");
    let innerCrop = document.getElementById("crop-inner-square");
    let ab = document.getElementById("ab");

    let mouseclick = false;
    let mouseResize = false;

    innerCrop.onmousedown = function() {
        mouseclick = true;
    }

    innerCrop.onmouseup = function() {
        mouseclick = false;
    }

    innerCrop.onmousemove = function(e) {
      /*
        if (mouseResize) {
            Resize(e);
        }
        */
    }

    cropSquare.onmousedown = function(e) {
        mouseResize = isInBorder(e);
    }

    cropSquare.onmouseup = function() {
         mouseResize = false;
    }

    cropSquare.onmousemove = function(e) {
        
        let border = GetBorder(cropSquare);

        let cursor = "default";

        if(e.offsetX < 0){
            cursor = "ew-resize";
        }
        else if (e.offsetX > (cropSquare.offsetWidth - (border.left + border.right)) ) {
            cursor = "ew-resize";
        }

        if(e.offsetY < 0){
            cursor = "ns-resize";
        }
        else if (e.offsetY > (cropSquare.offsetHeight - (border.top + border.bottom)) ) {
            cursor = "ns-resize";
        }

        cropSquare.style.cursor = cursor;
    }

    cropContainer.onmouseup = function(e) {
        mouseclick = false;
        mouseResize = false;
    }

    cropContainer.onmousemove = function(event){
        if (mouseclick) {
            let parent = ab.getBoundingClientRect();

            let x = event.clientX - parent.x;
            let y = event.clientY - parent.y;

            if (x >= 0) {
                if ((x + crop.offsetWidth) > parent.width) {
                    x = parent.width - crop.offsetWidth;
                }
            }
            else {
                x = 0;
            }

            if (y >= 0){
                if ((y + crop.offsetHeight) > parent.height) {
                    y = parent.height - crop.offsetHeight;
                }
            } else {
                y = 0;
            }

            crop.style.left = x + 'px';
            crop.style.top = y + 'px';
        } else if (mouseResize) {
            Resize(event);
        }
    }

    function Resize(e) {
        let border = GetBorder(cropSquare);
            let xSize = event.movementX;

            if(e.offsetX < 0){
                let left = crop.offsetLeft - xSize;
                let width = cropSquare.offsetWidth + xSize;

                cropSquare.style.left = left + 'px';
                cropSquare.style.width = width + 'px';
            }
            else if (e.offsetX > (cropSquare.offsetWidth - (border.left + border.right)) ) {
                let width = cropSquare.offsetWidth + xSize;
                cropSquare.style.width = width + 'px';
            }

            let ySize = event.movementY;

            if(e.offsetY < 0) {
                let top = cropSquare.offsetTop - ySize;
                let height = cropSquare.offsetHeight + ySize;

                cropSquare.style.top = top + 'px';
                cropSquare.style.height = height + 'px';
            }
            else if (e.offsetY > (cropSquare.offsetHeight - (border.top + border.bottom)) ) {
                let height = cropSquare.offsetHeight + ySize;
                cropSquare.style.height = height + 'px';
            }
    }

    function isInBorder(e) {
        let border = GetBorder(cropSquare);
        let result = false;

        if(e.offsetX < 0){
            result = true;
        }
        else if (e.offsetX > (cropSquare.offsetWidth - (border.left + border.right)) ) {
            result = true;
        } else if (e.offsetY < 0) {
            result = true;
        }
        else if (e.offsetY > (cropSquare.offsetHeight - (border.top + border.bottom)) ) {
            result = true;
        }

        return result;
    }

    function GetBorder(elem) {
        let el = getComputedStyle(elem,null);

        let BL = parseInt(el.getPropertyValue('border-left-width').replace("px",""));
        let BR = parseInt(el.getPropertyValue('border-right-width').replace("px",""));
        let BT = parseInt(el.getPropertyValue('border-top-width').replace("px",""));
        let BB = parseInt(el.getPropertyValue('border-bottom-width').replace("px",""));
        return {
            left: BL,
            right: BR,
            top: BT,
            bottom: BB
        };
    }
}