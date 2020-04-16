var dashboard = dashboard || {};
dashboard.drawTable = function () {
    $.ajax({
        url: "https://case-study1.herokuapp.com/adidas",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let id=1
            $('#tbProducts tbody').empty();
            $.each(data, function (i, v) {
                $('#tbProducts tbody').append(
                    '<tr>' +
                    '<td class="cart-pic first-row">' + '<h3>' + (id++) + '</h3><img src="' + v.productImage + '" alt=""></td>' +
                    '<td class="cart-title first-row">' +
                    '<p class="color-orange">' + v.description + '</p>' +
                    '</td >' +
                    '<td class="p-price first-row">' + v.productName + '</td>' +
                    '<td class="p-price first-row">' + v.producttype + '</td>' +

                    '<td class="total-price first-row">' + v.price + '</td>' +
                    '<td class="close-td first-row">' +
                    '<a href="javascript:;" onclick="dashboard.productDetail(' + v.id + ');" ><i class="fa fa-edit color-orange"></i></a>' + '   ' +
                    '<a href="javascript:;" onclick="dashboard.remove('+v.id+');"><i class="fa fa-trash color-orange"></i></a>' +
                    '</td>' +
                    '</tr >'
                )
            })
        }
    })
}





dashboard.openModal = function () {
    dashboard.restForm();
    $('#addEditModal').modal('show');
}

dashboard.remove = function (id) {
    bootbox.confirm({
        title: "Remove Product?",
        message: "Do you want to remove this product?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url:" https://case-study1.herokuapp.com/adidas/" + id,
                    method: "DELETE",  // "POST"
                    dataType:"json",
                    success: function(data) {
                        dashboard.drawTable();
                        bootbox.alert("Product has been deleted successfully");
                    }
                })
            }
        }
    });
}

dashboard.save = function () {
    if ($('#formAddEditProduct').valid()) {
        if ($('#productId').val() == 0) {   // Add new product
            var addobj = {};
            addobj.productName = $('#ProductName').val();
            addobj.productImage = $('#ProductImage').val();
            addobj.price = $('#Price').val();
            addobj.producttype = $('#ProductType').val();
            addobj.description = $('#Description').val();

            $.ajax({
                url: "https://case-study1.herokuapp.com/adidas/",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(addobj),
                success: function (data) {
                    $('#addEditModal').modal('hide');
                    dashboard.drawTable();
                    bootbox.alert("Product has been added successfully");

                }
            })
        }
        else { // update
            var updateobj = {};
            updateobj.productName = $('#ProductName').val();
            updateobj.productImage = $('#ProductImage').val();
            updateobj.price = $('#Price').val();
            updateobj.producttype = $('#ProductType').val();
            updateobj.description = $('#Description').val();
            updateobj.id = $('#productId').val();

            $.ajax({
                url: "https://case-study1.herokuapp.com/adidas/" +updateobj.id,
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(updateobj),
                success: function (data) {
                    $('#addEditModal').modal('hide');
                    dashboard.drawTable();
                    bootbox.alert("Product has been updated successfully");

                }
            })

        }



    };
}

dashboard.productDetail = function (id) {
    $.ajax({
        url: "https://case-study1.herokuapp.com/adidas/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#ProductName').val(data.productName);
            $('#ProductImage').val(data.productImage);
            $('#Price').val(data.price);
            $('#Description').val(data.description);
            $('#ProductType').val(data.producttype);
            $('#productId').val(data.id);

            $('#addEditModal').find('.modal-title').text('Update Product');
            $('#btnProduct').text('Update');
            $('#addEditModal').modal('show');
        }

    });
}


dashboard.restForm = function () {
    $('#ProductName').val('');
    $('#ProductImage').val('');
    $('#Price').val('');
    $('#Description').val('');
    $('#ProductType').val('');
    $('#addEditModal').find('.modal-title').text('Create new Product');
    $('#btnProduct').text('Create');
    $('#productId').val('0');
}




dashboard.init = function () {
    dashboard.drawTable();

}

$(document).ready(function () {
    dashboard.init();

});