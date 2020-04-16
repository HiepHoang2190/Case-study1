var adidas1 = adidas1 || {};
adidas1.showProduct = function(){
    $.ajax({
        url: " https://case-study1.herokuapp.com/adidas",
        method: "GET",
        dataType : "json",
        success : function(data){
            $.each(data,function(i,v){
                $('#showProducts').append(
               '<div class="col-lg-4 col-sm-6">'+
               '<div class="product-item">'+
                   '<div class="pi-pic">'+
                   '<a href="./product.html"><img src="'+v.productImage+'" alt=""></a>'+
                       
                       '<div class="icon">'+
                           '<i class="icon_heart_alt"></i>'+
                       '</div>'+
                       '<ul>'+
                           '<li class="w-icon active"><a href="#"><i class="icon_bag_alt"></i></a></li>'+
                           '<li class="quick-view"><a href="#">+ Quick View</a></li>'+
                           '<li class="w-icon"><a href="#"><i class="fa fa-random"></i></a></li>'+
                       '</ul>'+
                   '</div>'+
                   '<div class="pi-text">'+
                       '<div class="catagory-name">'+ v.producttype+'</div>'+
                       '<a href="#">'+
                           '<h5>'+v.productName+'</h5>'+
                       '</a>'+
                       '<div class="product-price">'+v.price+'</div>'+
                   '</div>'+
               '</div>'+
           '</div>'
         
                )
            })
        }
    });
}


adidas1.productDetail = function(id){
    $.ajax ({
        url:"https://case-study1.herokuapp.com/adidas/" +id,
        method:"GET",
        dataType:"json",
        success: function(data){
            $('#ProductName').text(data.productName);
            $('#Price').text(data.price);
            $('#Description').text(data.description);
            $('#ProductName').text(data.productName);
            $('#ProducImage').text(data.productName);


        }
    })
}





adidas1.init = function(){
   
    adidas1.showProduct();
}

$(document).ready(function(){
    adidas1.init();
});








