const fs = require("fs");
const path = require("path");

function сохранитьВФайл(путьКФайлу, содержимое) {
    fs.writeFileSync(путьКФайлу, содержимое, "utf8");
    console.log(`Создан файл: ${путьКФайлу}`);
}

function загрузитьИзФайла(путьКФайлу) {
    const данные = fs.readFileSync(путьКФайлу, "utf8");
    console.log(`Файл содержит:\n${данные}`);
    return данные;
}

function изменитьФайл(путьКФайлу, новоеСодержимое) {
    fs.writeFileSync(путьКФайлу, новоеСодержимое, "utf8");
    console.log(`Обновлен файл: ${путьКФайлу}`);
}

function удалитьФайл(путьКФайлу) {
    if (fs.existsSync(путьКФайлу)) {
        fs.unlinkSync(путьКФайлу);
        console.log(`Удален файл: ${путьКФайлу}`);
    } else {
        console.log(`Файл отсутствует: ${путьКФайлу}`);
    }
}

function очиститьФайл(путьКФайлу) {
    if (!fs.existsSync(путьКФайлу)) {
        console.log(`Файл отсутствует: ${путьКФайлу}`);
        return;
    }
    let данные = fs.readFileSync(путьКФайлу, "utf8");
    данные = данные.replace(/\d+/g, "").toLowerCase();
    fs.writeFileSync(путьКФайлу, данные, "utf8");
    console.log(`Очищен файл: ${путьКФайлу}`);
}

function копироватьФайл(источник, назначение) {
    if (fs.existsSync(источник)) {
        fs.copyFileSync(источник, назначение);
        console.log(`Скопирован ${источник} в ${назначение}`);
    } else {
        console.log(`Исходный файл отсутствует: ${источник}`);
    }
}

function создатьПапку(путьКПапке) {
    if (!fs.existsSync(путьКПапке)) {
        fs.mkdirSync(путьКПапке, { recursive: true });
        console.log(`Создана папка: ${путьКПапке}`);
    } else {
        console.log(`Папка уже есть: ${путьКПапке}`);
    }
}

function стеретьПапку(путьКПапке) {
    if (fs.existsSync(путьКПапке)) {
        fs.rmSync(путьКПапке, { recursive: true, force: true });
        console.log(`Удалена папка: ${путьКПапке}`);
    } else {
        console.log(`Папка отсутствует: ${путьКПапке}`);
    }
}

function показатьФайлы(путьКПапке) {
    if (!fs.existsSync(путьКПапке)) {
        console.log(`Папка отсутствует: ${путьКПапке}`);
        return;
    }
    const файлы = fs.readdirSync(путьКПапке, { withFileTypes: true });
    файлы.forEach(файл => {
        if (файл.name.startsWith(".") || файл.name === "node_modules") return;
        const полныйПуть = path.join(путьКПапке, файл.name);
        console.log(полныйПуть);
        if (файл.isDirectory()) {
            показатьФайлы(полныйПуть);
        }
    });
}

function очиститьДиректорию(путьКПапке) {
    fs.readdirSync(путьКПапке).forEach(файл => {
        let полныйПуть = path.join(путьКПапке, файл);
        if (!['.git', 'node_modules', 'index.js', 'files.js', '.gitignore', 'modules', 'libs'].includes(файл)) {
            if (fs.statSync(полныйПуть).isDirectory()) {
                стеретьПапку(полныйПуть);
            } else {
                fs.unlinkSync(полныйПуть);
            }
        }
    });
}

module.exports = {
    сохранитьВФайл,
    загрузитьИзФайла,
    изменитьФайл,
    удалитьФайл,
    очиститьФайл,
    копироватьФайл,
    создатьПапку,
    стеретьПапку,
    показатьФайлы,
    очиститьДиректорию
};