# **Etapes pour chaque projet**



### Initialiser NPM

```terminal
npm init -y
```

créer un fichier *package.json*. Penser à changer le nom du projet !

### Créer plusieurs fichiers à la racine du projet

Créer 3 fichiers :

```
index.html
babel.config.js
script.js
```

### Installer les packages de Babel

```terminal
npm i @babel/core @babel/cli @babel/preset-env 
```

### Editer le fichier *babel.config.js*

```js
module.exports = {
  presets: [["@babel/preset-env"]],
};
```

### Créer un dossier *src*

Créer un dossier *src* à la racine du projet. Il contiendra tout les fichiers JS avant transformation (par Babel ou Webpack)

### Créer un dossier *dist*

Créer un dossier *dist* à la racine du projet. Il contiendra tout les fichiers JS après transformation (par Babel ou Webpack)

Il ne faut surtout pas éditer le code qui si trouve ! Tout changement dans le JS doit se faire dans le dossier *src* !

### Installer Webpack

```terminal
npm i webpack webpack-cli webpack-dev-server
```

### Créer un fichier *webpack.config.js*

Créer un fichier *webpack.config.js* à la racine du projet. il contiendra toute la configuration nécessaire au fonctionnement de Webpack

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
  devtool: "source-map",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    open: true,
    port: 4000,
  },
};
```

### Installer le plugin *HtmlWebpackPlugin*

```terminal
npm i html-webpack-plugin
```

### Intergrer le JS dans le HTML

Il n'y a pas besoin de mettre de balise script dans le fichier HTML. Le plugin *HtmlWebpackPlugin* s'occupe d'intégrer le futur bundle JS dans le fichir html

### Installer le plugin *Babel-loader*

```terminal
npm i babel-loader
```

### Ajouter 2 nouveaux scripts

Dans le fichier *package.json*, ajouter 2 nouveaux script:

```javascript
"webpack": "webpack",
"start": "webpack serve"
```

Pour lancer ces commandes :

```terminal
npm run webpack
```

```terminal
npm start
```

Le script *webpack* sert a compiler les fichiers se trouvant dans le dossier *src*, et ainsi créer les éléments du dossier *dist*

Le script *start* permet de lancer un serveur local, à l'adresse: 

```
http://localhost:4000/
```

Cette adresse peut être changé dans le fichier *webpack.config.js* 
