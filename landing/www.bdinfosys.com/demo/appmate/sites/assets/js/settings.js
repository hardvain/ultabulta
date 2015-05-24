function setActiveStyleSheet(cssName){
    var scheme = $('link[href*="css/colors/color"]');
    scheme.attr('href','assets/css/colors/'+cssName+'.css');
}


$("#hide, #show").click(function (e) {
	e.preventDefault();

    if ($("#show").is(":visible")) {
       
        $("#show").animate({
            "margin-right": "-300px"
        }, 300, function () {
            $(this).hide();
        });
        
        $("#switch").animate({
            "margin-right": "0px"
        }, 300).show();
    } else {
        $("#switch").animate({
            "margin-right": "-300px"
        }, 300, function () {
            $(this).hide();
        });
        $("#show").show().animate({
            "margin-right": "0"
        }, 300);
    }
});