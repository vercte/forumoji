# Forumoji
![GitHub Repo stars](https://img.shields.io/github/stars/lopste/forumoji?style=flat&color=%23fd0&label=%20%E2%AD%90%20) ![GitHub watchers](https://img.shields.io/github/watchers/lopste/forumoji?style=flat&color=%23008cff&label=%F0%9F%94%8D)  
Forumoji is a project to remake existing Unicode emojis in the PunBB/DjangoBB style, mainly intended for use on the Scratch Forums.

## Contributing
Contributing is on hold for a while while we build systems to add emojis with the new format.
You may still make emojis and post them on the Scratch topic as you wish.
<!-- There are a few details to keep in mind when contributing emojis to the Forumoji project:
* Check the [Forumoji website](http://gh.vercte.net/forumoji) to make sure the emoji has not been contributed already, or the [missing emoji list](http://gh.vercte.net/forumoji/missing-emojis.html) for a list of emojis that still need to be made.
* Follow the [style guide](https://github.com/lopste/forumoji/blob/main/styleguide.md)! Different art styles are nice, but we want the emojis to stay consistent.
* Make sure the emoji does not break any of Scratch's [Community Guidelines](https://scratch.mit.edu/community_guidelines/), as well as any other rules that have been laid out by the Scratch Team. Also, check to make sure that the emoji that you're making is not in [the hidden/rejected emojis list](resources/hidden-emoji.json).
* Forumoji is only accepting emojis that actually exist; if it does not have a Unicode codepoint (U+XXXXX), it is not a valid emoji. A [complete list of valid emojis](https://unicode.org/emoji/charts/full-emoji-list.html) can be found on the official Unicode website.
* Your emoji should be 15x15 pixels in size; this allows the emojis to fit in line with text on the forums.

### Adding Emojis to the website
If you would like to add your emojis to the website, you should follow this process:
* Add your emojis to the `/resources/forumoji` folder.
* Add your emojis to `/resources/forumoji.json` in the following format:
```json
{
  "codepoint": "U+1F63A",
  "image": "grinning-cat.png",
  "assetsId": "f67743bb9153bd1b844b2651f6444c9c.svg",
  "author": [
    "uwv"
  ]
}
```
Here's what you should put in those sections:
* `codepoint`: Put the unicode codepoint of the emoji; if you can't find this, it's **not** an emoji!
* `image`: The filename of the emoji image in the `/resources/forumoji` folder. Make sure to include the extension!
* `assetsId`: The main part of the URL of the image hosted on assets.scratch.mit.edu
* `author`: The author(s), formatted as an array.
```json
"author": [
  "authorOne",
  "authorTwo"
]
```
Remember to add a comma after each new item in the list, but *don't* add one after the last new item. -->

## Scratch Forums
Forumoji has a [topic on the Scratch Forums](https://scratch.mit.edu/discuss/topic/557083/), where most discussion about the project takes place.

If you have a question, would like to request an emoji, or just want to talk about the project, this is a good place to do it.
