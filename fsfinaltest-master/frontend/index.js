$(function () {
    loadAllPost();
});

$('#search').click(function () {
    loadPostByUser();
});

function loadAllPost() {
    $('#posts').empty();
    //Get all posts
    var url = 'http://localhost:8080/api/posts/';

    // POINT 6. Call REST APIs with Axios
    axios.get(url)
        .then(function (response) {
            // console.log(response);

            // POINT 7. User Mustache render template(post.mst) with json data from the API
            var data = response['data'];


            $.get('post.mst', function (template) {
                for (i = 0; i < data.length; i++) {
                    // for (i = 0; i < 10; i++) {
                    // console.log(data[i]);
                    var rendered = Mustache.render(template, data[i]);
                    // $('#posts').html(rendered);
                    $('#posts').append(rendered);
                };
            });



        })
        .catch(function (error) {
            console.log(error);
        });


    // POINT 7. User Mustache render template(post.mst) with json data from the API


}

function loadPostByUser() {
    // Additional 1.
    console.log('click');

    axios.get('http://localhost:8080/api/getPostsByUser?username=5730211095')
        .then(function (response) {
            // console.log(response);

            // POINT 7. User Mustache render template(post.mst) with json data from the API
            $('#posts').empty();
            var data = response['data'];
            $.get('post.mst', function (template) {
                for (i = 0; i < data.length; i++) {
                    // for (i = 0; i < 10; i++) {
                    // console.log(data[i]);
                    var rendered = Mustache.render(template, data[i]);
                    // $('#posts').html(rendered);
                    $('#posts').append(rendered);
                };
            });



        })
        .catch(function (error) {
            console.log(error);
        });
}


