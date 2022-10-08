
export default function dropload (element,direction = 0){
  // element 需要滑动的box ,direction = 0 滑动的方向 1 和鼠标同向 0 合触摸板同向
  // 在vue mounted 中使用
    let startX = 0;
    let startY = 0;
    let start = false;
    let startLeft = 0;
    let startTop = 0
    // el-table__body-wrapper
    const boxel = element || document.getElementsByClassName("el-table__body-wrapper")[0];
    // const boxel = document.getElementById("box");
    console.log('boxel',boxel);
    // 点击
    boxel.addEventListener("mousedown", (event) => {
      const ev = event || window.event;
      // 获取鼠标位置
      startX = ev.x;
      startY = ev.y;
      console.log("点击");
      start = true;
      startLeft = boxel.scrollLeft;
      startTop = boxel.scrollTop;
    });

    // 节流
    function throttle(fn, delay = 640) {
      let flag = null;
      return function () {
        if (!flag) {
          flag = setTimeout(() => {
            fn.apply(this, arguments);
            flag = null;
          }, delay);
        }
      };
    }

    // 移动
    boxel.addEventListener(
      "mousemove",
      throttle((event) => {
        if (!start) return;
        const ev = event || window.event;
        // 获取鼠标位置
        const nowX = ev.x;
        const nowY = ev.y;
        const diffX = nowX - startX;
        const diffY = nowY - startY;

        const relativeX = (boxel.scrollWidth * diffX) / boxel.clientWidth;
        const relativeY = (boxel.scrollHeight * diffY) / boxel.clientHeight;

        // boxel.scrollLeft = startLeft + relativeX;
        // boxel.scrollTop = startTop + relativeY;

        boxel.scrollLeft = direction === 1 ? startLeft + relativeX:startLeft - relativeX;
        boxel.scrollTop = direction === 1 ? startTop + relativeY :startTop - relativeY;

        console.table("移动",
          nowX,
          nowY,
          diffX,
          diffY,
          relativeX,
          relativeY,
          boxel.scrollLeft,
          boxel.scrollTop
        );

        // boxel.scrollWidth / x = boxel.clientWidth / diffX

        // box 滚轮的宽度 boxel.scrollWidth
        // box 可见区域宽度 boxel.clientWidth
      }, 0)
    );


    // 松开
    boxel.addEventListener("mouseup", () => {
      console.log("松开");
      start = false;
    });
  }