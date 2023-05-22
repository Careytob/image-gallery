let galleryImgEl = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImgEl){
    galleryImgEl.forEach(function(image, index){
        image.onclick = function(){
            let getElCss = window.getComputedStyle(image);
            let getFullImgUrl = getElCss.getPropertyValue("background-image");
            let getImgUrlPosition = getFullImgUrl.split('/image/thumbs/');
            let newImgUrl = getImgUrlPosition[1].replace('")',  '');
            
            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImgWindow = document.createElement('div');
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute('class', 'img-window');
            newImgWindow.setAttribute('onclick', 'closeImg()');
            
            let newImgEl = document.createElement('img');
            newImgWindow.appendChild(newImgEl);
            newImgEl.setAttribute('src', 'image/' + newImgUrl);
            newImgEl.setAttribute('id', 'current-img');

            newImgEl.onload = function(){
            let imgWidth = this.width;
            let calcImgToEdge = ((windowWidth - imgWidth ) / 2) - 80;

            let newNextBtn = document.createElement('a');
            let btnNextText = document.createTextNode('Next');
            newNextBtn.appendChild(btnNextText); 
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute('class', 'img-btn-next');
            newNextBtn.setAttribute('onclick', 'changeImg(1)');
            newNextBtn.style.cssText = " right: " + calcImgToEdge + "px;"


            let newPrevBtn = document.createElement('a');
            let btnPrevText = document.createTextNode('Prev');
            newPrevBtn.appendChild(btnPrevText);
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute('class', 'img-btn-prev');
            newPrevBtn.setAttribute('onclick', 'changeImg(0)');
            newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;"

            }
            
        } 
    }); 
}

function closeImg(){
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir){
    document.querySelector("#current-img").remove();
    let getImgWindow = document.querySelector('.img-window');
    let newImgEl = document.createElement ('img');
    getImgWindow.appendChild(newImgEl);

    let calcNewImg;
    if(changeDir === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImgEl.length){
            calcNewImg = 1;
        }
    }

else if(changeDir === 0){
    calcNewImg = getLatestOpenedImg - 1;
    if(calcNewImg < 1){
        calcNewImg = galleryImgEl.length;
    }
}

newImgEl.setAttribute('src', 'image/img' + calcNewImg + '.jpg');
newImgEl.setAttribute('id', 'current-img');

getLatestOpenedImg = calcNewImg;

newImgEl.onload = function(){
    let imgWidth = this.width;
    let calcImgToEdge = ((windowWidth - imgWidth ) / 2) - 80;

    let nextBtn = document.querySelector('.img-btn-next');
    nextBtn.style.cssText = " right: " + calcImgToEdge + "px;"

    let prevBtn = document.querySelector('.img-btn-prev');
    prevBtn.style.cssText = " left: " + calcImgToEdge + "px;"

}
    
}
