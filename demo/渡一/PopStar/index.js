var table;//游戏桌面
var squareWidth = 50;//每个方块的宽度
var boardWidth = 10;//有多少行和列的方块
var squareSet = [];//当前桌面上的方块集合（二维数组，最左下角是0，0位置）
var timer = null;//闪烁定时器
var choose = [];//被选中的方块
var baseScore = 5;//基础分数
var stepScore = 10;//一次每多消除一个额外增加的分数
var totalScore = 0;//当前总分数
var targetScore = 2000;//目标分数
var flag = true;//对点击事件加锁，消除过程中不允许有其他移入和点击操作
var tempSquare = null;//消除过程中如果输入移入其他方块，进行记录


//扫描所有方块又没相邻，还有没有可以消除的
function isFinish() {
    var flag = true;
    for (var i = 0 ; i < squareSet.length ; i ++) {
        for (var j = 0 ; j < squareSet[i].length ; j ++) {
            var temp = [];
            checkLinked(squareSet[i][j], temp);     //判断周围还有没可以消除的
            if (temp.length > 1) {
                return false;   //
            }
        }
    }
    return flag;
}
// 移动设置行和高  行是一个数组 列不是一个数组 需要列往下移
function move() {
    for (var i = 0 ; i < boardWidth ; i ++) {//纵向移动 向下
        var pointer = 0;
        for (var j = 0 ; j < boardWidth ; j ++) { //j表示横向
            if(squareSet[j][i] != null) {
                if (j != pointer) {     //pointer做指针  pointer 指向小方块，当遇到null时停止，
                    squareSet[pointer][i] = squareSet[j][i];
                    squareSet[j][i].row = pointer;
                    squareSet[j][i] = null;
                }
                pointer ++;
            }
        }
    }
    for (var i = 0 ; i < squareSet[0].length ; ) {//横向移动 想左
        if (squareSet[0][i] == null) {
            for (var j = 0 ; j < boardWidth ; j ++) {
                squareSet[j].splice(i, 1);//删除空的那一列，使其向左移
            }
            continue;
        }
        i ++;       //删了才i++
    }
    refresh();      //刷新
}

// 鼠标放上去闪烁效果移开后还原
function goBack() {
    if (timer != null) {
        clearInterval(timer);
    }
    for (var i = 0 ; i < squareSet.length ; i ++) {
        for (var j = 0 ; j < squareSet[i].length ; j ++) {
            if (squareSet[i][j] == null) {
                continue;
            }
            squareSet[i][j].style.transform = "scale(0.95)";
            squareSet[i][j].style.border = "0px solid white";
        }
    }
}

function flicker(arr) {
    var num = 0;
    timer = setInterval(function () {
        for (var i = 0 ; i < arr.length ; i ++) {
            arr[i].style.border = "3px solid #BFEFFF";
            arr[i].style.transform = "scale(" + (0.90 + 0.05 * Math.pow(-1, num)) + ")";
        }
        num ++;
    }, 300);
}

function checkLinked(square, arr) {
    if (square == null) {
        return;
    }
    arr.push(square);
    // 判断左边的小方块需不需要收录进去
    
       /*  1.不能是最左边
        2.左边存在一个快
        3.左边的快颜色一致
        4.左边块没有收录进去 */
    
    if (square.col > 0 && squareSet[square.row][square.col - 1] && squareSet[square.row][square.col - 1].num == square.num && arr.indexOf(squareSet[square.row][square.col - 1]) == -1) {
        checkLinked(squareSet[square.row][square.col - 1], arr);
    }
    if (square.col < boardWidth - 1 && squareSet[square.row][square.col + 1] && squareSet[square.row][square.col + 1].num == square.num && arr.indexOf(squareSet[square.row][square.col + 1]) == -1) {
        checkLinked(squareSet[square.row][square.col + 1], arr);
    }
    if (square.row < boardWidth - 1 && squareSet[square.row + 1][square.col] && squareSet[square.row + 1][square.col].num == square.num && arr.indexOf(squareSet[square.row + 1][square.col]) == -1) {
        checkLinked(squareSet[square.row + 1][square.col], arr);
    }
    if (square.row > 0 && squareSet[square.row - 1][square.col] && squareSet[square.row - 1][square.col].num == square.num && arr.indexOf(squareSet[square.row - 1][square.col]) == -1) {
        checkLinked(squareSet[square.row - 1][square.col], arr);
    }
}

