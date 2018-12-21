# generator-oxy-gen
OXY-GEN is an open-source cli tool that helps developers quickly create native desktop apps using React and Rust!

It uses Electron to build the native app, create-react-app to generate a fresh React app, and uses Web Assembly to bind the Rust functions.

OXY-GEN includes a recursive fibonacci algorithm written in Node.js and Rust. It uses Web Workers to run both languages in parallel to showcase the speed difference.

## Install generator
```
npm i -g yo generator-oxy-gen
```
## Install dependencies
```
npm i -g create-react-app
```
## Usage
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
