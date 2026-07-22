# Thor Janitor Web

<p align="center">
  <img width="600" height="auto" src="https://github.com/thorvg/thorvg.janitor/blob/main/title.png">
</p>

Web port of [thorvg.janitor](https://github.com/thorvg/thorvg.janitor), running on the [@thorvg/webcanvas](https://www.npmjs.com/package/@thorvg/webcanvas).

## Development

```
$ npm install
$ npm run dev       # dev server
$ npm run build     # type-check + production build (`dist/`)
$ npm run preview   # serve the production build locally
```

## Render flags

Switch renderer with a URL param:

- Software: `?renderer=sw` (default)
- WebGL: `?renderer=gl`
- WebGPU: `?renderer=wg`

Enable multithreaded rendering:

- On: `?threads=4` (default)
- Off: `?threads=0`

## Controls

- **Arrow Keys**: Movement
- **A**: Shoot


## Deployment

The multithreaded build uses `SharedArrayBuffer`, page requires to expose [cross-origin-isolated](https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated).:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

## Credits

- **Original Project:** [ThorVG Janitor](https://github.com/thorvg/thorvg.janitor)
- **Programming:** [LottieFiles](https://lottiefiles.com/) ([Jinny You](https://github.com/tinyjin))
- **Spaceship Design:** [LottieFiles](https://lottiefiles.com/) (Lana Nguyen, Mau Ali)
- **Sound Effects:** [Leszek_Szary](https://pixabay.com/users/freesound_community-46691455/)