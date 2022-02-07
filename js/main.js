const backTop = document.getElementById("backtotop");

/*스크롤이 맨 위로 올라가면 백탑 버튼이 사라짐*/
const checkScoll = () => {
    /*웹 페이지가 수직으로 얼마나 스크롤 되었는지 확인하는 값*/

    let pageYOffset = window.pageYOffset;

    if (pageYOffset !== 0) {
        backTop.classList.add("show");
    }
    else {
        backTop.classList.remove("show");
    }

}

/*백탑 버튼 클릭스 맨 위로 이동*/
const moveBackTop = () => {
    if (window.pageYOffset > 0) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}

window.addEventListener("scroll", checkScoll);
backTop.addEventListener("click", moveBackTop);

/*--------------------------------------------------------------------*/
const slidePrevList = document.getElementsByClassName("slide-prev");       //<버튼(다수여서) 클래스 이름으로 가져옴

function transformNext(event) {
    const slideNext = event.target;                                         // > 버튼 클릭시 이벤트 요소 발생                
    const slidePrev = slideNext.previousElementSibling;                     //이전 형제 요소 선택

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute("data-position");
    const liList = classList.getElementsByTagName("li");

    //하나의 카드라도 왼쪽으로 이동했다면, 오른쪽으로 갈 수 있음
    if (Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 260;

        //왼쪽에 있던 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈수 있으므로 prev 버튼 비활성화
        slidePrev.style.color = "#2f3059";                                  //버튼 활성화(색변경)
        slidePrev.classList.add("slide-prev-hover");
        slidePrev.addEventListener("click", transformPrev);

        //
        if (Number(activeLi) === 0) {
            slideNext.style.color = "#cfd8dc";                                  //버튼 활성화(색변경)
            slideNext.classList.remove("slide-next-hover");
            slideNext.removeEventListener("click", transformNext);
        }
    }

    classList.style.transition = "transform 1s";
    classList.style.transform = "translateX(" + String(activeLi) + "px)";   //실제 이동
    classList.setAttribute("data-position", activeLi);
}

//카드 리스트를 왼쪽으로 한칸씩 이동
//매개변수에 event : 클릭 이벤트를 통해서 이벤트 발생시 어떤 이벤트가 발생하였는지, 해당이벤트가 발생한 요소가 무엇인지를 이벤트 객체를 인자로 넣어줌
function transformPrev(event) {
    const slidePrev = event.target;                     //해당 이벤트가 발생한 이벤트 요소를 가져올 수 있다.(왼쪽< 버튼 요소를 가져온다.)
    const slideNext = slidePrev.nextElementSibling;     //<버튼을 통해 다음 요소인 >버튼 가져옴

    //ul 태그 선택
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute("data-position");  //.getAttribute()는 선택한 요소(element)의 특정 속성(attribute)의 값을 가져옵
    const liList = classList.getElementsByTagName("li");

    /* classList.clientWidth 는 ul 태그의 실질적인 너비
    *  liList.length * 260에서 260은 각 li 요소의 실질 너비(margin 포함)
    *  active는 data-position에 있는 현재 위치
    * 즉, liList.lenth * 260 + Number(active)는 현재 위치부터 오른쪽에 나열되어야 하는 나머지 카드의 너비
    
    /* class.clinetWidth < (list.length * 260 + Number(active)) 의미는 
    * 오른쪽으로 나열된 카드들이 넘친 상태이므로, 왼쪽으로 이동이 가능함
    **/

    if (classList.clientWidth < (liList.length * 260 + Number(activeLi))) {    //넘쳐있는 상태(왼쪽으로 갈수 있는 상태)
        // 위치를 왼쪽으로 260 이동(-260px)
        activeLi = Number(activeLi) - 260;                                  //260만큼 위치 이동

        if (classList.clientWidth > (liList.length * 260 + Number(activeLi))) {
            slidePrev.style.color = "#cfd8dc";                                  //버튼 활성화(색변경)
            slidePrev.classList.remove("slide-prev-hover");
            slidePrev.removeEventListener("click", transformPrev);
            slideNext.addEventListener("click", transformNext);
        }

        slideNext.style.color = "#2f3059";                                  //버튼 활성화(색변경)
        slideNext.classList.add("slide-next-hover");


    }

    classList.style.transition = "transform 1s";
    classList.style.transform = "translateX(" + String(activeLi) + "px)";   //실제 이동
    classList.setAttribute("data-position", activeLi);

}

