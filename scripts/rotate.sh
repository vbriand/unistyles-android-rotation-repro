#!/bin/bash
# Rotates the connected Android device or emulator back and forth, saving a
# screenshot 2.5 s after each rotation into screenshots/run/.
# Usage: scripts/rotate.sh [rotations, default 40]
set -e
N=${1:-40}
OUT="$(dirname "$0")/../screenshots/run"
mkdir -p "$OUT"
adb shell settings put system accelerometer_rotation 0
for i in $(seq 1 "$N"); do
  r=$((i % 2))
  adb shell settings put system user_rotation $r
  sleep 2.5
  adb exec-out screencap -p > "$OUT/$(printf %03d "$i")-$([ $r = 0 ] && echo portrait || echo landscape).png"
done
adb shell settings put system user_rotation 0
echo "Saved $N screenshots to $OUT"
