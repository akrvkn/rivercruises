function parseUrlQuery(q) {
    var res = '';
    if(location.search) {
        var pair = (location.search.substr(1)).split('&');
        for(var i = 0; i < pair.length; i ++) {
            var param = pair[i].split('=');
            if(param[0]===q)
                res = decodeURIComponent(param[1]);
        }
    }
    return res;
}

moment.locale('ru');

$(document).ready(function() {
    var get_id = parseUrlQuery('id');
    if(get_id.length>0) {
        $.getJSON('https://www.mosturflot.ru/api/ajax/post.php?id=' + get_id).done(function (data) {
            if(data.width >= 800) {
                $('.single-post').prepend('<img src="' + data.image + '" alt="' + data.title + '">');
            }
            $('.post-content').append('<p>'+data.content+'</p>');
            $('.blog-post-title').html(data.title);
            $('.breadcrumb-title').html(data.title);
            $('.post-time').html(moment(data.date, moment.ISO_8601).format('DD MMM YYYY'));

        });
    }

    $.getJSON( 'https://www.mosturflot.ru/api/ajax/cat.php').done(function( data ) {
        var news = '';
        $.each( data, function(k, v) {
            news += '<div class="col-md-4 col-sm-6">\n' +
        '<article class="blog-post">' +
        '<div class="post-thumbnail">' +
        '<a href="post?id='+data[k].id+'"><img src="'+data[k].image+'" height="210" alt=""></a>' +
        '</div>' +
        '<div class="post-content">' +
        '<div class="post-content-inner">' +
        '<h3><a href="post?id='+data[k].id+'">'+data[k].title+'</a></h3>' +
        '<ul class="meta-info">' +
        '<li><a href="post?id='+data[k].id+'">'+moment(data[k].date, moment.ISO_8601).format('DD MMM YYYY')+'</a></li>' +
        '</ul>' +
        '<p>'+data[k].excerpt.substr(0, 148)+'..</p>' +
        '</div>' +
        '<div class="post-footer-meta clearfix">' +
        '<div class="read-more-wrapper">' +
        '<a href="post?id='+data[k].id+'" class="read-more">Подробнее</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</article>' +
        '</div>';
            $('.news-list').html(news);
        });
    });

});