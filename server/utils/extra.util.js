const fs = require('fs-extra');

const removeImgLocal = async filePath => await fs.remove(filePath);

module.exports = {
  removeImgLocal,
};
