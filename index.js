const { spawn } = require("child_process");
const fs = require("fs");
const process = require("process");

// ---------------- SONGS ----------------

const path = "./songs";
const songs = fs.readdirSync(path).filter((song) => song.endsWith(".mp3"));

let selected = 1;
let childProcess = null;

let duration = 0;
let elapsed = 0;
let progressTimer = null;
let isPaused = false;

// ---------------- DISPLAY ----------------

function showSongs() {
  console.clear();

  console.log("🎵 CLI MUSIC PLAYER\n");
  console.log("Use ↑ ↓ to navigate");
  console.log("Press Enter to Play");
  console.log("P = Pause | R = Resume | Q = Quit\n");

  console.log("Songs:\n");

  songs.forEach((song, index) => {
    const name = song.replace(".mp3", "");

    if (selected === index + 1) {
      console.log(`➡ ${index + 1}. ${name}`);
    } else {
      console.log(`   ${index + 1}. ${name}`);
    }
  });

  console.log("\n-----------------------------");

  if (childProcess) {
    console.log(`Now Playing : ${songs[selected - 1].replace(".mp3", "")}`);
    console.log(`Status      : ${isPaused ? "Paused ⏸️" : "Playing ▶️"}`);

    const percent =
      duration > 0 ? Math.min(Math.floor((elapsed / duration) * 100), 100) : 0;

    const filled = Math.floor(percent / 10);
    const bar = "█".repeat(filled) + "░".repeat(10 - filled);

    console.log(`Duration    : ${elapsed}s / ${duration}s`);
    console.log(`Progress    : [${bar}] ${percent}%`);
  } else {
    console.log("Now Playing : None");
  }

  console.log("-----------------------------");
}

showSongs();

// ---------------- DURATION ----------------

function getDuration(song) {
  duration = 0;

  const info = spawn("afinfo", [`./songs/${song}`]);

  info.stdout.on("data", (data) => {
    const text = data.toString();
    const match = text.match(/estimated duration: ([0-9.]+)/);

    if (match) {
      duration = Math.floor(Number(match[1]));
      showSongs();
    }
  });
}

// ---------------- PROGRESS BAR ----------------

function startProgress() {
  clearInterval(progressTimer);

  progressTimer = setInterval(() => {
    if (!isPaused) {
      elapsed++;

      if (elapsed >= duration && duration > 0) {
        clearInterval(progressTimer);
        progressTimer = null;
      }

      showSongs();
    }
  }, 1000);
}

// ---------------- PLAYER ----------------

function player(songNumber) {
  // Stop currently playing song first
  if (childProcess) {
    childProcess.removeAllListeners("close");

    childProcess.once("close", () => {
      childProcess = null;
      startPlayer(songNumber);
    });

    childProcess.kill("SIGKILL");
    return;
  }

  startPlayer(songNumber);
}

function startPlayer(songNumber) {
  clearInterval(progressTimer);

  elapsed = 0;
  duration = 0;
  isPaused = false;

  childProcess = spawn("afplay", [`./songs/${songs[songNumber - 1]}`]);

  getDuration(songs[songNumber - 1]);
  startProgress();
  showSongs();

  childProcess.on("close", () => {
    clearInterval(progressTimer);
    progressTimer = null;

    childProcess = null;
    elapsed = 0;
    duration = 0;
    isPaused = false;

    showSongs();
  });
}

// ---------------- PAUSE / RESUME ----------------

function pause() {
  if (!childProcess || isPaused) return;

  childProcess.kill("SIGSTOP");
  isPaused = true;

  showSongs();
}

function resume() {
  if (!childProcess || !isPaused) return;

  childProcess.kill("SIGCONT");
  isPaused = false;

  showSongs();
}

// ---------------- QUIT ----------------

function quit() {
  clearInterval(progressTimer);

  if (childProcess) {
    childProcess.removeAllListeners("close");
    childProcess.kill("SIGKILL");
    childProcess = null;
  }

  process.stdin.setRawMode(false);
  process.stdin.pause();

  console.clear();
  console.log("Music Player Closed 👋");

  process.exit(0);
}

// ---------------- KEYBOARD CONTROLS ----------------

process.stdin.setEncoding("utf8");
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdin.on("data", (input) => {
  // Quit
  if (input === "q") {
    quit();
    return;
  }

  // Pause
  if (input === "p") {
    pause();
    return;
  }

  // Resume
  if (input === "r") {
    resume();
    return;
  }

  // Enter key
  if (input === "\r") {
    player(selected);
    return;
  }

  // Up Arrow
  if (input[2] === "A") {
    if (selected > 1) {
      selected--;
      showSongs();
    }
    return;
  }

  // Down Arrow
  if (input[2] === "B") {
    if (selected < songs.length) {
      selected++;
      showSongs();
    }
    return;
  }
});