const path = require("path");
const fsOps = require("./modules/file");

function основнаяФункция() {
    const тестовыйФайл = path.join(__dirname, "test.txt");
    const путьКопииФайла = path.join(__dirname, "test_copy.txt");
    const тестоваяПапка = path.join(__dirname, "testFolder");

    fsOps.сохранитьВФайл(тестовыйФайл, "Hello WORLD!.18773");
    fsOps.загрузитьИзФайла(тестовыйФайл);
    fsOps.очиститьФайл(тестовыйФайл);
    fsOps.загрузитьИзФайла(тестовыйФайл);
    fsOps.копироватьФайл(тестовыйФайл, путьКопииФайла);
    fsOps.создатьПапку(тестоваяПапка);
    fsOps.показатьФайлы(__dirname);
    fsOps.удалитьФайл(тестовыйФайл);
    fsOps.удалитьФайл(путьКопииФайла);
    fsOps.стеретьПапку(тестоваяПапка);
    fsOps.очиститьДиректорию(__dirname);
}

основнаяФункция();