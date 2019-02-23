window.onload = function() {
    var list = document.getElementById("list");
    function animate(offset){
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + "px";
        list.style.transition = '300ms ease';
        if(newLeft<=-2436){
            list.style.left = 0 + 'px';
        }
    }
    var timer;
    function autoplay(){
        timer = setInterval(function(){
            animate(-1218)}, 1000);
    }
    autoplay();

}