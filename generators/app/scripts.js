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

OLD_META = `"private": true,`;

NEW_META = (projectName, projectNameKebab) => `"private": true,
  "homepage": "./",
  "main": "public/electron.js",
  "description": "An Electron app written in React with Rust (Web Assembly)",
  "author": "Some Person",
  "build": {
    "productName": "${projectName}",
    "appId": "com.sample.${projectNameKebab}",
    "files": [
      "build/**/*",
      "!node_modules/**/*"
    ],
    "directories": {
      "buildResources": "assets"
    },
    "dmg": {
      "contents": [
        {
          "x": 110,
          "y": 150
        },
        {
          "x": 240,
          "y": 150,
          "type": "link",
          "path": "/Applications"
        }
      ]
    },
    "linux": {
      "category": "Utility",
      "target": [
        "AppImage",
        "deb"
      ]
    },
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64",
            "ia32"
          ]
        }
      ]
    }
  },`;

module.exports = {
  OLD_SCRIPTS,
  NEW_SCRIPTS,
  OLD_META,
  NEW_META
};