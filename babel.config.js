module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'], // Set the root directory of your project
          alias: {
            '@': './src' // Add aliases for your module imports
          }
        }
      ]
    ]
  };
  