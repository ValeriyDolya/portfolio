import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    // Looking for .otf font files
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
        })
    ))
    // Converting to .ttf
    .pipe(fonter({
        formats: ['ttf']
    }))
    // Saving to original folder
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    // Looking for .ttf font files
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
        })
    ))
    // Converting to .woff
    .pipe(fonter({
        formats: ['woff']
    }))
    // Saving to resulting folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // Looking for .ttf font files
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // Converting to .woff2
    .pipe(ttf2woff2())
    // Saving to the resulting folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontstyle = () => {
    // Style file to connect fonts
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // Checking if font files exists
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFile) {
            // Checking if style file exists to fonts be connected
            if (!fs.existsSync(fontsFile)) {
                // Creating file, if not exist
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // Save fonts connection to style file
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        // fs.appendFile(fontsFile,
                        //     `@font-face {
                        //         font-family: ${fontName};
                        //         font-display: swap;
                        //         src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff")
                        //         font-weight: ${fontWeight};
                        //         font-style: normal;
                        //     }\r\n`, cb);
                        fs.appendFile(fontsFile,`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // If file exists, show message
                console.log("File scss/fonts.scss exists allready. To update file it must be deleted!"); 
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}