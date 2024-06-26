# -*- coding: utf-8 -*-
#
#  ThemeUtils.py
#
#  Copyright © 2017 Antergos
#  Copyright © 2021 JezerM
#
#  This file is part of Web Greeter.
#
#  Web Greeter is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 3 of the License, or
#  (at your option) any later version.
#
#  Web Greeter is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  The following additional terms are in effect as per Section 7 of the license:
#
#  The preservation of all legal notices and author attributions in
#  the material or in the Appropriate Legal Notices displayed
#  by works containing it is required.
#
#  You should have received a copy of the GNU General Public License
#  along with Web Greeter; If not, see <http://www.gnu.org/licenses/>.

# pylint: disable=wrong-import-position

# Standard Lib
import os
import re
import tempfile

# 3rd-Party Libs
from PyQt5.QtCore import QVariant

# This application
from browser.bridge import Bridge, BridgeObject

from config import web_greeter_config
from logger import logger

class ThemeUtils(BridgeObject):
    # pylint: disable=no-self-use,missing-function-docstring,too-many-public-methods,invalid-name
    """ThemeUtils bridge class, known as `theem_utils` in javascript"""

    def __init__(self, greeter_object, *args, **kwargs):
        super().__init__(name='ThemeUtils', *args, **kwargs)

        self._config = web_greeter_config
        self._greeter = greeter_object

        self._allowed_dirs = (
            os.path.dirname(
                os.path.realpath(self._config["config"]["greeter"]["theme"])
            ),
            self._config["app"]["theme_dir"],
            self._config["config"]["branding"]["background_images_dir"],
            self._greeter.shared_data_directory,
            tempfile.gettempdir(),
        )

    @Bridge.method(str, bool, result=QVariant)
    def dirlist(self, dir_path, only_images=True):
        if not dir_path or not isinstance(dir_path, str) or '/' == dir_path:
            return []

        if dir_path.startswith("./"):
            dir_path = os.path.join(
                os.path.dirname(self._config["config"]["greeter"]["theme"]),
                dir_path
            )

        dir_path = os.path.realpath(os.path.normpath(dir_path))

        if not os.path.isabs(dir_path) or not os.path.isdir(dir_path):
            return []

        allowed = False

        for allowed_dir in self._allowed_dirs:
            if dir_path.startswith(allowed_dir):
                allowed = True
                break

        if not allowed:
            logger.error("Path \"%s\" is not allowed", dir_path)
            return []

        result = []
        if only_images:
            for f in os.scandir(dir_path):
                if f.is_file() and re.match(r".+\.(jpe?g|png|gif|bmp|webp)", f.name):
                    result.append(f.path)

        else:
            result = [os.path.join(dir_path, f) for f in os.listdir(dir_path)]

        result.sort()
        return result
