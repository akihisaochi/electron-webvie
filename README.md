# electron webwiew packager

electron webwiew packager

## how to build you own webview app

### 1. clone this repository
```
npm i
```

### 2. edit config.json
Lets' edit config.json to be of practical use to you.
```
{
  "APP_NAME": "webview-app",
  "WEBVIEW_URL": "https://electronjs.org/",
  "APP_VERSION": "1.0.0"
}
```

### 3. replace icon.json
You must replace icon.icns and icon.ico.

### 4. build
type below command.
```
npm run build
```

And then, dist folder will be created.
