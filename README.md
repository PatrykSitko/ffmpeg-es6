# npm i ffmpeg-es6

An implementation of FFMPEG written in ES6.

First step is to download the FFMPEG binary:

- https://ffmpeg.org/download

The binary should be tight to the system path.

For windows:

- Create a system variable called FFMPEG_HOME that points to the FFMPEG folder.
- go to the "Environment Variables" section and add to system variable called path:
  - %FFMPEG_HOME%\bin

Now the FFMPEG-ES6 module should execute it's tasks.

To get started with:

```JavaScript
import FFMPEG from "ffmpeg-es6";

var verbose = false;
const inputFile = "path/to/file";
const outputFile = "path/to/file";

// requires an input file to be passed has also an optional second argument to specify is execution should be verbose.
const ffmpeg = new FFMPEG(inputFile,verbose);

// returns extracted video metadata an is by nature asynchronious.
ffmpeg.metadata.then(console.log).catch(console.error);

// change the file you're working with.
ffmpeg.changeFilePath(inputFile);

// add custom commands for ffmpeg to (aditionally) execute.
// default commands with predefined formats are set.
ffmpeg.addCommand("-ab", "64k");

// clears the whole ffmpeg commands cache that's executed on save.

ffmpeg.clearCommandCache();

// adds a format yourself can define to ffmpeg-es6 module.

ffmpeg.addFormat("720p",{
    "-c:a": "aac",
    "-ac": "2",
    "-ab": "256k",
    "-ar": "48000",
    "-c:v": "libx264",
    "-x264opts": `"keyint=24:min-keyint=24:no-scenecut"`,
    "-b:v": "1500k",
    "-maxrate": "1500k",
    "-bufsize": "1000k",
    "-vf": `"scale=-1:720"`,
  });

// FFMPEG.format is a frozen object that includes predefined command sets that produce a specific video format.

console.log(FFMPEG.format);

// ffmpeg.selectFormat adds all necessary commands to ffmpeg command cache in order to execute the production for the specified video format.
// Only one format can be specified, otherwise command cache commands will get overwritten with newly choosen format properties.

ffmpeg.selectFormat(FFMPEG.format["720p"]);
ffmpeg.selectFormat(FFMPEG.format["540p"]);

// in this case although there are previously selected formats, at save, format "360p" will be returned.
ffmpeg.selectFormat(FFMPEG.format["360p"]);

// ffmpeg.save is used to save the requested video format to and output file and is async.
// returns FFMPEG binary pipe stdout or stderr statement.
ffmpeg.save(outputFile).then(console.log).catch(console.error);
```

Hope you'll enjoy using this ffmpeg implementation written in JavaScript ES6 as myself did.

#BecauseWhyCommonJS
