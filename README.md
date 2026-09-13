# CLI Music Player

A simple **Terminal-based Music Player** built with **Node.js** for macOS. Browse songs using your keyboard, play MP3 files directly from the terminal, pause/resume playback, and view a live progress bar — all without leaving the command line.

## Features

- 🎶 Automatically detects all `.mp3` files inside the `songs/` folder.
- ⌨️ Keyboard navigation using **Up** and **Down** arrow keys.
- ▶️ Play a selected song with the **Enter** key.
- ⏸️ Pause the currently playing song with **P**.
- ▶️ Resume playback with **R**.
- ⏹️ Stops the previous song before playing a new one.
- 📊 Displays a live progress bar with playback percentage.
- ⏱️ Shows elapsed time and total song duration.
- 🚪 Quit the player instantly with **Q**.

---

## Preview

```text
🎵 CLI MUSIC PLAYER

Use ↑ ↓ to navigate
Press Enter to Play
P = Pause | R = Resume | Q = Quit

Songs:

➡ 1. Blinding Lights
   2. Perfect
   3. Until I Found You

-----------------------------
Now Playing : Blinding Lights
Status      : Playing ▶️
Duration    : 34s / 180s
Progress    : [██░░░░░░░░] 18%
-----------------------------
```

---

## Tech Stack

- **Node.js**
- `child_process` (to control audio playback)
- `fs` (to read songs from the directory)
- `process` (for keyboard input and terminal controls)

No external npm packages are required.

---

## Platform Compatibility

### Supported

-  **macOS**

This project uses two macOS command-line utilities:

- `afplay` – Plays audio files.
- `afinfo` – Retrieves audio duration.

Both are pre-installed on macOS, so no additional software is needed.

### Not Supported (Current Version)

- ❌ Windows
- ❌ Linux

These operating systems do not include `afplay` or `afinfo`.

---

## 📁 Project Structure

```text
CLI-Music-Player/
│
├── songs/
│   ├── song1.mp3
│   ├── song2.mp3
│   └── song3.mp3
│
├── index.js
├── package.json
└── README.md
```

Place all your **MP3 files** inside the `songs/` folder.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CLI-Music-Player
```

### 2. Add Your Songs

Create a `songs` folder if it doesn't exist.

```bash
mkdir songs
```

Copy your `.mp3` files into it.

```text
songs/
├── Believer.mp3
├── Heat Waves.mp3
└── Night Changes.mp3
```

### 3. Install Node.js

Download and install Node.js if it's not already installed.

Verify installation:

```bash
node -v
npm -v
```

### 4. Run the Music Player

```bash
node index.js
```

The player will scan the `songs/` directory and display all available tracks.

---

##  Controls

| Key | Action |
|------|--------|
| ↑ | Move selection up |
| ↓ | Move selection down |
| Enter | Play selected song |
| P | Pause current song |
| R | Resume paused song |
| Q | Stop playback and quit |

---

## How It Works

1. Reads all `.mp3` files from the `songs/` folder.
2. Displays them in an interactive terminal menu.
3. Uses `afplay` to play audio in a child process.
4. Uses `SIGSTOP` and `SIGCONT` signals to pause and resume playback.
5. Uses `afinfo` to fetch song duration and update a live progress bar every second.

---

##  Limitations

- Supports **MP3 files only**.
- Designed specifically for **macOS**.
- Progress bar is timer-based and may be off by a second or two depending on system scheduling.
- No volume, shuffle, repeat, or playlist support in the current version.

---

## Possible Future Improvements

- 🔀 Shuffle mode.
- 🔁 Repeat one / repeat all.
- 🔊 Volume controls.
- ⏩ Seek forward and backward.
- ❤️ Favorites playlist.
- 📂 Multiple playlists.
- 🎨 Terminal visualizer.
- 🎵 Album art and metadata display.
- ⏭️ Next / Previous song shortcuts.
- 🔍 Search songs by name.

---

## Author

Built by **Maharshi Desai** as a Node.js CLI project to explore child processes, terminal interaction, and file system operations.
