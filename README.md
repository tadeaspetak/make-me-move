# Make Me Move

**Make Me Move** is a simple app whose sole goal is to, well, **make us all move a tiny bit more.**
If you are like me, you spend a good chunk of your (working) days in front of a screen.
And while focus is excellent for getting things done, too much of it makes my neck stiff,
my eyes sore and my back too damn arched. Make Me Move is an attempt to remedy or alleviate
these negative side effects of this kind of focus.

The app allows you to schedule reminders repeated at regular intervals between certain times of a day.
Once the time has come to *”Stretch your neck, it’s getting stiff!”*, *”Do your eye gymnastics, matey!”* or even
*”C’mon! Smile at someone :)”*, it shows a notification. That’s it, it can’t do no more, the rest is up to you.

Naturally, it can assist you in performing any task that requires little effort but needs to be repeated often enough.
Maybe, your new resolution is to drink 10 glasses of water a day. Or would you like to learn a new word every other hour?
I use to perform reality checks more frequently to improve my chances of [lucid dreaming](http://lucid.wikia.com/wiki/Reality_check).

Latest packaged versions of the app can be found
[here for OS X](http://make-me-move.tadeaspetak.net/MakeMeMove-darwin-x64.zip) and
[here for Windows](http://make-me-move.tadeaspetak.net/MakeMeMove-win32-ia32.zip).

## Development

### Run

To install the dependencies, simply run:

``` bash
npm i
```

Then, to start the app in development mode, run **both of the commands below** (you need two terminals or two tabs):

``` bash
# first tab, allowing hot swap
npm run watch
# second tab, the app itself, in development mode
npm run dev
```

To package the app, run one of the following:

``` bash
# OS X
npm run pack-mac
# Windows
npm run pack-win
# Linux
npm run pack-linux
```

### Electron

The app was created while experimenting with [Electron](http://electron.atom.io/) during a competence day at
[Jayway](https://jayway.com) in May, 2016. Electron is a framework that allows
you to create native desktop apps using web technologies. E.g. [Atom](https://atom.io/) or [Slack](https://slack.com/)
are written in it.

Let's have a look at an outline of the framework:

- You could see it as a version of [node.js](https://nodejs.org/en/) focused on desktop, rather than a server. Also,
it could be seen as minimal Chromium controlled by JavaScript.
- There are two types of processes - the **main** and **renderer** process. The main process has access
to native GUI and other resources and APIs. It manages child renderer processes which
are created by instantiating `BrowserWindow`. Each browser window runs in a separate thread and
it uses HTML, CSS and JavaScript to build GUI. Typically, you use asynchronous messaging systems, such as
`ipcMean` and `ipcRenderer` (or alternatively the `remote` module), to communicate between the two.
- Electron provides various modules for common tasks related to desktop integrations such as `tray`,
application & context `menu`, *recent documents*, *network tasks*, etc. `Notification`s are built
using the [HTML 5 Notification API](...) and Electron then relays such requests via native
APIs to the OS.
- It also offers numerous tools for handling common tasks such *automatic updates*, *crash reporting*,
*auto launching*, etc.

I have never written any desktop app in anything other than Java Swing and I remember that being hell.
My Electron experience has been incomparably more enjoyable and I would definitely take it into
consideration if I were to develop a serious desktop app.

### Tools & Environment

The great thing about developing a desktop app using the ubiquitous web stack is that
you have all your handy frameworks & tools at your disposal. Make Me Move has been written
using [React](https://facebook.github.io/react/) and [Webpack](https://webpack.github.io/).

This makes it relatively easy to, for example, set up hot swapping which is quite rare in
the realm of native desktop apps. Check the source to see how it's done.
