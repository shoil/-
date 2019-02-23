$(function(){
    $(".title>i").on("click", change);
    $(".title>i").on("click", litoggle);
    function change(){
        $(this).toggleClass('icon-jiahao');
    }
    function litoggle(){
        $(this).parent().nextAll().toggle();
    }
})