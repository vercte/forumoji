window.onload = async function() {
  const unicodeEmoji = await $.getJSON('resources/unicode-emoji.json'),
        forumoji = await $.getJSON('resources/forumoji.json'),
        hiddenEmoji = await $.getJSON('resources/hidden-emoji.json');
  // add forumoji data to unicode list
  function addForumoji(item) {
    if (item.comment)
      delete item.comment;

    var isCategory = 'category' in item,
      hasCodepoint = 'codepoint' in item;
    if (isCategory) {
      item.contents = item.contents
        .filter(function removeHiddenEmojis(emoji) {
          return !hiddenEmoji.codepoints
            .find(codepoint => codepoint == emoji.codepoint);
        });

      $.each(item.contents, function GoThroughCategoryContents(_, content) {
        addForumoji(content);
      });

      return;
    }
    if (hasCodepoint) {
      let emoji = forumoji.emoji.filter(function KeepExisting(Emoji) {
        var selectedCodepoint = Emoji.codepoint.toLowerCase(),
          evaluationCodepoint = item.codepoint.toLowerCase()
        return (selectedCodepoint == evaluationCodepoint);
      });
      emoji.forEach(function MarkAsUsed(Emoji) {
        Emoji.used = true;
      });
      if (emoji.length > 1) {
        console.log(`duplicate emoji: ${item.codepoint} ${item.name}`);
      } else if (emoji.length > 0) {
        emoji = emoji.pop();
        item.image = emoji.image;
        item.url = emoji.url.replace(/^https:\/\/assets\.scratch\.mit\.edu\/(?=[0-9a-f])/i, 'https://assets.scratch.mit.edu/get_image/.%2E/');
        item.author = emoji.author;
      }

      return;
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
    let isForumoji = 'codepoint' in item && 'image' in item,
      isCategory = 'category' in item;
    if (isCategory) {
      let categoryContainer = $('<div></div>')
        .attr('id', item.category)
        .addClass('category')
        .addClass(`category-level-${level}`);

      let categoryHeader = $('<p></p>')
        .text(item.category);

      categoryContainer.append(categoryHeader);

      $.each(item.contents, function GoThroughCategoryContents(_, content) {
        addTiles(content, categoryContainer, level + 1);
      });

      $(container).append(categoryContainer);

      return;
    }
    if (isForumoji) {
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
        .click(function SelectClicked() { 
          select(item);
        })
        .keydown(function SelectedViaKeyboard({ key }) {
          var Enter = 'Enter',
            Space = ' '
          if (key == Enter || key == Space)
            select(item);
        });

      $(container).append(tileImage);

      return;
    }
  }

  addTiles(unicodeEmoji, $('#list'), 0);
  hideEmptyCategories();

  let tiles = $('.tile'),
      randomTile = tiles[Math.floor(Math.random() * tiles.length)];
  $(randomTile).click();

  $('#search').on('input', function PerformSearch({ target: { value: query } }) {
    let JQueryBreak = false,
      unicodeRepr = query.split('')
        .map(string => string.codePointAt(0))
        .map(codepoint => codepoint.toString(16))
        .map(hexRep => (hexRep.length > 3 ? '' : '0'.repeat(4 - hexRep.length)) + hexRep)
        .map(unicode => 'U+' + unicode.toUpperCase())
        .join(' '),
      notFound = true;
    $('#list img').each(function PerformSearch() {
      var image = $(this);
      image.removeAttr('hidden');
      notFound = unicodeRepr !== image.attr('id');
      let classList = image.attr('class').split(' '),
        keywordList = classList.concat(['keyword-' + image.attr('alt')]);
      $.each(keywordList, function TestForKeywords(_, keyword) {
        if (!notFound)
          return JQueryBreak;
        let isKeyword = /^keyword-/.test(keyword),
          hasQueried = keyword.toLowerCase().slice(8).includes(query.toLowerCase());
        if (isKeyword && hasQueried)
          notFound = false;
      });
      if (notFound)
        image.attr('hidden', '');
    });

    hideEmptyCategories();
  });
}

// this can be done in CSS once :has() is widely supported
function hideEmptyCategories() {
  $('.category').attr('hidden', true);
  $('.tile[hidden!="hidden"]').parents('.category').removeAttr('hidden');
  /*
  .category:not(:has(.tile[hidden!="hidden"]))
  */
}

function select(emoji) {
  $('.selected').removeClass('selected');
  $(`#${emoji.codepoint}`).addClass('selected');

  let githubPath = `https://lopste.github.io/forumoji/resources/forumoji/${emoji.image}`;
  $('img.preview-image')
    .attr('src', 'resources/forumoji/' + emoji.image)
    .attr('alt', emoji.name);
  $('#emoji-codepoint').text(emoji.codepoint);
  $('#name').text(emoji.name);
  $('#keywords').text(emoji.keywords.join(', '));
  $('#contributors').html(emoji.author.join(',<br>'));

  $('#contributors-label').text('Emoji contributor:');
  if (emoji.author.length > 1)
    $('#contributors-label').text('Emoji contributors:');

  $('#bbcodeScratch').attr('value', `[img=${emoji.url}]`);
  $('#bbcodeGithub').attr('value', `[img=${githubPath}]`);
}

function copyBBCode(event) {
  let bbcodeElement = event.target.previousElementSibling,
      bbcode = bbcodeElement.value,
      host = bbcodeElement.dataset.host;
  navigator.clipboard.writeText(bbcode);
  copyIndicator(host);
}
$('.copy-button').on('click', copyBBCode)

var isFilling = {
  Scratch: false,
  Github: false,
}
function copyIndicator(type) {
  if (isFilling[type])
    return;
  var element = $(`#bbcode${type}`);
  element.addClass('filling');
  element.val('Copied!');
  isFilling[type] = true;
  setTimeout(function UnsetFillingMode() {
    element.removeClass('filling');
    element.val(element.attr('value'));
    isFilling[type] = false;
  }, 2000);
}