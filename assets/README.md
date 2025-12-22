# EKOPLAY Assets Directory

This directory contains all visual assets for the EKOPLAY demo gallery.

## Directory Structure

```
assets/
├── thumbnails/          # Action shot thumbnails for demo gallery cards
│   ├── boxing.png
│   ├── basketball.png
│   ├── cricket.png
│   ├── football.png
│   ├── jump.png
│   └── tennis.png
│
└── waveforms/          # Audio waveform visualizations for each demo
    ├── waveform1.png                  # Boxing waveforms
    ├── waveform2.png
    ├── waveform3.png
    ├── waveform_basketball1.png       # Basketball waveforms
    ├── waveform_basketball2.png
    ├── waveform_basketball3.png
    ├── waveform_cricket1.png          # Cricket waveforms
    ├── waveform_cricket2.png
    ├── waveform_cricket3.png
    ├── waveform_football1.png         # Football waveforms
    ├── waveform_football2.png
    ├── waveform_football3.png
    ├── waveform_jump1.png             # Jump waveforms
    ├── waveform_jump2.png
    ├── waveform_jump3.png
    ├── waveform_tennis1.png           # Tennis waveforms
    ├── waveform_tennis2.png
    └── waveform_tennis3.png
```

## Usage

### Thumbnails
- Used in `demo-gallery.html` as preview images for each sport demo
- Recommended size: 350x200px (16:9 aspect ratio)
- Format: PNG with transparency support

### Waveforms
- Used in `index.html` to visualize audio tracks for each video
- Each demo has 3 waveforms (one per video source)
- Format: PNG with gradient overlays

## Naming Convention

- **Thumbnails**: `{sport}.png` (e.g., `boxing.png`)
- **Waveforms**: `waveform_{sport}{number}.png` (e.g., `waveform_boxing1.png`)
  - Exception: Original boxing demo uses `waveform1.png`, `waveform2.png`, `waveform3.png`
