jQuery(function($){
    $('#openSideNavigationBar').on('click', function(){
        $('.sidebar').css({'width': '290px'});
        $('.container-content').css({'margin-left': '290px'});
    })

    $('#closeSideNavigationBar').on('click', function(){
        $('.sidebar').css({'width': 0});
        $('.container-content').css({'margin-left': '0'});
    })
});