const mapImage=document.querySelector('.map__inner');
const wrapper=document.querySelector(".map");
const headerElem=document.getElementById('header');
const footerElem=document.getElementById('footer');
const zoomInBtn=document.querySelector(".map__controls-item.plus");
const zoomOutBtn=document.querySelector(".map__controls-item.minus");

let prevWidth=mapImage.clientWidth;


let topIndent = 0;
let leftIndent = 0;

const calculateCoords = (e, elem) => {
    var box = elem.getBoundingClientRect();
    topIndent = e.pageY - box.top;
    leftIndent = e.pageX - box.left;
    console.log(topIndent,leftIndent)
}

const moveAt = (e) => {
    if (mapImage.style.position !== "absolute") {mapImage.style.position = "absolute";}
    mapImage.style.left = e.pageX - leftIndent + 'px';
    if (e.pageX >= wrapper.offsetWidth) {
        stopDrag();
    } else if (e.pageX <= 0) {
        stopDrag();
    }
    mapImage.style.top = e.pageY - (80 - pageYOffset) - topIndent + 'px';
}

const stopDrag = () => {
    document.removeEventListener('mousemove', moveAt);
    mapImage.removeEventListener('mouseup', stopDrag);
}

mapImage.addEventListener('mousedown', (e) => {

    if (mapImage.offsetWidth <= wrapper.offsetWidth && mapImage.offsetHeight <= wrapper.offsetHeight) {
        return;
    }

    calculateCoords(e, mapImage);
    moveAt(e);
    document.addEventListener('mousemove', moveAt);
    mapImage.addEventListener('mouseup', stopDrag);
});

headerElem.addEventListener('mouseenter', stopDrag);
footerElem.addEventListener('mouseenter', stopDrag);

zoomInBtn.addEventListener('click',()=>{
    console.log('click plus ')
    if(mapImage.clientWidth< (wrapper.offsetWidth-17) * 2) {
        mapImage.style.width = `${mapImage.clientWidth * 1.15}px`;
    }
});

zoomOutBtn.addEventListener('click',()=>{
    console.log("click minus")
    if(mapImage.clientWidth>=wrapper.offsetWidth) {
        mapImage.style.width = `${mapImage.clientWidth / 1.15}px`;
        if(mapImage.clientWidth<=wrapper.offsetWidth){
            mapImage.style.width=`${prevWidth}px`;
            mapImage.style.top='';
            mapImage.style.left='';
            console.log("zoom out");
        }
    }
});


mapImage.ondragstart= ()=> {
    return false;
};



