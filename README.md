# generator-oxy-gen
OXY-GEN is an open-source cli tool that helps developers quickly create native desktop apps using React and Rust!

Here is a [demo project](https://github.com/ASteinheiser/oxy-gen-demo) generated with this generator.

<img src="https://raw.githubusercontent.com/ASteinheiser/generator-oxy-gen/master/OXY-GEN%20Demo%20Screenshot.png" alt="OXY-GEN Demo Screenshot" width="600"/>

# Features
- Generator built with [Yeoman](https://yeoman.io/)
- Uses [create-react-app](https://facebook.github.io/create-react-app/) to generate a fresh [React](https://reactjs.org/) project
- Builds cross platform app with [Electron](https://electronjs.org/)
- Compiles [Rust](https://www.rust-lang.org/) to [Web Assembly](https://webassembly.org/)
- Comes with [multithreading](https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)) example via [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

# Get Started!
## Install CRA (>= v2.1.0)
```
npm install -g create-react-app
```
## Rust Toolchain
### Install Rustup
```
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
```
### Select Nightly Version (for WASM support)
```
rustup default nightly
```
### Install WASM bindgen and add target
```
rustup target add wasm32-unknown-unknown
cargo install wasm-bindgen-cli
```
## Install Yeoman
```
npm install -g yo
```
## Install this Generator
```
npm install -g generator-oxy-gen
```

# Usage
```
yo oxy-gen
```
#### OR

Run the command with `--force` to overwrite the appropriate files during generation. Otherwise, the user will need to approve each file (Theres's only about 5 or so).
```
yo oxy-gen --force
```
And if you prefer `yarn` to `npm`, you can use the `--yarn` flag to set your default package manager.
```
yo oxy-gen --yarn
```
