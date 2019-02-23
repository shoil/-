$(function(){
    /*-----------获取四个点击跳转的滚动距离---------*/
    var service = $("#service").offset().top;  
    var show = $("#show").offset().top;
    var customer = $("#customer").offset().top;
    var aboutus = $("#aboutus").offset().top;
    /*---------------------导航滑动事件------------------*/
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        console.log(scroll);
        console.log(show);
        if(scroll>0){
            $("#nav").addClass("fixed");
        }
        if(scroll<service-150) {
            $("#n_home").addClass("select").siblings().removeClass("select");
        }
        if(scroll>=service-151) {
            $("#n_service").addClass("select").siblings().removeClass("select");
        }
        if(scroll>show-101) {
            $("#n_show").addClass("select").siblings().removeClass("select");
        }
        if(scroll>customer-101) {
            $("#n_customer").addClass("select").siblings().removeClass("select");
        }
        if(scroll>aboutus-101) {
            $("#n_aboutus").addClass("select").siblings().removeClass("select");
        }
    })
    
    /*--------------------导航点击事件----------------*/
    $(function(){
        
        $("#n_home").click(function(){
            $("html, body").animate({scrollTop: 0}, 500);
        })
        $("#n_service").click(function(){
            $("html, body").animate({scrollTop: service-150}, 500);
        })
        $("#n_show").click(function(){
            $("html, body").animate({scrollTop: show-100}, 500);
            console.log(scroll);
        })
        $("#n_customer").click(function(){
            $("html, body").animate({scrollTop: customer-100}, 500);
        })
        $("#n_aboutus").click(function(){
            $("html, body").animate({scrollTop: aboutus-100}, 500);
        })

        /*----------二维码显示隐藏-----------*/
        $("#code").click(function(event){
            $("#code_img").toggle();
            event.stopPropagation();
        })
        $("body").click(function(){
            $("#code_img").hide();
        })
    })
})