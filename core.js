const linkTemplate = "https://{instance}.simprocloud.com/staff/taskDetails.php?taskID={id}&iframe=true"
const THEMES = ['98', 'xp', '7']

$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}

$(() => {
    $('#id-input').enterKey(() => {
        makeWebsiteGoNow();
    })

    const theme = localStorage.getItem('theme');
    setTheme(theme || THEMES[0]);

    const inst = localStorage.getItem('instance');
    if (inst) {
        $('#instance-input').val(inst);
    }
})

function clearTextbox() {
    $('#id-input').val('');
}

function setTheme(theme) {
    if (!THEMES.includes(theme)) return;

    $('#core-css').attr('href', `https://unpkg.com/${theme}.css`);
    $('html').attr('data-theme', theme);

    localStorage.setItem('theme', theme);
}

function makeWebsiteGoNow() {
    const id = $('#id-input').val();
    const instance = $('#instance-input').val();

    if (!instance || instance.trim() === "") {
        alert('You need to specify a simPRO instance!\n\nThis is the first part of your simPRO URL\ne.g. progroup.simprocloud.com has an instance name of progroup')
        return;
    }

    if (!id || id.trim() === "") {
        if (!confirm("You haven't specified a Task ID. This will create a new task in simPRO.\n\nAre you sure you want to continue?")) return;
    }

    localStorage.setItem('instance', instance);

    window.open(linkTemplate.replace('{instance}', instance).replace('{id}', id))
    clearTextbox();
}
