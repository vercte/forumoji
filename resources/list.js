window.onload = function () {
  // do some promise stuff to make this look better
  $.getJSON('resources/unicode-emoji.json', function (unicodeEmoji) {
    $.getJSON('resources/forumoji.json', function (forumoji) {
      $.getJSON('resources/hidden-emoji.json', function (hiddenEmoji) {
        // add forumoji data to unicode list
        function addForumoji(item) {
          if (item.comment) {
            delete item.comment;
          }

          if (item.category) {
            item.contents = item.contents
            .filter(function removeHiddenEmojis(emoji) {
              return !hiddenEmoji.codepoints
              .find(codepoint => codepoint == emoji.codepoint);
            });

            $.each(item.contents, function (_, content) {
              addForumoji(content);
            });
          } else if (item.codepoint) {
            let emoji = forumoji.emoji.filter(e => (e.codepoint.toLowerCase() == item.codepoint.toLowerCase()));
            emoji.forEach(e => e.used = true);
            if (emoji.length > 0) {
              if (emoji.length > 1) { console.log(`duplicate emoji: ${item.codepoint} ${item.name}`) }
              emoji = emoji.pop();
              item.image = emoji.image;
              item.url = emoji.url.replace(/^https:\/\/assets\.scratch\.mit\.edu\/(?=[0-9a-f])/i, 'https://assets.scratch.mit.edu/get_image/.%2E/');
              item.author = emoji.author;
            }
          }
        }

        addForumoji(unicodeEmoji);

        forumoji.emoji
          .filter(emoji => !emoji.used)
          .forEach(function LogInvalidCodepoints(emoji) {
            console.log(`invalid codepoint: ${emoji.codepoint} ${emoji.image}`)
          });

        // create tile list
        function addTiles(item, container, level) {
          if (item.category) {
            let categoryContainer = $('<div></div>')
              .attr('id', item.category)
              .addClass('category')
              .addClass(`category-level-${level}`);

            let categoryHeader = $('<p></p>')
              .text(item.category);

            categoryContainer.append(categoryHeader);

            $.each(item.contents, function (_, content) {
              addTiles(content, categoryContainer, level + 1);
            });

            $(container).append(categoryContainer);
          } else if (item.codepoint) {
            if (item.image) {
              let tileImage = $('<img>')
                .attr('src', 'resources/forumoji/' + item.image)
                .attr('alt', item.name)
                .attr('tabindex', 0)
                .attr('id', item.codepoint)
                .addClass('tile')
                // change the unpacking to support multiple authors
                .addClass('author-' + item.author.join(' '));
              $.each(item.keywords, function (_, keyword) {
                tileImage.addClass('keyword-' + keyword.split(' ').join('-'))
              });

              tileImage
                .click(function SelectClicked() { select(item) })
                .keydown(function Select_From_Common_KeyboardOnly_Selectors({ key }) {
                  if (key == 'Enter' || key == ' ') select(item)
                });

              $(container).append(tileImage);
            }
          }
        }

        addTiles(unicodeEmoji, $('#list'), 0);
        hideEmptyCategories();

        let tiles = $('.tile');
        let randomTile = tiles[Math.floor(Math.random() * tiles.length)];
        $(randomTile).click();
      });
    });
  });

  $('#search').on('input', function PerformSearch({ target: { value: query } }) {
    let unicodeRepr = query.split('')
    .map(string => string.codePointAt(0))
    .map(codepoint => codepoint.toString(16))
    .map(hexRep => (hexRep.length > 3 ? '' : '0'.repeat(4 - hexRep.length)) + hexRep)
    .map(unicode => 'U+' + unicode.toUpperCase())
    .join(' ');
    let notFound;
    for (let image of document.querySelectorAll('#list img')) {
      image.removeAttribute('hidden');
      notFound = unicodeRepr !== image.id;
      let keywordList = Array.from(image.classList).concat(['keyword-' + image.getAttribute('alt')]);
      for (let keyword of keywordList) {
        if (!notFound) break;

        let isKeyword = /^keyword-/.test(keyword),
        hasQueried = keyword.toLowerCase().slice(8).includes(query.toLowerCase())
        if (isKeyword && hasQueried)
          notFound = false;
      }
      if (notFound)
        image.setAttribute('hidden', '');
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
  $(`#${emoji.codepoint}`).addClass('selected');

  let githubPath = `https://lopste.github.io/forumoji/resources/forumoji/${emoji.image}`;
  $('img.preview-image')
    .attr('src', 'resources/forumoji/' + emoji.image)
    .attr('alt', emoji.name);
  $('#emoji-codepoint').text(emoji.codepoint)
  $('#name').text(emoji.name);
  $('#contributors').html(emoji.author.join(',<br>'));
  if (emoji.author.length > 1) {
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
  copyIndicator('Scratch');
}

function copyBBCodeGithub() {
  navigator.clipboard.writeText($('#bbcodeGithub').attr('value'));
  copyIndicator('Github');
}

var isFilling = {
  'Scratch': 0,
  'Github': 0,
}
function copyIndicator(type) {
  if (isFilling[type])
    return;
  var element = $(`#bbcode${type}`);
  element.addClass('filling');
  element.val('Copied!');
  isFilling[type] = 1;
  setTimeout(function UnsetFillingMode() {
    element.removeClass('filling');
    element.val(element.attr('value'));
    isFilling[type] = 0;
  }, 2000);
}
