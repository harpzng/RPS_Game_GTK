/* main.js
 *
 * Copyright 2023 har
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk?version=3.0';

import { RpsGameWindow } from './window.js';

pkg.initGettext();
pkg.initFormat();

export function main(argv) {
    const application = new Gtk.Application({
        application_id: 'org.example.App',
        flags: Gio.ApplicationFlags.FLAGS_NONE,
    });

    application.connect('activate', app => {
        let activeWindow = app.activeWindow;

        if (!activeWindow)
            activeWindow = new RpsGameWindow(app);

        activeWindow.present();
    });

    return application.run(argv);
}