function refresh() {
    for (var i = 0 ; i < squareSet.length ; i ++) {
        for (var j = 0 ; j < squareSet[i].length ; j ++) {
            if (squareSet[i][j] == null) {
                continue;
            }
            squareSet[i][j].row = i;
            squareSet[i][j].col = j;
            squareSet[i][j].style.transition = "left 0.3s, bottom 0.3s";        //点击消灭时有过度动画（柔和一点）
            squareSet[i][j].style.left = squareSet[i][j].col * squareWidth + "px";
            squareSet[i][j].style.bottom = squareSet[i][j].row * squareWidth + "px";
            squareSet[i][j].style.backgroundImage = "url('./pic/" + squareSet[i][j].num + ".png')";
            squareSet[i][j].style.backgroundSize = "cover";
            squareSet[i][j].style.transform = "scale(0.95)";

        }
    }
}

function createSquare(value, row, col) {
    var temp = document.createElement("div");
    temp.style.width = squareWidth + "px";
    temp.style.height = squareWidth + "px";
    temp.style.display = "inline-block";
    temp.style.position = "absolute";
    temp.style.boxSizing = "border-box";
    temp.style.borderRadius = "12px";
    temp.num = value;
    temp.row = row;
    temp.col = col;
    return temp;
}

// 计算选中这些小方块的分数
function selectScore() {
    var score = 0;
    for (var i = 0 ; i < choose.length ; i ++) {
        score += baseScore + i * stepScore;
    }
    if (score == 0) {
        return;
    }
    document.getElementById("selectScore").innerHTML = choose.length + "块 " + score + "分";

    document.getElementById("selectScore").style.transition = null; //需要还原，不然下次会渐变出现，需要直接出现
    document.getElementById("selectScore").style.opacity = 1;
    setTimeout(function () {
        document.getElementById("selectScore").style.transition = "opacity 1s";     //渐变消失
        document.getElementById("selectScore").style.opacity = 0;
    }, 1000);
}

function mouseOver(obj) {
    if (!flag) {

        tempSquare = obj;  //

        return;
    }
    goBack();
    choose = [];
    checkLinked(obj, choose);
    if (choose.length <= 1) {
        choose = [];
        return;
    }

    flicker(choose);

    // 分数
    selectScore();
}
//总体方法
function init() {
    table = document.getElementById("pop_star");
    document.getElementById("targetScore").innerHTML = "目标分数：" + targetScore;
    for (var i = 0 ; i < boardWidth ; i ++) {
        squareSet[i] = new Array();
        for (var j = 0 ; j < boardWidth ; j ++) {
            var square = createSquare(Math.floor(Math.random() * 5), i, j);
            square.onmouseover = function () {
                mouseOver(this);
            };
            square.onclick = function () {              //鼠标点击事件 

                if (!flag || choose.length == 0) {      //被锁定不允许其他操作
                    return;
                }
                flag = false;       //开始执行时加锁
                tempSquare = null;

                // 1.加分数
                var score = 0;
                for (var i = 0 ; i < choose.length ; i ++) {
                    score += baseScore + i * stepScore;
                }

                totalScore += score;
                document.getElementById("nowScore").innerHTML = "当前分数：" + totalScore;

                // 2.消灭星星
                for (var i = 0 ; i < choose.length ; i ++) {//对每个选中的方块进行移除操作
                    (function(i){   //立即执行，不然报错
                        setTimeout(function () {  //一个随机消失
                            squareSet[choose[i].row][choose[i].col] = null;
                            table.removeChild(choose[i]);
                        }, i * 100);
                    })(i);
                }
                // 移动
                setTimeout(function () {
                    move(); //移动方法
                    setTimeout(function () {
                        var is = isFinish();
                        if (is) {
                            if (totalScore > targetScore) {
                                alert("恭喜获胜");
                            } else {
                                alert("游戏失败");
                            }
                        } else {    //没有结束
                            choose = [];

                            
                            flag = true; //在所有动作完成后释放锁
                            console.log(tempSquare);

                            mouseOver(tempSquare);  //加入移入时间

                        }
                    }, 300 + choose.length * 150);      //时间每个快150 移动300
                }, choose.length * 100);
            }
            squareSet[i][j] = square;
            table.appendChild(square);
        }
    }
    refresh();
}

window.onload = function () {
    init();
}