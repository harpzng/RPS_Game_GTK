const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;

// Global variables (so i can actually access these coz gjs is a piece of sh#### and won't work any other way)
let cpuChoiceLabel, rockRadioButton, paperRadioButton, scissorsRadioButton;

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
        cpuChoiceLabel = new Gtk.Label({
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
        rockRadioButton = new Gtk.RadioButton({
            label: 'Rock',
            name: 'RockRadio',
            visible: true,
            can_focus: true,
            receives_default: false,
            active: true,
            draw_indicator: true,
        });
        playerSelectionBox.add(rockRadioButton);

        paperRadioButton = new Gtk.RadioButton({
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

        scissorsRadioButton = new Gtk.RadioButton({
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
        resetButton.connect('clicked', ()=>{
            this.reset();
        })

        // Play Button
        const playButton = new Gtk.Button({
            label: 'Play',
            visible: true,
            can_focus: true,
            receives_default: true,
        });
        buttonBox.add(playButton);
        playButton.connect('clicked', () => {
            this.play();
        });
    }

    play() {
        const cpuMove = this.getCPUMove();
        const playerMove = this.getPlayerMove();

        let result = '';

        switch (cpuMove) {
            case 'Rock':
                result = 'CPU selected Rock';
                break;
            case 'Paper':
                result = 'CPU selected Paper';
                break;
            case 'Scissors':
                result = 'CPU selected Scissors';
                break;
        }

        cpuChoiceLabel.set_text(result);

        if (
            (cpuMove === 'Rock' && playerMove === 'Scissors') ||
            (cpuMove === 'Scissors' && playerMove === 'Paper') ||
            (cpuMove === 'Paper' && playerMove === 'Rock')
        ) {
            result += ' : CPU WINS!';
        } else if (
            (playerMove === 'Rock' && cpuMove === 'Scissors') ||
            (playerMove === 'Scissors' && cpuMove === 'Paper') ||
            (playerMove === 'Paper' && cpuMove === 'Rock')
        ) {
            result += ' : PLAYER WINS!';
        } else {
            result += ' : DRAW!';
        }

        cpuChoiceLabel.set_text(result);
    }

    getCPUMove() {
        const moves = ['Rock', 'Paper', 'Scissors'];
        const i = Math.floor(Math.random() * moves.length); //should spit out a random no between 0 and 2 (coz 3 options duh)
        return moves[i]; //return random move
    }

    getPlayerMove() {
        if (rockRadioButton.get_active()) {
            return 'Rock';
        } else if (paperRadioButton.get_active()) {
            return 'Paper';
        } else if (scissorsRadioButton.get_active()) {
            return 'Scissors';
        }

        return null;
    }

    reset(){
        cpuChoiceLabel.set_text('Pick your move and hit \'Play\'');
        rockRadioButton.checked= true;
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
