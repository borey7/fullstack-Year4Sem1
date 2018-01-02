$(function () {

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    //check user and password
    var username = getCookie('username');
    var password = getCookie('password');
    $.get("http://localhost:3000/users?id=" + username + "&password=" + password, function (data) {
        if (data.length > 0) {
            //initial 
            $('#username').text(data[0].username);
            $('#title').text(data[0].username);
            //message
            $('#btn-inbox').on('click', function () {
                //show inbox form
                $('#inbox-form').show();
                $('#home').hide();
                $('#edit-info').hide();
                //retrieve message                
                $.get("http://localhost:3000/messages?userid=" + username, function (data) {
                    var html = "";
                    var count = data.length;
                    $('#count-inbox').text(count);
                    if (count == 0) {
                        html = '<p>No message</p>';
                    }
                    else {
                        $.each(data, function (i, obj) {
                            console.log(obj.id);
                            html += '<p id="p-' + obj.id + '">' +
                                '<i style="color:darkred; font-size:15px">'+obj.date+'</i> : ' + obj.message + ' &nbsp;&bull;&nbsp;' +
                                '<strong>' +
                                '<a class="btn-delete" id="' + obj.id + '" style="color:red; cursor:pointer">Delete</a>' +
                                '</strong>' +
                                '</p>';
                        });
                    }
                    $('#inbox-content').empty();
                    $('#inbox-content').append(html);
                    //event delete button
                    $('.btn-delete').click(function () {
                        var id_del = this.id;
                        //delete data from db.json
                        $.ajax({
                            type: 'DELETE',
                            url: 'http://localhost:3000/messages/' + id_del,
                            success: function (data, textStatus, jqXHR) {
                                //react to UI
                                console.log(id_del);
                                $('#p-' + id_del).empty();
                                $('#count-inbox').text($('#count-inbox').text() - 1);
                                console.log('Message deleted successfully');
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log('Message deleted error');
                            }
                        });
                    });
                });
            });

            //edit information saved
            $('#btn-save').click(function () {
                var new_username = $('#new-username').val();
                var new_password = $('#new-password').val();
                //update data to db.json
                $.ajax({
                    type: 'PUT',
                    contentType: 'application/json',
                    url: 'http://localhost:3000/users/' + username,
                    dataType: "json",
                    data: JSON.stringify({
                        "id": username,
                        "username": new_username,
                        "password": new_password
                    }),
                    success: function (data, textStatus, jqXHR) {
                        alert('Account updated successfully');
                        //set cookie expire
                        document.cookie = "username=";
                        document.cookie = "password=";
                        window.location.href = "index.html";
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Some error occur: ' + textStatus);
                    }
                });
            });


            $('#btn-edit-info').on('click', function () {
                // edit info
                console.log('edit');
                $('#home').hide();
                $('#edit-info').show();
            });

            $('.btn-back').on('click', function () {                
                $('#inbox-form').hide();
                $('#home').show();
                $('#edit-info').hide();
            });

            $('#btn-logout').on('click', function () {
                //set cookie expire
                document.cookie = "username=";
                document.cookie = "password=";
                window.location.href = "index.html";
            });
        }
        else {
            window.location.href = "index.html";
        }
    });
});