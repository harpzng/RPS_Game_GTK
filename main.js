const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;

var RpsGameWindow = GObject.registerClass({
    GTypeName: 'RpsGameWindow',
}, class RpsGameWindow extends Gtk.ApplicationWindow {
    _init(app) {
        super._init({
            application: app,
            can_focus: false,
            default_width: 600,
            default_height: 300,
        });

        this.set_title('Rock Paper Scissors');

        // HeaderBar
        const headerBar = new Gtk.HeaderBar({
            visible: true,
            can_focus: false,
            title: 'Rock Paper Scissors',
            show_close_button: true,
        });
        this.set_titlebar(headerBar);

        // Main Box
        const mainBox = new Gtk.Box({
            visible: true,
            can_focus: false,
            orientation: Gtk.Orientation.VERTICAL,
        });
        this.add(mainBox);

        // CPU Label
        const cpuLabel = new Gtk.Label({
            name: 'CPULabel',
            visible: true,
            can_focus: false,
            label: 'CPU',
        });
        mainBox.pack_start(cpuLabel, true, true, 0);

        // CPU Selection Box
        const cpuSelectionBox = new Gtk.Box({
            name: 'CPUSelection',
            visible: true,
            can_focus: false,
        });
        mainBox.pack_start(cpuSelectionBox, true, true, 1);

        // CPU Choice Label
        const cpuChoiceLabel = new Gtk.Label({
            visible: true,
            can_focus: false,
            label: 'Pick your move and hit \'Play\'',
        });
        cpuSelectionBox.add(cpuChoiceLabel);

        // Player Selection Box
        const playerSelectionBox = new Gtk.Box({
            name: 'PlayerSelection',
            visible: true,
            can_focus: false,
        });
        mainBox.pack_start(playerSelectionBox, true, true, 2);

        // Radio Buttons for Rock, Paper, and Scissors
        const rockRadioButton = new Gtk.RadioButton({
            label: 'Rock',
            name: 'RockRadio',
            visible: true,
            can_focus: true,
            receives_default: false,
            active: true,
            draw_indicator: true,
        });
        playerSelectionBox.add(rockRadioButton);

        const paperRadioButton = new Gtk.RadioButton({
            label: 'Paper',
            name: 'PaperRadio',
            visible: true,
            can_focus: true,
            receives_default: false,
            active: true,
            draw_indicator: true,
            group: rockRadioButton,
        });
        playerSelectionBox.add(paperRadioButton);

        const scissorsRadioButton = new Gtk.RadioButton({
            label: 'Scissors',
            name: 'ScissorsRadio',
            visible: true,
            can_focus: true,
            receives_default: false,
            active: true,
            draw_indicator: true,
            group: rockRadioButton,
        });
        playerSelectionBox.add(scissorsRadioButton);

        // Player Label
        const playerLabel = new Gtk.Label({
            name: 'PlayerLabel',
            visible: true,
            can_focus: false,
            label: 'Player',
        });
        mainBox.pack_start(playerLabel, true, true, 3);

        // Button Box
        const buttonBox = new Gtk.ButtonBox({
            visible: true,
            can_focus: false,
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER,
            hexpand: true,
            vexpand: true,
            layout_style: Gtk.ButtonBoxStyle.START,
        });
        mainBox.pack_start(buttonBox, false, true, 4);

        // Reset Button
        const resetButton = new Gtk.Button({
            label: 'Reset',
            visible: true,
            can_focus: true,
            receives_default: true,
        });
        buttonBox.add(resetButton);

        // Play Button
        const playButton = new Gtk.Button({
            label: 'Play',
            visible: true,
            can_focus: true,
            receives_default: true,
        });
        buttonBox.add(playButton);
    }
});

// Main function
function main() {
    const app = new Gtk.Application({
    });

    app.connect('activate', () => {
        const window = new RpsGameWindow(app);
        window.show_all();
    });

    app.run([]);
}
main();
