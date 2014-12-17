$(function () {
  $.get('/blocks', appendToList);

  $('form').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var blockData = form.serialize();

    $.ajax({
      type: 'POST', url: '/blocks', data: blockData
    }).done(function (blockName) {
      appendToList([blockName]);
      form.trigger('reset');
    });
  });

  $('.block-list').on('click', 'a[data-block]', function (e) {
    if(!confirm('Are you sure you want to delete?')) {
      return false;
    }
    var target = $(e.currentTarget);

    $.ajax({
      type: 'DELETE', url: '/blocks/' + target.data('block')
    }).done(function () {
      target.parents('li').remove();
    });
  });

  function appendToList(blocks) {
    var list = [];
    var content, block;
    for(var i in blocks) {
      block = blocks[i];
      content = '<a href="/blocks/'+block+'">'+block+'</a>'+
                '<a href="#" data-block="'+block+'">x</a>';
      list.push($('<li>', {html: content}));
    }
    $('.block-list').append(list);
  }
});