for (let i = 0; i < slidePrevList.length; i++) {
    //ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName("li");

    /*카드가 ul 태그 너비보다 넘치면 왼쪽(prev) 버튼은 활성화하고, 왼쪽(next)는 현재 맨 첫카드 위치이므로 비활성화*/
    if (classList.clientWidth < (liList.length * 260)) {
        slidePrevList[i].classList.add("slide-prev-hover");
        slidePrevList[i].addEventListener("click", transformPrev);      // < 버튼 요소 클릭시 이벤트 발생
    } else {
        /* 태그 삭제시 부모 요소에서 removeChild를통해 삭제해야함
            따라서, 1. 먼저 부모요소를 찾아서
                    2. 부모 요소의 자식 요소로 있는 prev와 next 삭제함
        */
        const arrowContainer = slidePrevList[i].parentElement;                      //
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);            // > 버튼 삭제
        arrowContainer.removeChild(slidePrevList[i]);                               // < 버튼 삭제
    }
}

/*--------------------------------------------------------------------*/
let touchstartX;
let currentClassList;
let currentImg;
let currentActiveLi;
let nowActiveLi;
let mouseStart;

function processTouchMove(event) {
    event.preventDefault();

    let currentX = event.clientX || event.touches[0].screenX;;           //이동한 x좌표
    nowActiveLi = Number(currentActiveLi) + (Number(currentX) - Number(touchstartX))    //현재 이동해야할 값은 원래 위치에서 (마우스 끝 위치- 마우스 시작) 위치 더해줌

    currentClassList.style.transition = 'transform 0s linear';
    currentClassList.style.transform = 'translateX(' + String(nowActiveLi) + 'px)';

}

function processTouchStart(event) {
    mouseStart = true;                      //터치가 일어나면 드래그가 시작되었다는걸 저장(true로 변경)

    //preventDefault() : 해당 요소의 고유의 동작을 중단시키는 함수(이미지만 드래그로 이동하는 고유 동작 중단)
    event.preventDefault();

    touchstartX = event.clientX || event.touches[0].screenX;
    currentImg = event.target;

    //드래그 처리를 위해, 드래그 중(mousemove), 드래그가 끝났을 때(mouseup) 이벤트를 걸어줌
    currentImg.addEventListener("mousemove", processTouchMove);         //드래그 하는 순간 mousemove 발생
    currentImg.addEventListener("mouseup", processTouchEnd);            //마우스를 떼는 순간 mouseup 발생

    currentImg.addEventListener('touchmove', processTouchMove);
    currentImg.addEventListener('touchend', processTouchEnd);


    currentClassList = currentImg.parentElement.parentElement;
    currentActiveLi = currentClassList.getAttribute("data-position");

}

function processTouchEnd(event) {
    event.preventDefault();

    if (mouseStart === true) {
        currentImg.removeEventListener("mousemove", processTouchMove);           //마우스 오버 중지
        currentImg.removeEventListener("mouseup", processTouchEnd);

        currentImg.removeEventListener('touchmove', processTouchMove);
        currentImg.removeEventListener('touchend', processTouchEnd);

        //맨 처음 카드가 맨 앞으로 배치되도록 초기 상태로 이동
        currentClassList.style.transition = "transform 1s ease";
        currentClassList.style.transform = "translateX(0px)";                   //카드가 맨 앞으로 이동
        currentClassList.setAttribute("data-position", 0);                      //데이터 포지션도 다시 초기화


        //맨 처음 카드가 맨 앞에 배치된 상태로 화살표 버튼도 초기 상태로 변경
        let eachSlidePrev = currentClassList.previousElementSibling.children[1].children[0];
        let eachSlideNext = currentClassList.previousElementSibling.children[1].children[1];
        let eachLiList = currentClassList.getElementsByClassName("li");

        if (currentClassList.clientWidth < (eachLiList.length * 260)) {               //넘치는 경우 prev 버튼 활성화
            //왼쪽에 있던 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈수 있으므로 prev 버튼 비활성화
            eachSlidePrev.style.color = '#2f3059';
            eachSlidePrev.classList.add('slide-prev-hover');
            eachSlidePrev.addEventListener('click', transformPrev);

            eachSlideNext.style.color = '#cfd8dc';
            eachSlideNext.classList.remove('slide-next-hover');
            eachSlideNext.removeEventListener('click', transformNext);
        }

        mouseStart = false;
    }

}

//특정 요소를 드래그하다가, 요소 밖에서 드래그를 끝낼 수 있으므로, window에 이벤트를 걸어줌
window.addEventListener("dragend", processTouchEnd);
window.addEventListener("mouseup", processTouchEnd);

//인터페이스간의 오작동을 막기위해, 카드 내의 이미지에만 드래그 인터페이스 제공하기로 함
const classImgList = document.querySelectorAll("ul li img");

for (let i = 0; i < classImgList.length; i++) {
    //해당 요소에 마우스를 누르면, 드래그를 시작할 수 있으므로, 이벤트 걸어줌
    classImgList[i].addEventListener("mousedown", processTouchStart);
    classImgList[i].addEventListener('touchstart', processTouchStart);
}