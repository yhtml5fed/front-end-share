
$('#list li,#list2 li').hover(function(){
    $(this).css({'box-shadow':'5px 5px 10px #555','opacity':'1'});
    $(this).find('div').fadeIn(100);
  },function(){
    $(this).css({'box-shadow':'2px 2px 5px #000','opacity':'0.9'});
      $(this).find('div').fadeOut(100)
  })

