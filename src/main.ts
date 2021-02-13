function hoge(): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
        reject(new Error("hoge"));
    });
}

function fuga(): Promise<string> {
    return new Promise((resolve: Function, reject: Function) => {
        reject(new Error("fuga"));
    });
}

async function main() {
    const a1 = await hoge();
    const a2 = await fuga();
    const x = await hoge()
        .then((v) => console.log(v))
        .catch((e: Error) => console.error(e)); // catchがないとUnhandledPromiseRejectionWarningが出る
    console.log(x);
}

main();