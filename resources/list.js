window.onload = function() {
  // do some promise stuff to make this look better
  $.getJSON('resources/unicode-emoji.json', function(unicodeEmoji) {
    $.getJSON('resources/forumoji.json', function(forumoji) {
      $.getJSON('resources/hidden-emoji.json', function(hiddenEmoji) {
        let emojiList = new Array;

        // unpack and combine the official and forumoji lists
        function unpack(item) {
          if (item.category) {
            $.each(item.contents, function(index, content) {
              unpack(content);
            });
          } else if (item.codepoint && !hiddenEmoji.codepoints.find(c => c == item.codepoint)) {
            emojiList.push(item);
          }
        }

        unpack(unicodeEmoji);

        $.each(forumoji.emoji, function(index, item) {
          let emoji = emojiList.find(e => (e.codepoint == item.codepoint));
          if (emoji) {
            if (emoji.shortcut) {
              // default Scratch emojis
            } else {
              if (emoji.image) {console.log(`duplicate emoji: ${emoji.codepoint} ${emoji.name}`);}

              emoji.image = item.image;
              emoji.url = item.url;
              emoji.author = item.author;
            }
          } else {
            console.log(`failed to find emoji: ${emoji.codepoint} ${emoji.image}`);
          }
        });

        // create tiles for each emoji
        $.each(emojiList, function(index, emoji) {
          if (emoji.image) {
            let tile = document.createElement('img');
            $(tile).attr('src', 'resources/forumoji/' + emoji.image);
            $(tile).attr('alt', emoji.name);
            $(tile).attr('id', emoji.codepoint);
            $(tile).addClass('tile');
            $(tile).addClass('author-' + emoji.author.split(' ').join('-'));
            $.each(emoji.keywords, function(index, keyword) {
              $(tile).addClass('keyword-' + keyword.split(' ').join('-'))
            });
            $(tile).click(function() {select(emoji)});
            $('#list').append(tile);
          }
        });

        let tiles = $('.tile');
        let randomTile = tiles[Math.floor(Math.random() * tiles.length)]
        select(emojiList.find(e => (e.codepoint == $(randomTile).attr('id'))));
      });
    });
  });
  document.querySelector("#search").addEventListener("input", function(e) {
    let query = e.srcElement.value;
    let notFound;
    for (let i of document.querySelectorAll("#list img")) {
      i.removeAttribute("hidden");
      notFound = true;
      for (let j of Array.from(i.classList).concat(["keyword-"+i.getAttribute("alt")])) {
        if (/^keyword-/.test(j)) {
          if (j.toLowerCase().slice(8).includes(query.toLowerCase())) {
            notFound = false;
          }
        }
      }
      if (notFound) {
        i.setAttribute("hidden", "");
      }
    }
  });
}

function select(emoji) {
  $('.selected').removeClass('selected');
  $('#' + emoji.codepoint).addClass('selected');
  $('img.preview-image').attr('src', 'resources/forumoji/' + emoji.image);
  $('img.preview-image').attr('alt', emoji.name);
  $('#name').text(emoji.name);
  $('#author').html(emoji.author.replace('\n', '<br>'));
  $('#keywords').text(emoji.keywords.join(', '));
  $('#bbcode').attr('value', `[img=${emoji.url}]`);
}

function copyBBCode() {
  navigator.clipboard.writeText($('#bbcode').attr('value'));
}
