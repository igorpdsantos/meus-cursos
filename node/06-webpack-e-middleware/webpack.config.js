const path = require('path'); // CommonJS: é o Node que roda este arquivo, não o navegador.

module.exports = {
  mode: 'production',                          // `npm run dev` sobrescreve com --mode development
  entry: './frontend/main.js',                 // por onde o webpack começa a montar o bundle
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],  // traduz JS moderno para o que o browserslist pedir
            plugins: [
              // Injeta só o polyfill que o código realmente usa (Babel 8 tirou isto do preset-env).
              ['polyfill-corejs3', { method: 'usage-global', version: '3.46' }],  // por isso core-js é dependency
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],   // lê de trás para frente: css-loader e depois style-loader
      },
    ],
  },
  devtool: 'source-map',                       // gera o bundle.js.map, que liga o bundle ao código-fonte
};
