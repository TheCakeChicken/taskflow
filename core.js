const linkTemplate = "https://{instance}.simprocloud.com/staff/taskDetails.php?taskID={id}&iframe=true"

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

    const inst = localStorage.getItem('instance');
    if (inst) {
        $('#instance-input').val(inst);
    }
})

function close() {
    window.close();
}

function clearTextbox() {
    $('#id-input').val('');
}

function makeWebsiteGoNow() {
    const id = $('#id-input').val();
    const instance = $('#instance-input').val();

    localStorage.setItem('instance', instance);

    window.open(linkTemplate.replace('{instance}', instance).replace('{id}', id))
    clearTextbox();
}