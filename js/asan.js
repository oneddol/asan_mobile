(function ($) {
  
  // 로고를 클릭하면 main.html의 #content를 load() 하시오.
  $('#wrap')
  .on("click", "#header h1 a, #footer .quickMenu a, .mainContent #step_area a, .mapContent .contTit .prev a, .medicalContent .contTit .prev a, .part1Content .contTit .prev a", function () {
      var url = this.href;
      $("#container > #content").remove();
      $("#container").load(url + " #content");
      return false;
    }
  );
  
    $(window).scroll(function(){
      var sct = $(this).scrollTop()
      if (sct>=50 && !$("#header").hasClass('on')){
        $("#header").slideUp(100).slideDown(100)
        $("#header").addClass('on')
      } else if (sct<50 && $("#header").hasClass('on')){
        $("#header").removeClass('on')
      }
    })
 
    $("#container").on("click", ".medicalContent .mediList a", function(e){
      e.preventDefault()
      var url = this.href;
      var part = this.id;
      $("#container > #content").remove();
      $("#container").load(url + " #content");

      $.ajax({
        type:"GET",
        url:'data/doctors.json',
        timeout:1000,
        beforeSend:function(xhr){
          if(xhr.overrideMimeType){xhr.overrideMimeType("application/json")}
        },
        success:function(data){
          var usedata = data[part]
          var newContent = ''
          function dataPrint(){
            for (var i in usedata){
            newContent += `<li><div class="img"><img src="${usedata[i].photo}" alt=""></div>`
            newContent += `<div class="doctorInfo"><strong>${usedata[i].name}</strong>`
            newContent += `<p>${usedata[i].depart}</p>`
            newContent += `<div>${usedata[i].about}</div></div></li>`
            }
            $("#content .part1DoctorList").html(`<ul>${newContent}</ul>`)
            $("#content .part2DoctorList").html(`<ul>${newContent}</ul>`)
          }
          dataPrint()
        },
        error:function(exhr){
          alert(exhr.status + '에러')
        }
      })
    })

})(jQuery);
