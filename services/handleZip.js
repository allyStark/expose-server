const JSzip = require('jszip');

module.exports = async (buffer) => {
    const jszip =  new JSzip();
    const files = await jszip.loadAsync(buffer);
    // TODO make regular expressions handle all cases (once we've decided on all cases....)
    // test for already bundled....
    const dist = files.file(/src/);
    if (dist) {
        const zipped = await jszip.generateAsync({
            type: 'nodebuffer'
        });
        return zipped;
    }
    // test for webpack config file
    const config = files.file(/webpack/);
    if (config) {
        const zipped = await jszip.generateAsync({
            type: 'nodebuffer'
        });
        // start compilebox and return some kind of promise
        return;
    }
    // no config or dist. Try and upload original zip.
    return buffer;
}
