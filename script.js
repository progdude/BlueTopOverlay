function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

var dat;


loadJSON('data.json',
    function(data) {
        doSomething(data);
    },
    function(xhr) {
        console.error(xhr);
    }
);





function doSomething(dat) {
    for (var i = 0; i < dat.length; i++) {
        if (dat[i].type == "inbound queue") {
            if (dat[i].slide == "true") {
                $(".inbound").append('<div class="wrapper" id="sl"><div id="slide2" >Start Work</div> <div id="slide" class="sli" >Command 2</div><div id="slide1" class="sli" >Clear Notification</div><div class="component"> <div class="claim-title"> ' + dat[i].title + ' </div> ' + dat[i].content + ' </div></div>')
            } else {
                $(".inbound").append('<div class="component"> <div class="claim-title"> ' + dat[i].title + ' </div> ' + dat[i].content + ' </div> ')
            }
        }

        if (dat[i].type == "outbound queue") {
            if (dat[i].slide == "true") {
                $(".outbound").append('<div class="wrapper" id="sl"><div id="slide2" >Start Work</div><div id="slide" class="sli" >Command 2</div><div id="slide1" class="sli" >Clear Notification</div><div class="component"> <div class="claim-title"> ' + dat[i].title + ' </div> ' + dat[i].content + ' </div></div>')
            } else {
                $(".outbound").append('<div class="component"> <div class="claim-title"> ' + dat[i].title + ' </div> ' + dat[i].content + ' </div> ')
            }
        }

        if (dat[i].type == "transactions") {

            if (dat[i].color == "true") {
                $(".transactions").append('<div class="component" style="background-color: #5D9BB9"> <div class="claim-title">' + dat[i].title + '</div>' + dat[i].content + '</div>');
            } else {
                $(".transactions").append('<div class="component"> <div class="claim-title"> ' + dat[i].title + ' </div> ' + dat[i].content + ' </div> ')
            }
        }
    }


    var isLeft = false;
    var isRight = false;

    $('.wrapper').each(function() {
        var mc = new Hammer(this);
        var x = this;
        mc.on("swiperight", function() {
            if(isRight==false){
                isLeft = true;
                x.childNodes[1].style.left = "50%";
                x.childNodes[2].style.left = "0%";
                //x.childNodes[1].style.visibility="hidden";
            }
                
        });
    });


        $('.wrapper').each(function() {
        var mc = new Hammer(this);
        var x = this;
        mc.on("swipeleft", function() {
            if(isLeft==false)
                console.log(x.childNodes);
                x.childNodes[0].style.left = "0%"
                isRight = true;
            
        });
    });


            $('#slide2').each(function() {
        var mc = new Hammer(this);
        var x = this;
        mc.on("swiperight", function() {
            if(isRight)
            console.log(x);
            x.style.left = "200%";
            setTimeout(function(){isRight = false;},1000);
        });
    });



    $('.sli').each(function() {
        var mc = new Hammer(this);
        var x = this;
        mc.on("swipeleft", function() {
            
                if(isLeft){
                x.parentNode.childNodes[1].style.left = "-100%";
                x.parentNode.childNodes[2].style.left = "-100%";
                setTimeout(function(){isLeft = false;},1000);
                //setTimeout(function(){dict[x.parentNode]=true;},1000);
                }
           

        });
    });

    $("#slide1").click(function(){
        var x = $(this).parent();

        x.slideUp( "slow", function() {
        });
    });



    // var myElement = document.getElementById('sl');
    // var elements = document.getElementsByClassName("wrapper");
    // console.log(elements);

    // var bool = true;

    // var hammertime = new Hammer(myElement);
    // hammertime.on('swipe', function(ev) {
    //     console.log("adsfds");
    //     if(bool){console.log("asdfs");
    //     document.getElementById("slide").style.left = 0;
    //     bool=false;
    //     }
    // });


    // var slide = document.getElementById('slide');

    // var hm = new Hammer(slide);
    // hm.on('swipe', function(ev) {
    //     console.log("dsf");
    //     if(!bool){
    //     document.getElementById("slide").style.left = '-100%';
    //     setTimeout(function(){bool=true;},1000);
    //     //bool=true;
    //     }
    // });

}

