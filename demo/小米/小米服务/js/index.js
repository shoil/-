$(function(){
    $("#head").load("../cm-xiaomi/cm-html/header.html");
    $("#foot").load("../cm-xiaomi/cm-html/bottom.html");

    /*-------------------lunbotu----------------*/
    function animate(offset) {
        var newLeft = $(".sv-list").position().left + offset;
        $(".sv-list").animate({ left: newLeft + "px"}, 500, function(){
            if (newLeft<-2340.1) {
                $(".sv-list").css({ left: "-1170px" });
            }
            if (newLeft>-1170) {
                $(".sv-list").css({ left: "-2340px" });
            }
        })
    }
    $("#prev").click(function(){
        animate(1170);
    })
    $("#next").click(function(){
        animate(-1170);
    })
    var timer;
    function autoplay() {
        timer = setInterval(function(){
            $("#next").click()
        }, 1000)
    }
    autoplay();
    function stop() {
        clearInterval(timer);
    }
    $(".sv-box").mouseover(function(){
        stop();
    })
    $(".sv-box").mouseout(function(){
        autoplay();
    })
})
