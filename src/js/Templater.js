class Templater {
    static partial(name, params = []) {

    }

    static __loadFile() {
        $.get('template.mst', function (template) {
            var rendered = Mustache.render(template, {name: "Luke"});
            $('#target').html(rendered);
        });
    }
}