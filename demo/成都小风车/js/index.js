window.onload = function() {
    var nav = document.getElementById("nav");
    var service = document.getElementById("service");
    var serviceTop = service.offsetTop;
    document.onscroll = function(){
        var sTop = document.documentElement.scrollTop;
        if(sTop>0) {
            nav.classList.add('fixed');
        }
    }
    // var code = document.getElementById("code");
    // var codeimg = document.getElementById("code_img");
    // code.onclick = function(){
    //     codeimg.style.display = "block";
    // }

}