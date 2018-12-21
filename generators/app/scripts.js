/**
 * Strings with the exact text to replace for the scripts section of the package
 **/

OLD_SCRIPTS = `"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },`;

NEW_SCRIPTS = `"scripts": {
    "dev": "nf start",
    "build": "npm run build-wasm && npm run build-bindgen && cp rust-build/*.wasm public/ && react-scripts build",
    "test": "react-scripts test",
    "start": "react-scripts start",
    "eject": "react-scripts eject",
    "electron": "electron .",
    "electron-dev": "ELECTRON_START_URL=http://localhost:3000 electron .",
    "build-wasm": "cargo build --target wasm32-unknown-unknown",
    "build-bindgen": "mkdir ./rust-build/; wasm-bindgen --no-typescript target/wasm32-unknown-unknown/debug/rust.wasm --out-dir rust-build",
    "postinstall": "install-app-deps",
    "pack": "build --dir",
    "dist": "build",
    "electron-pack": "build --mac --linux --armv7l --win",
    "preelectron-pack": "yarn build"
  },`;

module.exports = {
  OLD_SCRIPTS,
  NEW_SCRIPTS
};