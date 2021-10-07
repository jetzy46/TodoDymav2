# BOILERPLATE JS Dyma

Le repo est la base du cours JS sur dyma.fr

Créer uniquement dans le but de repartir sur une base saine à chaque chapitre

## **Etapes pour chaque projet**

### Initialiser NPM

```terminal
npm init -y
```

Créer un fichier _package.json_. Penser à changer le nom du projet !

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

### Editer le fichier _babel.config.js_

```js
module.exports = {
  presets: [["@babel/preset-env"]],
};
```

### Créer un dossier _src_

Créer un dossier _src_ à la racine du projet. Il contiendra tout les fichiers JS avant transformation (par Babel ou Webpack)

### Créer un dossier _dist_

Créer un dossier _dist_ à la racine du projet. Il contiendra tout les fichiers JS après transformation (par Babel ou Webpack)

Il ne faut surtout pas éditer le code qui si trouve ! Tout changement dans le JS doit se faire dans le dossier _src_ !

### Installer Webpack

```terminal
npm i webpack webpack-cli webpack-dev-server
```

### Créer un fichier _webpack.config.js_

Créer un fichier _webpack.config.js_ à la racine du projet. il contiendra toute la configuration nécessaire au fonctionnement de Webpack

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

### Installer le plugin _HtmlWebpackPlugin_

```terminal
npm i html-webpack-plugin
```

### Intégrer le JS dans le HTML

Il n'y a pas besoin de mettre de balise script dans le fichier HTML. Le plugin _HtmlWebpackPlugin_ s'occupe d'intégrer le futur bundle JS dans le fichir html

### Installer le plugin _Babel-loader_

```terminal
npm i babel-loader
```

### Ajouter 2 nouveaux scripts

Dans le fichier _package.json_, ajouter 2 nouveaux script:

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

Le script _webpack_ sert a compiler les fichiers se trouvant dans le dossier _src_, et ainsi créer les éléments du dossier _dist_

Le script _start_ permet de lancer un serveur local, à l'adresse:

```
http://localhost:4000/
```

Cette adresse peut être changé dans le fichier _webpack.config.js_

## Gestion du CSS

Pour commencer, il faut ajouter 2 nouveaux plugin : _css-loader_ et _style-loader_

```terminal
npm i css-loader style-loader
```

Dans le fichier _webpack.config.js_, on ajouter une nouvelle _rule_

```javascript
{
    test: /\.css$/i,
    use: ["style-loader", "css-loader"]
},
```

Le _$_ est utilisé pour dire que ça doit terminer par _.css_ . Le _i_ lui sert à dire que la casse est peu important ( le fichier peut être _.Css_, _.CSS_ il le prendra en compte pareil)

On peut maintenant ajouter un fichier _style.css_ dans le dossier _src_. Mais l'import ne se fait plus dans le fichier _index.html_, mais dans le fichier _index.js_.

Tout en haut du fichier, il faut ajouter un import:

```javascript
import "./style.css";
```

Le CSS se mettra à jour à chaque sauvegarde, comme le JS.

Pour le HTML, il faudra refaire un _build_ à chaque fois
