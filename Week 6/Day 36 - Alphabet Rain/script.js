const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz");

document.body.append(
    alphabet.reduce((wrapper, name) => {
        const kbd = document.createElement("kbd");
        kbd.dataset.key = name;
        kbd.textContent = name;
        wrapper.append(kbd);
        return wrapper;
    }, document.createDocumentFragment())
);

window.addEventListener("keydown", (evt) => {
    if (evt.isTrusted) {
        clearInterval(timer);
    }
    const target = document.querySelector(`[data-key=${evt.key}]`);
    target.style.viewTransitionName = `kbd-${evt.key}`;
    const trans = document.startViewTransition(() => {});

    trans.finished.finally(() => {
        target.style.viewTransitionName = "";
    });
});

var timer = setInterval(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: alphabet[Math.floor(Math.random() * 26)] }));
}, 1000);