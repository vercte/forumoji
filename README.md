# Forumoji
![GitHub Repo stars](https://img.shields.io/github/stars/lopste/forumoji?color=%23fd0&label=%20%E2%AD%90%20) ![GitHub watchers](https://img.shields.io/github/watchers/lopste/forumoji?color=%23008cff&label=%F0%9F%94%8D)  
Forumoji is a project to remake existing Unicode emojis in the DjangoBB style, mainly intended for use on the Scratch Forums.

## Contributing
There are a few details to keep in mind when contributing emojis to the Forumoji project:
* Check the [Forumoji website](lopste.github.io/forumoji) to make sure the emoji has not been contributed already.
* Make sure the emoji does not break any of Scratch's [Community Guidelines](https://scratch.mit.edu/community_guidelines/), as well as any other rules that have been laid out by the Scratch Team.
* Forumoji is only accepting emojis that actually exist; if it does not have a Unicode codepoint (U+XXXXX), it is not a valid emoji. A [complete list of valid emojis](https://unicode.org/emoji/charts/emoji-list.html) can be found on the official Unicode website.
* Your emoji should be 15x15 pixels in size; this allows the emojis to fit in line with text on the forums.

### Adding Emojis to the website
If you would like to add your emojis to the website, you should follow this process:
* Add your emojis to the `/resources/forumoji` folder.
* Upload your emojis to [Cubeupload](https://cubeupload.com); please note that Cubeupload requires users to create an account before uploading images.
* Add your emojis to `/resources/forumoji.json` in the following format:
```
{
  "codepoint": "U+1F63A",
  "image": "smileycat.png",
  "url": "https://u.cubeupload.com/zani/smileycat.png",
  "author": "uwv"
}

remember to add a comma after the old last item in the list, and *don't* add one after the new last item.
```
* Emojis are found [here](lopste.github.io/forumoji).

## Scratch
Forumoji has a [topic on the Scratch Forums](https://scratch.mit.edu/discuss/topic/557083/); this is where most discussion about the project takes place, including important updates from @lopste. Some contributors may opt to post their emojis on Scratch first before contributing them here.
