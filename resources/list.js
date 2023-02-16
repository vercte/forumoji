window.onload = function() {
  // do some promise stuff to make this look better
  $.getJSON('resources/unicode-emoji.json', function(unicodeEmoji) {
    $.getJSON('resources/forumoji.json', function(forumoji) {
      $.getJSON('resources/hidden-emoji.json', function(hiddenEmoji) {
        // add forumoji data to unicode list
        function addForumoji(item) {
          if (item.comment) {
            delete item.comment;
          }

          if (item.category) {
            //remove hidden emojis
            item.contents = item.contents.filter(e => !hiddenEmoji.codepoints.find(c => c == e.codepoint));

            $.each(item.contents, function(index, content) {
              addForumoji(content);
            });
          } else if (item.codepoint) {
            let emoji = forumoji.emoji.filter(e => (e.codepoint.toLowerCase() == item.codepoint.toLowerCase()));
            emoji.forEach(e => e.used = true);
            if (emoji.length > 0) {
              if (emoji.length > 1) {console.log(`duplicate emoji: ${item.codepoint} ${item.name}`)}
              emoji = emoji.pop();
              item.image = emoji.image;
              item.url = emoji.url.replace(/^https:\/\/assets\.scratch\.mit\.edu\/(?=[0-9a-f])/i, 'https://assets.scratch.mit.edu/get_image/.%2E/');
              item.author = emoji.author;
            }
          }
        }

        addForumoji(unicodeEmoji);

        forumoji.emoji.filter(e => !e.used).forEach(e => console.log(`invalid codepoint: ${e.codepoint} ${e.image}`));

        // create tile list
        function addTiles(item, container, level) {
          if($("#loading")) $("#loading").remove()
          if (item.category) {
            let categoryContainer = document.createElement('div');
            $(categoryContainer).attr('id', item.category);
            $(categoryContainer).addClass('category');
            $(categoryContainer).addClass(`category-level-${level}`);

            let categoryHeader = document.createElement('p');
            $(categoryHeader).text(item.category);
            $(categoryContainer).append(categoryHeader);

            $.each(item.contents, function(index, content) {
              addTiles(content, categoryContainer, level + 1);
            });

            $(container).append(categoryContainer);
          } else if (item.codepoint) {
            if (item.image) {
              let tileImage = document.createElement('img');
              $(tileImage).attr('src', 'resources/forumoji/' + item.image);
              $(tileImage).attr('alt', item.name);
              $(tileImage).attr('tabindex', 0);
              $(tileImage).attr('id', item.codepoint);
              $(tileImage).addClass('tile');
              // change the unpacking to support multiple authors
              $(tileImage).addClass('author-' + item.author.split(' ').join('-'));
              $.each(item.keywords, function(index, keyword) {
                $(tileImage).addClass('keyword-' + keyword.split(' ').join('-'))
              });

              $(tileImage).click(function() {select(item)});
              $(tileImage).keydown(function({ key }) {
                if(key == 'Enter' || key == ' ') select(item)
              });

              $(container).append(tileImage);
            }
          }
        }

        addTiles(unicodeEmoji, $('#list'), 0);
        hideEmptyCategories();

        let tiles = $('.tile');
        let randomTile = tiles[Math.floor(Math.random() * tiles.length)]
        $(randomTile).click();
      });
    });
  });

  // search bar
  document.querySelector('#search').addEventListener('input', function(e) {
    let query = e.srcElement.value;
    let unicodeRepr = Array.from(query)
    .map(s => s.codePointAt(0))
    .map(c => c.toString(16))
    .map(n => (n.length > 3 ? '' : '0'.repeat(4 - n.length)) + n)
    .map(h => 'U+' + h.toUpperCase())
    .join(' ');
    let notFound;
    for (let i of document.querySelectorAll('#list img')) {
      i.removeAttribute('hidden');
      notFound = unicodeRepr !== i.id;
      for (let j of Array.from(i.classList).concat(['keyword-'+i.getAttribute('alt')])) {
        if (!notFound) {break;}
        if (/^keyword-/.test(j)) {
          if (j.toLowerCase().slice(8).includes(query.toLowerCase())) {
            notFound = false;
          }
        }
      }
      if (notFound) {
        i.setAttribute('hidden', '');
      }
    }

    hideEmptyCategories();
  });
}

// this can be done in CSS once :has() is widely supported
function hideEmptyCategories() {
  $('.category').attr('hidden', true);
  $('.tile[hidden!="hidden"]').parents('.category').removeAttr('hidden');
}

function select(emoji) {
  $('.selected').removeClass('selected');
  document.getElementById(emoji.codepoint).classList.add('selected');

  let githubPath = `https://lopste.github.io/forumoji/resources/forumoji/${emoji.image}`;
  $('img.preview-image').attr('src', 'resources/forumoji/' + emoji.image);
  $('img.preview-image').attr('alt', emoji.name);
  $('#emoji-codepoint').text(emoji.codepoint)
  $('#name').text(emoji.name);
  $('#contributors').html(emoji.author.replace('\n', ',<br>'));
  if(emoji.author.split('\n').length > 1) {
    $('#contributors-label').text('Emoji contributors:')
  } else {
    $('#contributors-label').text('Emoji contributor:')
  }

  $('#keywords').text(emoji.keywords.join(', '));
  $('#bbcodeScratch').attr('value', `[img=${emoji.url}]`);
  $('#bbcodeGithub').attr('value', `[img=${githubPath}]`);
}

function copyBBCodeScratch() {
  navigator.clipboard.writeText($('#bbcodeScratch').attr('value'));
}

function copyBBCodeGithub() {
  navigator.clipboard.writeText($('#bbcodeGithub').attr('value'));
}
