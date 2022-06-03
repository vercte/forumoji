window.onload = function() {
  $.getJSON('resources/unicode-emoji.json', function(unicodeEmoji) {
    $.getJSON('resources/forumoji.json', function(forumoji) {
      $.getJSON('resources/hidden-emoji.json', function(hiddenEmoji) {
        // add forumoji data to unicode list
        function formatList(item) {
          if (item.comment) {
            delete item.comment;
          }

          if (item.category) {
            //remove hidden and completed emojis
            item.contents = item.contents.filter(e => !(
              hiddenEmoji.codepoints.find(c => c == e.codepoint) ||
              forumoji.emoji.find(f => (f.codepoint == e.codepoint))
            ));

            $.each(item.contents, function(index, content) {
              formatList(content);
            });

            // remove fully completed subcategories
            item.contents = item.contents.filter(e => !(e.category && e.contents.length == 0));
          } else if (item.codepoint) {
            item.emoji = item.codepoint.split(' ')
              .map(c => String.fromCodePoint(parseInt(c.replace('U+', ''), 16)))
              .join('');
          }
        }

        formatList(unicodeEmoji);

        // create tile list
        function addList(item, container, level) {
          if (item.category) {
            if (level > 0) {
              $(container).append(`
                <tr>
                  <th colspan="3">
                    <h${level}>${item.category}</h${level}>
                  </td>
                </tr>
              `);
            }

            $.each(item.contents, function(index, content) {
              addList(content, container, level + 1);
            });
          } else if (item.codepoint) {
            $(container).append(`
              <tr>
                <td class="emoji">
                  ${item.emoji}
                </td>
                <td class="link">
                  <a href="https://emojipedia.org/${item.emoji}/">
                    ${item.name}
                  </a>
                </td>
                <td class="codepoint">
                  ${item.codepoint}
                </td>
              </tr>
            `);
          }
        }

        addList(unicodeEmoji, $('#list'), 0);
      });
    });
  });
};
