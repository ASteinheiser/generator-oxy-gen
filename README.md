# generator-oxy-gen
OXY-GEN is an open-source cli tool that helps developers quickly create native desktop apps using React and Rust!

It uses Electron to build the native app, create-react-app to generate a fresh React app, and uses Web Assembly to bind the Rust functions.

OXY-GEN includes a recursive fibonacci algorithm written in Node.js and Rust. It uses Web Workers to run both languages in parallel to showcase the speed difference.

Here is a [demo project](https://github.com/ASteinheiser/oxy-gen-demo) generated with this generator.

## Install Yeoman and this Generator
```
npm install -g yo generator-oxy-gen
```
# Install dependencies
## Install CRA
```
npm install -g create-react-app
```
## Setup Rust Toolchain
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
