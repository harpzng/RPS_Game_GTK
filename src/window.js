/* window.js
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

import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk';

export const RpsGameWindow = GObject.registerClass({
    GTypeName: 'RpsGameWindow',
    Template: 'resource:///org/example/App/window.ui',
    InternalChildren: ['label'],
}, class RpsGameWindow extends Gtk.ApplicationWindow {
    _init(application) {
        super._init({ application });
    }
});

