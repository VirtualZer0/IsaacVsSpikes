/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkgame_isaacvsspikes"] = self["webpackChunkgame_isaacvsspikes"] || []).push([["src_store_editor_ts"],{

/***/ "./src/core/classes/game/Asset.ts":
/*!****************************************!*\
  !*** ./src/core/classes/game/Asset.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Asset\": function() { return /* binding */ Asset; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _base_Resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/Resource */ \"./src/core/classes/base/Resource.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n/* harmony import */ var _core_helpers_detectFileType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/helpers/detectFileType */ \"./src/core/helpers/detectFileType.ts\");\n/* harmony import */ var _store_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store/editor */ \"./src/store/editor.ts\");\n\n\n\n\n\nclass Asset extends _base_Resource__WEBPACK_IMPORTED_MODULE_1__.Resource {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"type\", 'other');\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"filename\", '');\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"extension\", '');\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"exportFolder\", '');\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"exportName\", '');\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"file\", null);\n  }\n\n  async getPreview() {\n    const editor = (0,_store_editor__WEBPACK_IMPORTED_MODULE_3__.useEditorStore)();\n\n    if (!editor.fs) {\n      return '';\n    }\n\n    const file = await this.getFile(await editor.fs.getDirectory('assets'));\n\n    if (!file) {\n      return '';\n    }\n\n    return `<img lazy src=\"${await file.getUrl()}\"/>`;\n  }\n\n  static async create(file, fs) {\n    const assetsDir = await fs.getDirectory('assets');\n    const asset = new Asset();\n    asset.id = (0,uuid__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n    asset.filename = file.name;\n    asset.extension = file.name.split('.').pop() || '';\n    asset.type = (0,_core_helpers_detectFileType__WEBPACK_IMPORTED_MODULE_2__.detectFileType)(file.type);\n    const targetDir = await assetsDir.getDirectory(asset.type);\n    const newFile = await targetDir.createFile(`${asset.id}.${asset.extension}`);\n    await newFile.writeFromFile(file);\n    asset.file = newFile;\n    return asset;\n  }\n\n  async getFile(assetDir) {\n    if (this.file) {\n      return this.file;\n    }\n\n    const dir = await assetDir.getDirectory(this.type);\n    this.file = await dir.getFile(`${this.id}.${this.extension}`);\n    return this.file;\n  }\n\n  getDisplayName(locale = 'ru') {\n    if (this.name[locale]) {\n      return this.name[locale];\n    } else if (Object.values(this.name).length > 0) {\n      return Object.values(this.name)[0];\n    }\n\n    return this.filename;\n  }\n\n  isMatch(search) {\n    if (this.filename.toLowerCase().includes(search.toLowerCase())) {\n      return true;\n    }\n\n    return super.isMatch(search);\n  }\n\n  getFilters() {\n    return [{\n      name: 'type',\n      values: ['image', 'audio', 'video', 'font', 'script', 'json', 'other']\n    }];\n  }\n\n  isMatchFilter(filter, value) {\n    if (filter === 'type') {\n      return this.type === value;\n    }\n\n    return false;\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/Asset.ts?");

/***/ }),

/***/ "./src/core/classes/game/Level.ts":
/*!****************************************!*\
  !*** ./src/core/classes/game/Level.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Level\": function() { return /* binding */ Level; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _base_Resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/Resource */ \"./src/core/classes/base/Resource.ts\");\n/* harmony import */ var _sub_level_LevelGenSystemType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sub/level/LevelGenSystemType */ \"./src/core/classes/game/sub/level/LevelGenSystemType.ts\");\n/* harmony import */ var _sub_room_RoomType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sub/room/RoomType */ \"./src/core/classes/game/sub/room/RoomType.ts\");\n\n\n\n\nclass Level extends _base_Resource__WEBPACK_IMPORTED_MODULE_1__.Resource {\n  /** Описание уровня */\n\n  /** Является ли уровень обычным (встроенным в стандартную цепочку уровней) */\n\n  /** Вес уровня, применяется если уровень обычный */\n\n  /** Слот уровня при обычной генерации */\n\n  /** Спрайты уровня */\n\n  /** Оверлеи уровня */\n\n  /** Музыка уровня - начало */\n\n  /** Музыка уровня - цикл */\n\n  /** Система генерации */\n\n  /** Количество подуровней */\n\n  /** Минимальное количество комнат в подуровне */\n\n  /** Максимальное количество комнат в подуровне */\n\n  /** Увеличение количества комнат при инкриментальной системе */\n\n  /** Правила генерации комнат */\n  constructor() {\n    super();\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"desc\", {});\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"regular\", true);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"regularWeight\", 1);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"regularSlot\", 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"sprites\", {});\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"overlays\", {});\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"musicStart\", null);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"musicLoop\", null);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"genSystem\", _sub_level_LevelGenSystemType__WEBPACK_IMPORTED_MODULE_2__.LevelGenSystemType.INCREMENTAL);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"sublevels\", 2);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"minRooms\", 4);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"maxRooms\", 8);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"incrementCount\", 1);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"roomRules\", []);\n\n    Object.values(_sub_room_RoomType__WEBPACK_IMPORTED_MODULE_3__.RoomType).forEach(type => {\n      this.sprites[type] = [];\n      this.overlays[type] = [];\n    });\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/Level.ts?");

/***/ }),

/***/ "./src/core/classes/game/Monster.ts":
/*!******************************************!*\
  !*** ./src/core/classes/game/Monster.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Monster\": function() { return /* binding */ Monster; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _base_Resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/Resource */ \"./src/core/classes/base/Resource.ts\");\n/* harmony import */ var _store_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/editor */ \"./src/store/editor.ts\");\n\n\n\nclass Monster extends _base_Resource__WEBPACK_IMPORTED_MODULE_1__.Resource {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"sprite\", null);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"desc\", {});\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"effects\", []);\n  }\n\n  getPreview() {\n    if (this.sprite && 'src' in this.sprite) {\n      const sprite = this.sprite;\n\n      if (typeof sprite.src !== 'string') {\n        const resLink = this.sprite.src;\n        const editor = (0,_store_editor__WEBPACK_IMPORTED_MODULE_2__.useEditorStore)();\n        const res = editor.assets.get(resLink.id);\n\n        if (!res) {\n          return super.getPreview();\n        } else {\n          return res.getPreview();\n        }\n      } else {\n        return Promise.resolve(`<img lazy src=\"/assets/${this.sprite.src}\"/>`);\n      }\n    } else return super.getPreview();\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/Monster.ts?");

/***/ }),

/***/ "./src/core/classes/game/Room.ts":
/*!***************************************!*\
  !*** ./src/core/classes/game/Room.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Room\": function() { return /* binding */ Room; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _base_Resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/Resource */ \"./src/core/classes/base/Resource.ts\");\n\n\nclass Room extends _base_Resource__WEBPACK_IMPORTED_MODULE_1__.Resource {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"weight\", 1);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"desc\", [{}]);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"doorDesc\", {});\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"background\", []);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"overlay\", []);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"level\", null);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"monsters\", []);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"events\", []);\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/Room.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/character/CharcterStats.ts":
/*!**************************************************************!*\
  !*** ./src/core/classes/game/sub/character/CharcterStats.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CharacterStats\": function() { return /* binding */ CharacterStats; },\n/* harmony export */   \"CharacterStatsCheckData\": function() { return /* binding */ CharacterStatsCheckData; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n\nclass CharacterStats {\n  constructor() {\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"countdown\", 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"health\", 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"damage\", 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"speed\", 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"skill\", 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"devilChance\", 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"angelChance\", 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"tags\", []);\n  }\n\n}\nclass CharacterStatsCheckData {\n  constructor() {\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"countdown\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"damage\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"speed\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"skill\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"devilChance\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"angelChance\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"tags\", {\n      type: 'tags',\n      enabled: false,\n      value: []\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"health\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"redHearts\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"blueHearts\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"blackHearts\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"goldenHearts\", {\n      type: 'number',\n      enabled: false,\n      from: 0,\n      to: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"whiteHearts\", {\n      type: 'boolean',\n      enabled: false,\n      value: false\n    });\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/character/CharcterStats.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/level/LevelGenSystemType.ts":
/*!***************************************************************!*\
  !*** ./src/core/classes/game/sub/level/LevelGenSystemType.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LevelGenSystemType\": function() { return /* binding */ LevelGenSystemType; }\n/* harmony export */ });\nvar LevelGenSystemType;\n\n(function (LevelGenSystemType) {\n  LevelGenSystemType[\"INCREMENTAL\"] = \"incremental\";\n  LevelGenSystemType[\"STATIC\"] = \"static\";\n})(LevelGenSystemType || (LevelGenSystemType = {}));\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/level/LevelGenSystemType.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomChanceEvent.ts":
/*!***********************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomChanceEvent.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomChanceEvent\": function() { return /* binding */ RoomChanceEvent; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _RoomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomEvent */ \"./src/core/classes/game/sub/room/RoomEvent.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/nil.js\");\n/* harmony import */ var _RoomEventType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoomEventType */ \"./src/core/classes/game/sub/room/RoomEventType.ts\");\n\n\n\n\n/** Ивент, выбирающий случайный исход из доступных */\n\nclass RoomChanceEvent extends _RoomEvent__WEBPACK_IMPORTED_MODULE_1__.RoomEvent {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"variants\", [{\n      key: 'out1',\n      weight: 1\n    }]);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"outputEvents\", {\n      out1: uuid__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"type\", _RoomEventType__WEBPACK_IMPORTED_MODULE_2__.RoomEventType.CHANCE);\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomChanceEvent.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomEvent.ts":
/*!*****************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomEvent.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomEvent\": function() { return /* binding */ RoomEvent; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _core_classes_base_Resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/classes/base/Resource */ \"./src/core/classes/base/Resource.ts\");\n/* harmony import */ var _RoomEventType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoomEventType */ \"./src/core/classes/game/sub/room/RoomEventType.ts\");\n/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/i18n */ \"./src/i18n.ts\");\n\n\n\n\nconst {\n  t\n} = _i18n__WEBPACK_IMPORTED_MODULE_3__[\"default\"].global;\nclass RoomEvent extends _core_classes_base_Resource__WEBPACK_IMPORTED_MODULE_1__.Resource {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"startDialog\", [{}]);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"inputEvents\", []);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"outputEvents\", {});\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"type\", _RoomEventType__WEBPACK_IMPORTED_MODULE_2__.RoomEventType.BASE);\n  }\n\n  getDisplayName(locale) {\n    if (locale && this.name[locale]) {\n      return this.name[locale];\n    } else if (Object.values(this.name).length > 0) {\n      return Object.values(this.name)[0];\n    } else {\n      return t(`editor.${this.type}Event`);\n    }\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomEvent.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomEventType.ts":
/*!*********************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomEventType.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomEventType\": function() { return /* binding */ RoomEventType; }\n/* harmony export */ });\nvar RoomEventType;\n\n(function (RoomEventType) {\n  RoomEventType[\"BASE\"] = \"base\";\n  RoomEventType[\"TEXT\"] = \"text\";\n  RoomEventType[\"SELECT\"] = \"select\";\n  RoomEventType[\"STATSCHECK\"] = \"statscheck\";\n  RoomEventType[\"REWARD\"] = \"reward\";\n  RoomEventType[\"STATSCHANGE\"] = \"statschange\";\n  RoomEventType[\"CHANCE\"] = \"chance\";\n})(RoomEventType || (RoomEventType = {}));\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomEventType.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomRewardEvent.ts":
/*!***********************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomRewardEvent.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomRewardEvent\": function() { return /* binding */ RoomRewardEvent; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _RoomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomEvent */ \"./src/core/classes/game/sub/room/RoomEvent.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/nil.js\");\n/* harmony import */ var _RoomEventType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoomEventType */ \"./src/core/classes/game/sub/room/RoomEventType.ts\");\n\n\n\n\n/** Ивент на выдачу наград */\n\nclass RoomRewardEvent extends _RoomEvent__WEBPACK_IMPORTED_MODULE_1__.RoomEvent {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"outputEvents\", {\n      next: uuid__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"type\", _RoomEventType__WEBPACK_IMPORTED_MODULE_2__.RoomEventType.REWARD);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"reward\", []);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"pickups\", {\n      coins: 0,\n      bombs: 0,\n      keys: 0\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"goldenKey\", false);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"goldenBomb\", false);\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomRewardEvent.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomSelectEvent.ts":
/*!***********************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomSelectEvent.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomSelectEvent\": function() { return /* binding */ RoomSelectEvent; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _RoomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomEvent */ \"./src/core/classes/game/sub/room/RoomEvent.ts\");\n/* harmony import */ var _RoomEventType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoomEventType */ \"./src/core/classes/game/sub/room/RoomEventType.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/nil.js\");\n\n\n\n\n/** Ивент на отображение диалога с ввыбором */\n\nclass RoomSelectEvent extends _RoomEvent__WEBPACK_IMPORTED_MODULE_1__.RoomEvent {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"variants\", [{\n      text: {},\n      key: 'out1'\n    }]);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"outputEvents\", {\n      out1: uuid__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"type\", _RoomEventType__WEBPACK_IMPORTED_MODULE_2__.RoomEventType.SELECT);\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomSelectEvent.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomStatsChangeEvent.ts":
/*!****************************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomStatsChangeEvent.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomStatsChangeEvent\": function() { return /* binding */ RoomStatsChangeEvent; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _RoomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomEvent */ \"./src/core/classes/game/sub/room/RoomEvent.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/nil.js\");\n/* harmony import */ var _RoomEventType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoomEventType */ \"./src/core/classes/game/sub/room/RoomEventType.ts\");\n/* harmony import */ var _character_CharcterStats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../character/CharcterStats */ \"./src/core/classes/game/sub/character/CharcterStats.ts\");\n\n\n\n\n\n/** Ивент на изменение параметров игрока */\n\nclass RoomStatsChangeEvent extends _RoomEvent__WEBPACK_IMPORTED_MODULE_1__.RoomEvent {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"stats\", new _character_CharcterStats__WEBPACK_IMPORTED_MODULE_3__.CharacterStats());\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"outputEvents\", {\n      next: uuid__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"type\", _RoomEventType__WEBPACK_IMPORTED_MODULE_2__.RoomEventType.STATSCHANGE);\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomStatsChangeEvent.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomStatsCheckEvent.ts":
/*!***************************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomStatsCheckEvent.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomStatsCheckEvent\": function() { return /* binding */ RoomStatsCheckEvent; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _RoomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomEvent */ \"./src/core/classes/game/sub/room/RoomEvent.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/nil.js\");\n/* harmony import */ var _RoomEventType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoomEventType */ \"./src/core/classes/game/sub/room/RoomEventType.ts\");\n/* harmony import */ var _character_CharcterStats__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../character/CharcterStats */ \"./src/core/classes/game/sub/character/CharcterStats.ts\");\n\n\n\n\n\n/** Ивент на проверку статов персонажа */\n\nclass RoomStatsCheckEvent extends _RoomEvent__WEBPACK_IMPORTED_MODULE_1__.RoomEvent {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"successDialog\", [{}]);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"failDialog\", [{}]);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"requiredItems\", []);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"requiredStats\", new _character_CharcterStats__WEBPACK_IMPORTED_MODULE_3__.CharacterStatsCheckData());\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"outputEvents\", {\n      success: uuid__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n      fail: uuid__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"type\", _RoomEventType__WEBPACK_IMPORTED_MODULE_2__.RoomEventType.STATSCHECK);\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomStatsCheckEvent.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomTextEvent.ts":
/*!*********************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomTextEvent.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomTextEvent\": function() { return /* binding */ RoomTextEvent; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _RoomEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomEvent */ \"./src/core/classes/game/sub/room/RoomEvent.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/nil.js\");\n/* harmony import */ var _RoomEventType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RoomEventType */ \"./src/core/classes/game/sub/room/RoomEventType.ts\");\n\n\n\n\n/** Ивент простого отображения текста */\n\nclass RoomTextEvent extends _RoomEvent__WEBPACK_IMPORTED_MODULE_1__.RoomEvent {\n  constructor(...args) {\n    super(...args);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"outputEvents\", {\n      next: uuid__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    });\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"type\", _RoomEventType__WEBPACK_IMPORTED_MODULE_2__.RoomEventType.TEXT);\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomTextEvent.ts?");

/***/ }),

/***/ "./src/core/classes/game/sub/room/RoomType.ts":
/*!****************************************************!*\
  !*** ./src/core/classes/game/sub/room/RoomType.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RoomType\": function() { return /* binding */ RoomType; }\n/* harmony export */ });\nvar RoomType;\n\n(function (RoomType) {\n  /** Обычная комната */\n  RoomType[\"NORMAL\"] = \"normal\";\n  /** Комната босса */\n\n  RoomType[\"BOSS\"] = \"boss\";\n  /** Сокровищница */\n\n  RoomType[\"TREASURE\"] = \"treasure\";\n  /** Магазин */\n\n  RoomType[\"SHOP\"] = \"shop\";\n  /** Секретная комната */\n\n  RoomType[\"SECRET\"] = \"secret\";\n  /** Кусачая комната */\n\n  RoomType[\"SPIKES\"] = \"spikes\";\n})(RoomType || (RoomType = {}));\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/classes/game/sub/room/RoomType.ts?");

/***/ }),

/***/ "./src/core/helpers/detectFileType.ts":
/*!********************************************!*\
  !*** ./src/core/helpers/detectFileType.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"detectFileType\": function() { return /* binding */ detectFileType; }\n/* harmony export */ });\n/**\n * Получает категорию файла по его MIME-типу\n * @param mime - MIME-тип файла\n * @returns Категория файла\n */\nfunction detectFileType(mime) {\n  if (mime.includes('image')) {\n    return 'image';\n  } else if (mime.includes('audio') || mime.includes('ogg')) {\n    return 'audio';\n  } else if (mime.includes('video')) {\n    return 'video';\n  } else if (mime.includes('font')) {\n    return 'font';\n  } else if (mime.includes('script')) {\n    return 'script';\n  } else if (mime.includes('json')) {\n    return 'json';\n  } else {\n    return 'other';\n  }\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/helpers/detectFileType.ts?");

/***/ }),

/***/ "./src/core/helpers/restoreClass.ts":
/*!******************************************!*\
  !*** ./src/core/helpers/restoreClass.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"restoreClass\": function() { return /* binding */ restoreClass; }\n/* harmony export */ });\n/**\n * Восстанавливает класс из JSON-данных\n * @param obj - JSON-строка или готовый объект\n * @param base - Класс для восстановления\n * @returns Восстановленный объект на основе данных из JSON-строки\n */\nfunction restoreClass(obj, base) {\n  const source = typeof obj === 'string' ? JSON.parse(obj) : obj;\n  return Object.create(base.prototype, Object.getOwnPropertyDescriptors(source));\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/helpers/restoreClass.ts?");

/***/ }),

/***/ "./src/core/helpers/restoreEvents.ts":
/*!*******************************************!*\
  !*** ./src/core/helpers/restoreEvents.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"restoreEvents\": function() { return /* binding */ restoreEvents; }\n/* harmony export */ });\n/* harmony import */ var _classes_game_sub_room_RoomChanceEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/game/sub/room/RoomChanceEvent */ \"./src/core/classes/game/sub/room/RoomChanceEvent.ts\");\n/* harmony import */ var _classes_game_sub_room_RoomSelectEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/game/sub/room/RoomSelectEvent */ \"./src/core/classes/game/sub/room/RoomSelectEvent.ts\");\n/* harmony import */ var _classes_game_sub_room_RoomEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/game/sub/room/RoomEvent */ \"./src/core/classes/game/sub/room/RoomEvent.ts\");\n/* harmony import */ var _classes_game_sub_room_RoomEventType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../classes/game/sub/room/RoomEventType */ \"./src/core/classes/game/sub/room/RoomEventType.ts\");\n/* harmony import */ var _classes_game_sub_room_RoomRewardEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../classes/game/sub/room/RoomRewardEvent */ \"./src/core/classes/game/sub/room/RoomRewardEvent.ts\");\n/* harmony import */ var _classes_game_sub_room_RoomStatsChangeEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../classes/game/sub/room/RoomStatsChangeEvent */ \"./src/core/classes/game/sub/room/RoomStatsChangeEvent.ts\");\n/* harmony import */ var _classes_game_sub_room_RoomStatsCheckEvent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../classes/game/sub/room/RoomStatsCheckEvent */ \"./src/core/classes/game/sub/room/RoomStatsCheckEvent.ts\");\n/* harmony import */ var _classes_game_sub_room_RoomTextEvent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../classes/game/sub/room/RoomTextEvent */ \"./src/core/classes/game/sub/room/RoomTextEvent.ts\");\n/* harmony import */ var _restoreClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./restoreClass */ \"./src/core/helpers/restoreClass.ts\");\n\n\n\n\n\n\n\n\n\nfunction restoreEvents(events) {\n  return events.map(event => {\n    switch (event.type) {\n      case _classes_game_sub_room_RoomEventType__WEBPACK_IMPORTED_MODULE_3__.RoomEventType.TEXT:\n        return (0,_restoreClass__WEBPACK_IMPORTED_MODULE_8__.restoreClass)(event, _classes_game_sub_room_RoomTextEvent__WEBPACK_IMPORTED_MODULE_7__.RoomTextEvent);\n\n      case _classes_game_sub_room_RoomEventType__WEBPACK_IMPORTED_MODULE_3__.RoomEventType.SELECT:\n        return (0,_restoreClass__WEBPACK_IMPORTED_MODULE_8__.restoreClass)(event, _classes_game_sub_room_RoomSelectEvent__WEBPACK_IMPORTED_MODULE_1__.RoomSelectEvent);\n\n      case _classes_game_sub_room_RoomEventType__WEBPACK_IMPORTED_MODULE_3__.RoomEventType.STATSCHECK:\n        return (0,_restoreClass__WEBPACK_IMPORTED_MODULE_8__.restoreClass)(event, _classes_game_sub_room_RoomStatsCheckEvent__WEBPACK_IMPORTED_MODULE_6__.RoomStatsCheckEvent);\n\n      case _classes_game_sub_room_RoomEventType__WEBPACK_IMPORTED_MODULE_3__.RoomEventType.STATSCHANGE:\n        return (0,_restoreClass__WEBPACK_IMPORTED_MODULE_8__.restoreClass)(event, _classes_game_sub_room_RoomStatsChangeEvent__WEBPACK_IMPORTED_MODULE_5__.RoomStatsChangeEvent);\n\n      case _classes_game_sub_room_RoomEventType__WEBPACK_IMPORTED_MODULE_3__.RoomEventType.REWARD:\n        return (0,_restoreClass__WEBPACK_IMPORTED_MODULE_8__.restoreClass)(event, _classes_game_sub_room_RoomRewardEvent__WEBPACK_IMPORTED_MODULE_4__.RoomRewardEvent);\n\n      case _classes_game_sub_room_RoomEventType__WEBPACK_IMPORTED_MODULE_3__.RoomEventType.CHANCE:\n        return (0,_restoreClass__WEBPACK_IMPORTED_MODULE_8__.restoreClass)(event, _classes_game_sub_room_RoomChanceEvent__WEBPACK_IMPORTED_MODULE_0__.RoomChanceEvent);\n\n      default:\n        return (0,_restoreClass__WEBPACK_IMPORTED_MODULE_8__.restoreClass)(event, _classes_game_sub_room_RoomEvent__WEBPACK_IMPORTED_MODULE_2__.RoomEvent);\n    }\n  });\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/helpers/restoreEvents.ts?");

/***/ }),

/***/ "./src/core/helpers/restoreMap.ts":
/*!****************************************!*\
  !*** ./src/core/helpers/restoreMap.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"restoreMap\": function() { return /* binding */ restoreMap; }\n/* harmony export */ });\nconst restoreMap = x => new Map(Object.keys(x).map(y => [y, typeof x[y] == \"object\" && !Array.isArray(x[y]) ? restoreMap(x[y]) : x[y]]));\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/core/helpers/restoreMap.ts?");

/***/ }),

/***/ "./src/store/editor.ts":
/*!*****************************!*\
  !*** ./src/store/editor.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useEditorStore\": function() { return /* binding */ useEditorStore; }\n/* harmony export */ });\n/* harmony import */ var _core_classes_base_Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/classes/base/Resource */ \"./src/core/classes/base/Resource.ts\");\n/* harmony import */ var _core_classes_game_Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/core/classes/game/Item */ \"./src/core/classes/game/Item.ts\");\n/* harmony import */ var _core_classes_game_Level__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/core/classes/game/Level */ \"./src/core/classes/game/Level.ts\");\n/* harmony import */ var _core_classes_game_Monster__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/core/classes/game/Monster */ \"./src/core/classes/game/Monster.ts\");\n/* harmony import */ var _core_classes_game_Room__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/core/classes/game/Room */ \"./src/core/classes/game/Room.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! pinia */ \"./node_modules/pinia/dist/pinia.esm-browser.js\");\n/* harmony import */ var _utils_uniFS_createFS__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils/uniFS/createFS */ \"./src/utils/uniFS/createFS.ts\");\n/* harmony import */ var _core_classes_game_Asset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/core/classes/game/Asset */ \"./src/core/classes/game/Asset.ts\");\n/* harmony import */ var _core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/core/helpers/restoreClass */ \"./src/core/helpers/restoreClass.ts\");\n/* harmony import */ var _core_helpers_restoreMap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/core/helpers/restoreMap */ \"./src/core/helpers/restoreMap.ts\");\n/* harmony import */ var _core_helpers_restoreEvents__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/core/helpers/restoreEvents */ \"./src/core/helpers/restoreEvents.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\nconst useEditorStore = (0,pinia__WEBPACK_IMPORTED_MODULE_10__.defineStore)('editor', {\n  state: () => ({\n    fs: null,\n    name: '',\n    dir: '',\n    uuid: '',\n    isOpen: false,\n    bosses: new Map(),\n    characters: new Map(),\n    items: new Map(),\n    levels: new Map(),\n    monsters: new Map(),\n    objects: new Map(),\n    assets: new Map(),\n    rooms: new Map(),\n    scripts: new Map(),\n    eventNodes: new Map(),\n    temporaryNodemap: []\n  }),\n  actions: {\n    /**\n     * Создать новый проект мода\n     * @param name - Название мода\n     * @param dir - Папка мода\n     */\n    async createProject(name, dir) {\n      const fs = this.fs;\n\n      if (!fs) {\n        throw 'FS not available';\n      }\n\n      await fs.createDirectory(dir);\n      await fs.setRoot(dir);\n      this.name = name;\n      this.dir = dir;\n      this.uuid = (0,uuid__WEBPACK_IMPORTED_MODULE_11__[\"default\"])();\n      await Promise.all([fs.createDirectory('levels'), fs.createDirectory('rooms'), fs.createDirectory('monsters'), fs.createDirectory('bosses'), fs.createDirectory('objects'), fs.createDirectory('items'), fs.createDirectory('characters'), fs.createDirectory('scripts'), (await fs.createFile('project.json')).writeAllText(JSON.stringify({\n        name,\n        uuid: this.uuid\n      })), (await fs.createFile('eventNodes.json')).writeAllText(JSON.stringify(this.eventNodes))]);\n      const assets = await fs.createDirectory('assets');\n      await Promise.all([(await assets.createFile('index.json')).writeAllText('[]'), assets.createDirectory('images'), assets.createDirectory('audio'), assets.createDirectory('video'), assets.createDirectory('fonts'), assets.createDirectory('scripts'), assets.createDirectory('json'), assets.createDirectory('other')]);\n      setTimeout(() => {\n        this.isOpen = true;\n      }, 60);\n    },\n\n    /** Открыть существующий проект */\n    async loadProject() {\n      this.fs = await (0,_utils_uniFS_createFS__WEBPACK_IMPORTED_MODULE_5__.createFS)();\n      const fs = this.fs;\n      await fs.init();\n      const meta = JSON.parse(await (await fs.getFile('project.json')).readAllText());\n      this.eventNodes = (0,_core_helpers_restoreMap__WEBPACK_IMPORTED_MODULE_8__.restoreMap)(JSON.parse(await (await fs.getFile('eventNodes.json')).readAllText()));\n      this.name = meta.name;\n      this.uuid = meta.uuid;\n      this.dir = fs.name;\n      (await fs.getDirectories()).forEach(async dir => {\n        if (dir.name === 'assets') {\n          const index = await dir.getFile('index.json');\n          const assets = JSON.parse(await index.readAllText());\n          assets.forEach(async asset => {\n            const restoredAsset = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(asset, _core_classes_game_Asset__WEBPACK_IMPORTED_MODULE_6__.Asset);\n            this.assets.set(asset.id, restoredAsset);\n          });\n          return;\n        }\n\n        const data = new Map();\n        (await dir.getFiles()).forEach(async file => {\n          let res; // Восстановление классов, поскольку из JSON'a мы получаем только данные\n\n          switch (dir.name) {\n            case 'levels':\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_game_Level__WEBPACK_IMPORTED_MODULE_2__.Level);\n              break;\n\n            case 'rooms':\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_game_Room__WEBPACK_IMPORTED_MODULE_4__.Room);\n              break;\n\n            case 'monsters':\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_game_Monster__WEBPACK_IMPORTED_MODULE_3__.Monster);\n              break;\n\n            case 'bosses':\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_base_Resource__WEBPACK_IMPORTED_MODULE_0__.Resource);\n              break;\n\n            case 'objects':\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_base_Resource__WEBPACK_IMPORTED_MODULE_0__.Resource);\n              break;\n\n            case 'items':\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_game_Item__WEBPACK_IMPORTED_MODULE_1__.Item);\n              break;\n\n            case 'characters':\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_base_Resource__WEBPACK_IMPORTED_MODULE_0__.Resource);\n              break;\n\n            case 'scripts':\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_base_Resource__WEBPACK_IMPORTED_MODULE_0__.Resource);\n              break;\n\n            default:\n              res = (0,_core_helpers_restoreClass__WEBPACK_IMPORTED_MODULE_7__.restoreClass)(await file.readAllText(), _core_classes_base_Resource__WEBPACK_IMPORTED_MODULE_0__.Resource);\n              break;\n          }\n\n          data.set(res.id, res);\n        });\n        this[dir.name] = data;\n        console.log('%cEditor', 'background-color: #9E9E9E; color: #333; border-radius: 100px;padding: 1px 4px', `Loaded ${data.size} ${dir.name}`);\n      });\n      setTimeout(() => {\n        this.isOpen = true; // Восстановление классов ивентов\n\n        this.rooms.forEach(room => {\n          room.events = (0,_core_helpers_restoreEvents__WEBPACK_IMPORTED_MODULE_9__.restoreEvents)(room.events);\n        });\n      }, 60);\n    },\n\n    /**\n     * Добавить новый ресурс\n     * @param type - Тип ресурса\n     * @param resource - Ресурс для сохранения\n     */\n    async createResource(type, resource) {\n      const state = this;\n      state[type].set(resource.id, resource);\n      return await this.saveResource(type, resource.id);\n    },\n\n    /**\n     * Удалить ресурс из мода\n     * @param id - Идентификатор ресурса\n     * @param type - Тип ресурса\n     */\n    async deleteResource(type, id) {\n      const fs = this.fs;\n      const dir = await fs.getDirectory(type);\n      const file = await dir.getFile(`${id}.json`);\n      await file.delete();\n      this[type].delete(id);\n    },\n\n    /**\n     * Обновить ресурс\n     * @param type - Тип ресурса\n     * @param resource - Ресурс для обновления\n     */\n    async updateResource(type, resource) {\n      this[type].set(resource.id, resource);\n      await this.saveResource(type, resource.id);\n    },\n\n    /**\n     * Сохранить ресурс на диск\n     * @param id - Идентификатор ресурса\n     * @param type - Тип ресурса\n     * @returns Файл с сохраненным ресурсом\n     */\n    async saveResource(type, id) {\n      const state = this;\n      const res = state[type].get(id);\n      const fs = this.fs;\n      const dir = await fs.getDirectory(type);\n      const file = await dir.createFile(`${id}.json`);\n      console.log('%cEditor', 'background-color: #9E9E9E; color: #333; border-radius: 100px;padding: 1px 4px', `Saving ${id} to ${type}`, res);\n      await file.writeAllText(JSON.stringify(res));\n      return file;\n    },\n\n    /**\n     * Сохранить ассет\n     * @param asset - Ассет для сохранения\n     */\n    async saveAsset(asset) {\n      const fs = this.fs;\n      const assetCopy = Object.assign({}, asset);\n\n      if (!this.assets.has(asset.id)) {\n        this.assets.set(asset.id, assetCopy);\n      }\n\n      delete assetCopy.file;\n      const assetsDir = await fs.getDirectory('assets');\n      const indexCopy = [];\n      this.assets.forEach(asset => {\n        const assetCopy = JSON.parse(JSON.stringify(asset));\n        delete assetCopy.file;\n        indexCopy.push(assetCopy);\n      });\n      await (await assetsDir.getFile(`index.json`)).writeAllText(JSON.stringify(indexCopy));\n    },\n\n    /**\n     * Удалить ассет\n     * @param asset - Ассет для удаления\n     */\n    async deleteAsset(asset) {\n      const fs = this.fs;\n      const assetsDir = await fs.getDirectory('assets');\n      const targetDir = await assetsDir.getDirectory(asset.type);\n      await targetDir.deleteFile(`${asset.id}.${asset.extension}`);\n      this.assets.delete(asset.id);\n      const indexCopy = [];\n      this.assets.forEach(asset => {\n        const assetCopy = JSON.parse(JSON.stringify(asset));\n        delete assetCopy.file;\n        indexCopy.push(assetCopy);\n      });\n      await (await assetsDir.getFile(`index.json`)).writeAllText(JSON.stringify(indexCopy));\n    },\n\n    /** Сохранить текущий набор нод для событий на диск */\n    async saveEventNodes() {\n      if (!this.fs) {\n        return;\n      }\n\n      const objNodes = {};\n\n      for (const [key, value] of this.eventNodes.entries()) {\n        objNodes[key] = {};\n\n        for (const [key2, value2] of value.entries()) {\n          objNodes[key][key2] = value2;\n        }\n      }\n\n      await (await this.fs.createFile('eventNodes.json')).writeAllText(JSON.stringify(objNodes));\n    }\n\n  }\n});\nconst meta = ({});\nif (meta.hot) meta.hot.accept((0,pinia__WEBPACK_IMPORTED_MODULE_10__.acceptHMRUpdate)(useEditorStore, meta.hot));\nif (meta.webpackHot) meta.webpackHot.accept((0,pinia__WEBPACK_IMPORTED_MODULE_10__.acceptHMRUpdate)(useEditorStore, meta.webpackHot));\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/store/editor.ts?");

/***/ }),

/***/ "./src/utils/uniFS/FSAccess/FSAccessAPI.ts":
/*!*************************************************!*\
  !*** ./src/utils/uniFS/FSAccess/FSAccessAPI.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FSAccessAPI\": function() { return /* binding */ FSAccessAPI; }\n/* harmony export */ });\n/* harmony import */ var _FSAccessDirectory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FSAccessDirectory */ \"./src/utils/uniFS/FSAccess/FSAccessDirectory.ts\");\n\nclass FSAccessAPI extends _FSAccessDirectory__WEBPACK_IMPORTED_MODULE_0__.FSAccessDirectory {\n  constructor() {\n    super('', '', null, null);\n  }\n\n  async init() {\n    const win = window;\n\n    if (win && win.showDirectoryPicker) {\n      this.setHandler(await win.showDirectoryPicker());\n      await this.handler.queryPermission({\n        mode: 'readwrite'\n      });\n      return this;\n    } else {\n      throw 'FS Access API not available';\n    }\n  }\n\n  async setRoot(path) {\n    this.setHandler(await this.handler.getDirectoryHandle(path));\n    return this;\n  }\n\n  setHandler(handler) {\n    this.handler = handler;\n    this.name = this.handler.name;\n    this.path = this.handler.name;\n    this.parent = null;\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/utils/uniFS/FSAccess/FSAccessAPI.ts?");

/***/ }),

/***/ "./src/utils/uniFS/FSAccess/FSAccessDirectory.ts":
/*!*******************************************************!*\
  !*** ./src/utils/uniFS/FSAccess/FSAccessDirectory.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FSAccessDirectory\": function() { return /* binding */ FSAccessDirectory; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.error.cause.js */ \"./node_modules/core-js/modules/es.error.cause.js\");\n/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _FSAccessFile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FSAccessFile */ \"./src/utils/uniFS/FSAccess/FSAccessFile.ts\");\n\n\n\nclass FSAccessDirectory {\n  constructor(name, path, parent, handler) {\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"name\", void 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"path\", void 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"parent\", void 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"handler\", void 0);\n\n    this.name = name;\n    this.path = path;\n    this.parent = parent;\n    this.handler = handler;\n  }\n\n  async getFiles() {\n    const res = [];\n\n    for await (const handle of this.handler.values()) {\n      res.push(handle);\n    }\n\n    return res.filter(e => e.kind == 'file').map(e => new _FSAccessFile__WEBPACK_IMPORTED_MODULE_2__.FSAccessFile(e.name, `${this.path}/${e.name}`, this, e));\n  }\n\n  async getFile(name) {\n    return new _FSAccessFile__WEBPACK_IMPORTED_MODULE_2__.FSAccessFile(name, `${this.path}/${name}`, this, await this.handler.getFileHandle(name));\n  }\n\n  async getDirectories() {\n    const res = [];\n\n    for await (const handle of this.handler.values()) {\n      res.push(handle);\n    }\n\n    return res.filter(e => e.kind == 'directory').map(e => new FSAccessDirectory(e.name, `${this.path}/${e.name}`, this, e));\n  }\n\n  async getDirectory(name) {\n    return new FSAccessDirectory(name, `${this.path}/${name}`, this, await this.handler.getDirectoryHandle(name));\n  }\n\n  async createFile(name) {\n    const fhandler = await this.handler.getFileHandle(name, {\n      create: true\n    });\n    return new _FSAccessFile__WEBPACK_IMPORTED_MODULE_2__.FSAccessFile(name, `${this.path}/${name}`, this, fhandler);\n  }\n\n  async deleteFile(name) {\n    return await this.handler.removeEntry(name);\n  }\n\n  async createDirectory(name) {\n    const dhandler = await this.handler.getDirectoryHandle(name, {\n      create: true\n    });\n    return new FSAccessDirectory(name, `${this.path}/${name}`, this, dhandler);\n  }\n\n  async deleteDirectory(name) {\n    return await this.handler.removeEntry(name, {\n      recursive: true\n    });\n  }\n\n  async delete() {\n    if (this.parent) return await this.parent.deleteDirectory(this.name);else throw new Error('Cannot delete root directory');\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/utils/uniFS/FSAccess/FSAccessDirectory.ts?");

/***/ }),

/***/ "./src/utils/uniFS/FSAccess/FSAccessFile.ts":
/*!**************************************************!*\
  !*** ./src/utils/uniFS/FSAccess/FSAccessFile.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FSAccessFile\": function() { return /* binding */ FSAccessFile; }\n/* harmony export */ });\n/* harmony import */ var _home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty.js */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.typed-array.at.js */ \"./node_modules/core-js/modules/es.typed-array.at.js\");\n/* harmony import */ var core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_at_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_esnext_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/esnext.typed-array.find-last.js */ \"./node_modules/core-js/modules/esnext.typed-array.find-last.js\");\n/* harmony import */ var core_js_modules_esnext_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_typed_array_find_last_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_esnext_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/esnext.typed-array.find-last-index.js */ \"./node_modules/core-js/modules/esnext.typed-array.find-last-index.js\");\n/* harmony import */ var core_js_modules_esnext_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_typed_array_find_last_index_js__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nclass FSAccessFile {\n  constructor(name, path, parent, handler) {\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"name\", void 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"path\", void 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"parent\", void 0);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"handler\", null);\n\n    (0,_home_runner_work_IsaacVsSpikes_IsaacVsSpikes_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"url\", null);\n\n    this.name = name;\n    this.path = path;\n    this.parent = parent;\n    this.handler = handler;\n  }\n\n  async getUrl() {\n    return this.url ?? (this.url = window.URL.createObjectURL(await this.handler.getFile()));\n  }\n\n  free() {\n    if (this.url) window.URL.revokeObjectURL(this.url);\n  }\n\n  async writeAllText(content) {\n    const writer = await this.handler.createWritable();\n    writer.write(content);\n    writer.close();\n  }\n\n  async writeFromFile(file) {\n    const buffer = await file.arrayBuffer();\n    const blob = new Blob([new Uint8Array(buffer)], {\n      type: file.type\n    });\n    const writer = await this.handler.createWritable();\n    await writer.write(blob);\n    await writer.close();\n  }\n\n  async readAllText() {\n    return await (await this.handler.getFile()).text();\n  }\n\n  async delete() {\n    if (this.url) window.URL.revokeObjectURL(this.url);\n    await this.parent.deleteFile(this.name);\n  }\n\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/utils/uniFS/FSAccess/FSAccessFile.ts?");

/***/ }),

/***/ "./src/utils/uniFS/createFS.ts":
/*!*************************************!*\
  !*** ./src/utils/uniFS/createFS.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createFS\": function() { return /* binding */ createFS; }\n/* harmony export */ });\n/* harmony import */ var _FSAccess_FSAccessAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FSAccess/FSAccessAPI */ \"./src/utils/uniFS/FSAccess/FSAccessAPI.ts\");\n\nasync function createFS() {\n  return new _FSAccess_FSAccessAPI__WEBPACK_IMPORTED_MODULE_0__.FSAccessAPI();\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./src/utils/uniFS/createFS.ts?");

/***/ }),

/***/ "./node_modules/core-js/internals/a-callable.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-callable.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js/internals/try-to-string.js\");\n\nvar $TypeError = TypeError;\n\n// `Assert: IsCallable(argument) is true`\nmodule.exports = function (argument) {\n  if (isCallable(argument)) return argument;\n  throw $TypeError(tryToString(argument) + ' is not a function');\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/a-callable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\n\nvar $String = String;\nvar $TypeError = TypeError;\n\nmodule.exports = function (argument) {\n  if (typeof argument == 'object' || isCallable(argument)) return argument;\n  throw $TypeError(\"Can't set \" + $String(argument) + ' as a prototype');\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/a-possible-prototype.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar $String = String;\nvar $TypeError = TypeError;\n\n// `Assert: Type(argument) is Object`\nmodule.exports = function (argument) {\n  if (isObject(argument)) return argument;\n  throw $TypeError($String(argument) + ' is not an object');\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/an-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-native.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-native.js ***!
  \***************************************************************/
/***/ (function(module) {

eval("// eslint-disable-next-line es-x/no-typed-arrays -- safe\nmodule.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/array-buffer-native.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-buffer-view-core.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-buffer-view-core.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("\nvar NATIVE_ARRAY_BUFFER = __webpack_require__(/*! ../internals/array-buffer-native */ \"./node_modules/core-js/internals/array-buffer-native.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js/internals/classof.js\");\nvar tryToString = __webpack_require__(/*! ../internals/try-to-string */ \"./node_modules/core-js/internals/try-to-string.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js/internals/define-built-in.js\");\nvar defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f);\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js/internals/object-is-prototype-of.js\");\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js/internals/object-get-prototype-of.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js/internals/object-set-prototype-of.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\n\nvar enforceInternalState = InternalStateModule.enforce;\nvar getInternalState = InternalStateModule.get;\nvar Int8Array = global.Int8Array;\nvar Int8ArrayPrototype = Int8Array && Int8Array.prototype;\nvar Uint8ClampedArray = global.Uint8ClampedArray;\nvar Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;\nvar TypedArray = Int8Array && getPrototypeOf(Int8Array);\nvar TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);\nvar ObjectPrototype = Object.prototype;\nvar TypeError = global.TypeError;\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');\nvar TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';\n// Fixing native typed arrays in Opera Presto crashes the browser, see #595\nvar NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';\nvar TYPED_ARRAY_TAG_REQUIRED = false;\nvar NAME, Constructor, Prototype;\n\nvar TypedArrayConstructorsList = {\n  Int8Array: 1,\n  Uint8Array: 1,\n  Uint8ClampedArray: 1,\n  Int16Array: 2,\n  Uint16Array: 2,\n  Int32Array: 4,\n  Uint32Array: 4,\n  Float32Array: 4,\n  Float64Array: 8\n};\n\nvar BigIntArrayConstructorsList = {\n  BigInt64Array: 8,\n  BigUint64Array: 8\n};\n\nvar isView = function isView(it) {\n  if (!isObject(it)) return false;\n  var klass = classof(it);\n  return klass === 'DataView'\n    || hasOwn(TypedArrayConstructorsList, klass)\n    || hasOwn(BigIntArrayConstructorsList, klass);\n};\n\nvar getTypedArrayConstructor = function (it) {\n  var proto = getPrototypeOf(it);\n  if (!isObject(proto)) return;\n  var state = getInternalState(proto);\n  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);\n};\n\nvar isTypedArray = function (it) {\n  if (!isObject(it)) return false;\n  var klass = classof(it);\n  return hasOwn(TypedArrayConstructorsList, klass)\n    || hasOwn(BigIntArrayConstructorsList, klass);\n};\n\nvar aTypedArray = function (it) {\n  if (isTypedArray(it)) return it;\n  throw TypeError('Target is not a typed array');\n};\n\nvar aTypedArrayConstructor = function (C) {\n  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;\n  throw TypeError(tryToString(C) + ' is not a typed array constructor');\n};\n\nvar exportTypedArrayMethod = function (KEY, property, forced, options) {\n  if (!DESCRIPTORS) return;\n  if (forced) for (var ARRAY in TypedArrayConstructorsList) {\n    var TypedArrayConstructor = global[ARRAY];\n    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {\n      delete TypedArrayConstructor.prototype[KEY];\n    } catch (error) {\n      // old WebKit bug - some methods are non-configurable\n      try {\n        TypedArrayConstructor.prototype[KEY] = property;\n      } catch (error2) { /* empty */ }\n    }\n  }\n  if (!TypedArrayPrototype[KEY] || forced) {\n    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property\n      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);\n  }\n};\n\nvar exportTypedArrayStaticMethod = function (KEY, property, forced) {\n  var ARRAY, TypedArrayConstructor;\n  if (!DESCRIPTORS) return;\n  if (setPrototypeOf) {\n    if (forced) for (ARRAY in TypedArrayConstructorsList) {\n      TypedArrayConstructor = global[ARRAY];\n      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {\n        delete TypedArrayConstructor[KEY];\n      } catch (error) { /* empty */ }\n    }\n    if (!TypedArray[KEY] || forced) {\n      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable\n      try {\n        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);\n      } catch (error) { /* empty */ }\n    } else return;\n  }\n  for (ARRAY in TypedArrayConstructorsList) {\n    TypedArrayConstructor = global[ARRAY];\n    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {\n      defineBuiltIn(TypedArrayConstructor, KEY, property);\n    }\n  }\n};\n\nfor (NAME in TypedArrayConstructorsList) {\n  Constructor = global[NAME];\n  Prototype = Constructor && Constructor.prototype;\n  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;\n  else NATIVE_ARRAY_BUFFER_VIEWS = false;\n}\n\nfor (NAME in BigIntArrayConstructorsList) {\n  Constructor = global[NAME];\n  Prototype = Constructor && Constructor.prototype;\n  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;\n}\n\n// WebKit bug - typed arrays constructors prototype is Object.prototype\nif (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {\n  // eslint-disable-next-line no-shadow -- safe\n  TypedArray = function TypedArray() {\n    throw TypeError('Incorrect invocation');\n  };\n  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {\n    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);\n  }\n}\n\nif (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {\n  TypedArrayPrototype = TypedArray.prototype;\n  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {\n    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);\n  }\n}\n\n// WebKit bug - one more object in Uint8ClampedArray prototype chain\nif (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {\n  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);\n}\n\nif (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {\n  TYPED_ARRAY_TAG_REQUIRED = true;\n  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {\n    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;\n  } });\n  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {\n    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);\n  }\n}\n\nmodule.exports = {\n  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,\n  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,\n  aTypedArray: aTypedArray,\n  aTypedArrayConstructor: aTypedArrayConstructor,\n  exportTypedArrayMethod: exportTypedArrayMethod,\n  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,\n  getTypedArrayConstructor: getTypedArrayConstructor,\n  isView: isView,\n  isTypedArray: isTypedArray,\n  TypedArray: TypedArray,\n  TypedArrayPrototype: TypedArrayPrototype\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/array-buffer-view-core.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ \"./node_modules/core-js/internals/to-absolute-index.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js/internals/length-of-array-like.js\");\n\n// `Array.prototype.{ indexOf, includes }` methods implementation\nvar createMethod = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIndexedObject($this);\n    var length = lengthOfArrayLike(O);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare -- NaN check\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare -- NaN check\n      if (value != value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) {\n      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\nmodule.exports = {\n  // `Array.prototype.includes` method\n  // https://tc39.es/ecma262/#sec-array.prototype.includes\n  includes: createMethod(true),\n  // `Array.prototype.indexOf` method\n  // https://tc39.es/ecma262/#sec-array.prototype.indexof\n  indexOf: createMethod(false)\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration-from-last.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration-from-last.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var bind = __webpack_require__(/*! ../internals/function-bind-context */ \"./node_modules/core-js/internals/function-bind-context.js\");\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js/internals/indexed-object.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js/internals/length-of-array-like.js\");\n\n// `Array.prototype.{ findLast, findLastIndex }` methods implementation\nvar createMethod = function (TYPE) {\n  var IS_FIND_LAST_INDEX = TYPE == 1;\n  return function ($this, callbackfn, that) {\n    var O = toObject($this);\n    var self = IndexedObject(O);\n    var boundFunction = bind(callbackfn, that);\n    var index = lengthOfArrayLike(self);\n    var value, result;\n    while (index-- > 0) {\n      value = self[index];\n      result = boundFunction(value, index, O);\n      if (result) switch (TYPE) {\n        case 0: return value; // findLast\n        case 1: return index; // findLastIndex\n      }\n    }\n    return IS_FIND_LAST_INDEX ? -1 : undefined;\n  };\n};\n\nmodule.exports = {\n  // `Array.prototype.findLast` method\n  // https://github.com/tc39/proposal-array-find-from-last\n  findLast: createMethod(0),\n  // `Array.prototype.findLastIndex` method\n  // https://github.com/tc39/proposal-array-find-from-last\n  findLastIndex: createMethod(1)\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/array-iteration-from-last.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\n\nvar toString = uncurryThis({}.toString);\nvar stringSlice = uncurryThis(''.slice);\n\nmodule.exports = function (it) {\n  return stringSlice(toString(it), 8, -1);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/classof-raw.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ \"./node_modules/core-js/internals/to-string-tag-support.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar classofRaw = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar $Object = Object;\n\n// ES3 wrong here\nvar CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (error) { /* empty */ }\n};\n\n// getting tag from ES6+ `Object.prototype.toString`\nmodule.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {\n  var O, tag, result;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag\n    // builtinTag case\n    : CORRECT_ARGUMENTS ? classofRaw(O)\n    // ES3 arguments fallback\n    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/classof.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/clear-error-stack.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/clear-error-stack.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\n\nvar $Error = Error;\nvar replace = uncurryThis(''.replace);\n\nvar TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');\nvar V8_OR_CHAKRA_STACK_ENTRY = /\\n\\s*at [^:]*:[^\\n]*/;\nvar IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);\n\nmodule.exports = function (stack, dropEntries) {\n  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {\n    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');\n  } return stack;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/clear-error-stack.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar ownKeys = __webpack_require__(/*! ../internals/own-keys */ \"./node_modules/core-js/internals/own-keys.js\");\nvar getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\n\nmodule.exports = function (target, source, exceptions) {\n  var keys = ownKeys(source);\n  var defineProperty = definePropertyModule.f;\n  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {\n      defineProperty(target, key, getOwnPropertyDescriptor(source, key));\n    }\n  }\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/copy-constructor-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  function F() { /* empty */ }\n  F.prototype.constructor = null;\n  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing\n  return Object.getPrototypeOf(new F()) !== F.prototype;\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/correct-prototype-getter.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\n\nmodule.exports = DESCRIPTORS ? function (object, key, value) {\n  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/create-non-enumerable-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ (function(module) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/create-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/define-built-in.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ \"./node_modules/core-js/internals/make-built-in.js\");\nvar defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ \"./node_modules/core-js/internals/define-global-property.js\");\n\nmodule.exports = function (O, key, value, options) {\n  if (!options) options = {};\n  var simple = options.enumerable;\n  var name = options.name !== undefined ? options.name : key;\n  if (isCallable(value)) makeBuiltIn(value, name, options);\n  if (options.global) {\n    if (simple) O[key] = value;\n    else defineGlobalProperty(key, value);\n  } else {\n    try {\n      if (!options.unsafe) delete O[key];\n      else if (O[key]) simple = true;\n    } catch (error) { /* empty */ }\n    if (simple) O[key] = value;\n    else definePropertyModule.f(O, key, {\n      value: value,\n      enumerable: false,\n      configurable: !options.nonConfigurable,\n      writable: !options.nonWritable\n    });\n  } return O;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/define-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/define-global-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/define-global-property.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\n// eslint-disable-next-line es-x/no-object-defineproperty -- safe\nvar defineProperty = Object.defineProperty;\n\nmodule.exports = function (key, value) {\n  try {\n    defineProperty(global, key, { value: value, configurable: true, writable: true });\n  } catch (error) {\n    global[key] = value;\n  } return value;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/define-global-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\n// Detect IE8's incomplete defineProperty implementation\nmodule.exports = !fails(function () {\n  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing\n  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar document = global.document;\n// typeof document.createElement is 'object' in old IE\nvar EXISTS = isObject(document) && isObject(document.createElement);\n\nmodule.exports = function (it) {\n  return EXISTS ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/document-create-element.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\n\nmodule.exports = getBuiltIn('navigator', 'userAgent') || '';\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/engine-user-agent.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ \"./node_modules/core-js/internals/engine-user-agent.js\");\n\nvar process = global.process;\nvar Deno = global.Deno;\nvar versions = process && process.versions || Deno && Deno.version;\nvar v8 = versions && versions.v8;\nvar match, version;\n\nif (v8) {\n  match = v8.split('.');\n  // in old Chrome, versions of V8 isn't V8 = Chrome / 10\n  // but their correct versions are not interesting for us\n  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);\n}\n\n// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`\n// so check `userAgent` even if `.v8` exists, but 0\nif (!version && userAgent) {\n  match = userAgent.match(/Edge\\/(\\d+)/);\n  if (!match || match[1] >= 74) {\n    match = userAgent.match(/Chrome\\/(\\d+)/);\n    if (match) version = +match[1];\n  }\n}\n\nmodule.exports = version;\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/engine-v8-version.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ (function(module) {

eval("// IE8- don't enum bug keys\nmodule.exports = [\n  'constructor',\n  'hasOwnProperty',\n  'isPrototypeOf',\n  'propertyIsEnumerable',\n  'toLocaleString',\n  'toString',\n  'valueOf'\n];\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/error-stack-installable.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/error-stack-installable.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\n\nmodule.exports = !fails(function () {\n  var error = Error('a');\n  if (!('stack' in error)) return true;\n  // eslint-disable-next-line es-x/no-object-defineproperty -- safe\n  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));\n  return error.stack !== 7;\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/error-stack-installable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\").f);\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ \"./node_modules/core-js/internals/define-built-in.js\");\nvar defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ \"./node_modules/core-js/internals/define-global-property.js\");\nvar copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ \"./node_modules/core-js/internals/copy-constructor-properties.js\");\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js/internals/is-forced.js\");\n\n/*\n  options.target         - name of the target object\n  options.global         - target is the global object\n  options.stat           - export as static methods of target\n  options.proto          - export as prototype methods of target\n  options.real           - real prototype method for the `pure` version\n  options.forced         - export even if the native feature is available\n  options.bind           - bind methods to the target, required for the `pure` version\n  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version\n  options.unsafe         - use the simple assignment of property instead of delete + defineProperty\n  options.sham           - add a flag to not completely full polyfills\n  options.enumerable     - export as enumerable property\n  options.dontCallGetSet - prevent calling a getter on target\n  options.name           - the .name of the function if it does not match the key\n*/\nmodule.exports = function (options, source) {\n  var TARGET = options.target;\n  var GLOBAL = options.global;\n  var STATIC = options.stat;\n  var FORCED, target, key, targetProperty, sourceProperty, descriptor;\n  if (GLOBAL) {\n    target = global;\n  } else if (STATIC) {\n    target = global[TARGET] || defineGlobalProperty(TARGET, {});\n  } else {\n    target = (global[TARGET] || {}).prototype;\n  }\n  if (target) for (key in source) {\n    sourceProperty = source[key];\n    if (options.dontCallGetSet) {\n      descriptor = getOwnPropertyDescriptor(target, key);\n      targetProperty = descriptor && descriptor.value;\n    } else targetProperty = target[key];\n    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);\n    // contained in target\n    if (!FORCED && targetProperty !== undefined) {\n      if (typeof sourceProperty == typeof targetProperty) continue;\n      copyConstructorProperties(sourceProperty, targetProperty);\n    }\n    // add a flag to not completely full polyfills\n    if (options.sham || (targetProperty && targetProperty.sham)) {\n      createNonEnumerableProperty(sourceProperty, 'sham', true);\n    }\n    defineBuiltIn(target, key, sourceProperty, options);\n  }\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/export.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ (function(module) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (error) {\n    return true;\n  }\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/fails.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-apply.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/function-apply.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js/internals/function-bind-native.js\");\n\nvar FunctionPrototype = Function.prototype;\nvar apply = FunctionPrototype.apply;\nvar call = FunctionPrototype.call;\n\n// eslint-disable-next-line es-x/no-reflect -- safe\nmodule.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {\n  return call.apply(apply, arguments);\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/function-apply.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js/internals/a-callable.js\");\nvar NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js/internals/function-bind-native.js\");\n\nvar bind = uncurryThis(uncurryThis.bind);\n\n// optional / simple context binding\nmodule.exports = function (fn, that) {\n  aCallable(fn);\n  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/function-bind-context.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-native.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-native.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe\n  var test = (function () { /* empty */ }).bind();\n  // eslint-disable-next-line no-prototype-builtins -- safe\n  return typeof test != 'function' || test.hasOwnProperty('prototype');\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/function-bind-native.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-call.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-call.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js/internals/function-bind-native.js\");\n\nvar call = Function.prototype.call;\n\nmodule.exports = NATIVE_BIND ? call.bind(call) : function () {\n  return call.apply(call, arguments);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/function-call.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-name.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-name.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\n\nvar FunctionPrototype = Function.prototype;\n// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe\nvar getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;\n\nvar EXISTS = hasOwn(FunctionPrototype, 'name');\n// additional protection from minified / mangled / dropped function names\nvar PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';\nvar CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));\n\nmodule.exports = {\n  EXISTS: EXISTS,\n  PROPER: PROPER,\n  CONFIGURABLE: CONFIGURABLE\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/function-name.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ \"./node_modules/core-js/internals/function-bind-native.js\");\n\nvar FunctionPrototype = Function.prototype;\nvar bind = FunctionPrototype.bind;\nvar call = FunctionPrototype.call;\nvar uncurryThis = NATIVE_BIND && bind.bind(call, call);\n\nmodule.exports = NATIVE_BIND ? function (fn) {\n  return fn && uncurryThis(fn);\n} : function (fn) {\n  return fn && function () {\n    return call.apply(fn, arguments);\n  };\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/function-uncurry-this.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\n\nvar aFunction = function (argument) {\n  return isCallable(argument) ? argument : undefined;\n};\n\nmodule.exports = function (namespace, method) {\n  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/get-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-method.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/get-method.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var aCallable = __webpack_require__(/*! ../internals/a-callable */ \"./node_modules/core-js/internals/a-callable.js\");\n\n// `GetMethod` abstract operation\n// https://tc39.es/ecma262/#sec-getmethod\nmodule.exports = function (V, P) {\n  var func = V[P];\n  return func == null ? undefined : aCallable(func);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/get-method.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var check = function (it) {\n  return it && it.Math == Math && it;\n};\n\n// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nmodule.exports =\n  // eslint-disable-next-line es-x/no-global-this -- safe\n  check(typeof globalThis == 'object' && globalThis) ||\n  check(typeof window == 'object' && window) ||\n  // eslint-disable-next-line no-restricted-globals -- safe\n  check(typeof self == 'object' && self) ||\n  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||\n  // eslint-disable-next-line no-new-func -- fallback\n  (function () { return this; })() || Function('return this')();\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/global.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/has-own-property.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/has-own-property.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\n\nvar hasOwnProperty = uncurryThis({}.hasOwnProperty);\n\n// `HasOwnProperty` abstract operation\n// https://tc39.es/ecma262/#sec-hasownproperty\n// eslint-disable-next-line es-x/no-object-hasown -- safe\nmodule.exports = Object.hasOwn || function hasOwn(it, key) {\n  return hasOwnProperty(toObject(it), key);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/has-own-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ (function(module) {

eval("module.exports = {};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/hidden-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar createElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\n\n// Thanks to IE8 for its funny defineProperty\nmodule.exports = !DESCRIPTORS && !fails(function () {\n  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing\n  return Object.defineProperty(createElement('div'), 'a', {\n    get: function () { return 7; }\n  }).a != 7;\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\n\nvar $Object = Object;\nvar split = uncurryThis(''.split);\n\n// fallback for non-array-like ES3 and non-enumerable old V8 strings\nmodule.exports = fails(function () {\n  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346\n  // eslint-disable-next-line no-prototype-builtins -- safe\n  return !$Object('z').propertyIsEnumerable(0);\n}) ? function (it) {\n  return classof(it) == 'String' ? split(it, '') : $Object(it);\n} : $Object;\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/inherit-if-required.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js/internals/object-set-prototype-of.js\");\n\n// makes subclassing work correct for wrapped built-ins\nmodule.exports = function ($this, dummy, Wrapper) {\n  var NewTarget, NewTargetPrototype;\n  if (\n    // it can work only with native `setPrototypeOf`\n    setPrototypeOf &&\n    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this\n    isCallable(NewTarget = dummy.constructor) &&\n    NewTarget !== Wrapper &&\n    isObject(NewTargetPrototype = NewTarget.prototype) &&\n    NewTargetPrototype !== Wrapper.prototype\n  ) setPrototypeOf($this, NewTargetPrototype);\n  return $this;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/inherit-if-required.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar store = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js/internals/shared-store.js\");\n\nvar functionToString = uncurryThis(Function.toString);\n\n// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper\nif (!isCallable(store.inspectSource)) {\n  store.inspectSource = function (it) {\n    return functionToString(it);\n  };\n}\n\nmodule.exports = store.inspectSource;\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/inspect-source.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/install-error-cause.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/install-error-cause.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\n\n// `InstallErrorCause` abstract operation\n// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause\nmodule.exports = function (O, options) {\n  if (isObject(options) && 'cause' in options) {\n    createNonEnumerableProperty(O, 'cause', options.cause);\n  }\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/install-error-cause.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ \"./node_modules/core-js/internals/native-weak-map.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar shared = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js/internals/shared-store.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nvar OBJECT_ALREADY_INITIALIZED = 'Object already initialized';\nvar TypeError = global.TypeError;\nvar WeakMap = global.WeakMap;\nvar set, get, has;\n\nvar enforce = function (it) {\n  return has(it) ? get(it) : set(it, {});\n};\n\nvar getterFor = function (TYPE) {\n  return function (it) {\n    var state;\n    if (!isObject(it) || (state = get(it)).type !== TYPE) {\n      throw TypeError('Incompatible receiver, ' + TYPE + ' required');\n    } return state;\n  };\n};\n\nif (NATIVE_WEAK_MAP || shared.state) {\n  var store = shared.state || (shared.state = new WeakMap());\n  var wmget = uncurryThis(store.get);\n  var wmhas = uncurryThis(store.has);\n  var wmset = uncurryThis(store.set);\n  set = function (it, metadata) {\n    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);\n    metadata.facade = it;\n    wmset(store, it, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return wmget(store, it) || {};\n  };\n  has = function (it) {\n    return wmhas(store, it);\n  };\n} else {\n  var STATE = sharedKey('state');\n  hiddenKeys[STATE] = true;\n  set = function (it, metadata) {\n    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);\n    metadata.facade = it;\n    createNonEnumerableProperty(it, STATE, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return hasOwn(it, STATE) ? it[STATE] : {};\n  };\n  has = function (it) {\n    return hasOwn(it, STATE);\n  };\n}\n\nmodule.exports = {\n  set: set,\n  get: get,\n  has: has,\n  enforce: enforce,\n  getterFor: getterFor\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/internal-state.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-callable.js ***!
  \*******************************************************/
/***/ (function(module) {

eval("// `IsCallable` abstract operation\n// https://tc39.es/ecma262/#sec-iscallable\nmodule.exports = function (argument) {\n  return typeof argument == 'function';\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/is-callable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\n\nvar replacement = /#|\\.prototype\\./;\n\nvar isForced = function (feature, detection) {\n  var value = data[normalize(feature)];\n  return value == POLYFILL ? true\n    : value == NATIVE ? false\n    : isCallable(detection) ? fails(detection)\n    : !!detection;\n};\n\nvar normalize = isForced.normalize = function (string) {\n  return String(string).replace(replacement, '.').toLowerCase();\n};\n\nvar data = isForced.data = {};\nvar NATIVE = isForced.NATIVE = 'N';\nvar POLYFILL = isForced.POLYFILL = 'P';\n\nmodule.exports = isForced;\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/is-forced.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\n\nmodule.exports = function (it) {\n  return typeof it == 'object' ? it !== null : isCallable(it);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/is-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ (function(module) {

eval("module.exports = false;\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/is-pure.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-symbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js/internals/object-is-prototype-of.js\");\nvar USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ \"./node_modules/core-js/internals/use-symbol-as-uid.js\");\n\nvar $Object = Object;\n\nmodule.exports = USE_SYMBOL_AS_UID ? function (it) {\n  return typeof it == 'symbol';\n} : function (it) {\n  var $Symbol = getBuiltIn('Symbol');\n  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/is-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/length-of-array-like.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/length-of-array-like.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\n\n// `LengthOfArrayLike` abstract operation\n// https://tc39.es/ecma262/#sec-lengthofarraylike\nmodule.exports = function (obj) {\n  return toLength(obj.length);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/length-of-array-like.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/make-built-in.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/make-built-in.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ \"./node_modules/core-js/internals/function-name.js\").CONFIGURABLE);\nvar inspectSource = __webpack_require__(/*! ../internals/inspect-source */ \"./node_modules/core-js/internals/inspect-source.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\n\nvar enforceInternalState = InternalStateModule.enforce;\nvar getInternalState = InternalStateModule.get;\n// eslint-disable-next-line es-x/no-object-defineproperty -- safe\nvar defineProperty = Object.defineProperty;\n\nvar CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {\n  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;\n});\n\nvar TEMPLATE = String(String).split('String');\n\nvar makeBuiltIn = module.exports = function (value, name, options) {\n  if (String(name).slice(0, 7) === 'Symbol(') {\n    name = '[' + String(name).replace(/^Symbol\\(([^)]*)\\)/, '$1') + ']';\n  }\n  if (options && options.getter) name = 'get ' + name;\n  if (options && options.setter) name = 'set ' + name;\n  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {\n    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });\n    else value.name = name;\n  }\n  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {\n    defineProperty(value, 'length', { value: options.arity });\n  }\n  try {\n    if (options && hasOwn(options, 'constructor') && options.constructor) {\n      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });\n    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable\n    } else if (value.prototype) value.prototype = undefined;\n  } catch (error) { /* empty */ }\n  var state = enforceInternalState(value);\n  if (!hasOwn(state, 'source')) {\n    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');\n  } return value;\n};\n\n// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative\n// eslint-disable-next-line no-extend-native -- required\nFunction.prototype.toString = makeBuiltIn(function toString() {\n  return isCallable(this) && getInternalState(this).source || inspectSource(this);\n}, 'toString');\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/make-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/math-trunc.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/math-trunc.js ***!
  \******************************************************/
/***/ (function(module) {

eval("var ceil = Math.ceil;\nvar floor = Math.floor;\n\n// `Math.trunc` method\n// https://tc39.es/ecma262/#sec-math.trunc\n// eslint-disable-next-line es-x/no-math-trunc -- safe\nmodule.exports = Math.trunc || function trunc(x) {\n  var n = +x;\n  return (n > 0 ? floor : ceil)(n);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/math-trunc.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/* eslint-disable es-x/no-symbol -- required for testing */\nvar V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ \"./node_modules/core-js/internals/engine-v8-version.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\n// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing\nmodule.exports = !!Object.getOwnPropertySymbols && !fails(function () {\n  var symbol = Symbol();\n  // Chrome 38 Symbol has incorrect toString conversion\n  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances\n  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||\n    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances\n    !Symbol.sham && V8_VERSION && V8_VERSION < 41;\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/native-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar inspectSource = __webpack_require__(/*! ../internals/inspect-source */ \"./node_modules/core-js/internals/inspect-source.js\");\n\nvar WeakMap = global.WeakMap;\n\nmodule.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/native-weak-map.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/normalize-string-argument.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/normalize-string-argument.js ***!
  \*********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var toString = __webpack_require__(/*! ../internals/to-string */ \"./node_modules/core-js/internals/to-string.js\");\n\nmodule.exports = function (argument, $default) {\n  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/normalize-string-argument.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\nvar V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ \"./node_modules/core-js/internals/v8-prototype-define-bug.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ \"./node_modules/core-js/internals/to-property-key.js\");\n\nvar $TypeError = TypeError;\n// eslint-disable-next-line es-x/no-object-defineproperty -- safe\nvar $defineProperty = Object.defineProperty;\n// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe\nvar $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\nvar ENUMERABLE = 'enumerable';\nvar CONFIGURABLE = 'configurable';\nvar WRITABLE = 'writable';\n\n// `Object.defineProperty` method\n// https://tc39.es/ecma262/#sec-object.defineproperty\nexports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPropertyKey(P);\n  anObject(Attributes);\n  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {\n    var current = $getOwnPropertyDescriptor(O, P);\n    if (current && current[WRITABLE]) {\n      O[P] = Attributes.value;\n      Attributes = {\n        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],\n        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],\n        writable: false\n      };\n    }\n  } return $defineProperty(O, P, Attributes);\n} : $defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPropertyKey(P);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return $defineProperty(O, P, Attributes);\n  } catch (error) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js/internals/object-property-is-enumerable.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ \"./node_modules/core-js/internals/to-property-key.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\n\n// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe\nvar $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// `Object.getOwnPropertyDescriptor` method\n// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor\nexports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {\n  O = toIndexedObject(O);\n  P = toPropertyKey(P);\n  if (IE8_DOM_DEFINE) try {\n    return $getOwnPropertyDescriptor(O, P);\n  } catch (error) { /* empty */ }\n  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-get-own-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\n\nvar hiddenKeys = enumBugKeys.concat('length', 'prototype');\n\n// `Object.getOwnPropertyNames` method\n// https://tc39.es/ecma262/#sec-object.getownpropertynames\n// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return internalObjectKeys(O, hiddenKeys);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-get-own-property-names.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe\nexports.f = Object.getOwnPropertySymbols;\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-get-own-property-symbols.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ \"./node_modules/core-js/internals/correct-prototype-getter.js\");\n\nvar IE_PROTO = sharedKey('IE_PROTO');\nvar $Object = Object;\nvar ObjectPrototype = $Object.prototype;\n\n// `Object.getPrototypeOf` method\n// https://tc39.es/ecma262/#sec-object.getprototypeof\n// eslint-disable-next-line es-x/no-object-getprototypeof -- safe\nmodule.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {\n  var object = toObject(O);\n  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];\n  var constructor = object.constructor;\n  if (isCallable(constructor) && object instanceof constructor) {\n    return constructor.prototype;\n  } return object instanceof $Object ? ObjectPrototype : null;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-is-prototype-of.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-is-prototype-of.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\n\nmodule.exports = uncurryThis({}.isPrototypeOf);\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-is-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar indexOf = (__webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js/internals/array-includes.js\").indexOf);\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nvar push = uncurryThis([].push);\n\nmodule.exports = function (object, names) {\n  var O = toIndexedObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (hasOwn(O, key = names[i++])) {\n    ~indexOf(result, key) || push(result, key);\n  }\n  return result;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
eval("\nvar $propertyIsEnumerable = {}.propertyIsEnumerable;\n// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// Nashorn ~ JDK8 bug\nvar NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);\n\n// `Object.prototype.propertyIsEnumerable` method implementation\n// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable\nexports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {\n  var descriptor = getOwnPropertyDescriptor(this, V);\n  return !!descriptor && descriptor.enumerable;\n} : $propertyIsEnumerable;\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-property-is-enumerable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/* eslint-disable no-proto -- safe */\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ \"./node_modules/core-js/internals/a-possible-prototype.js\");\n\n// `Object.setPrototypeOf` method\n// https://tc39.es/ecma262/#sec-object.setprototypeof\n// Works with __proto__ only. Old v8 can't work with null proto objects.\n// eslint-disable-next-line es-x/no-object-setprototypeof -- safe\nmodule.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {\n  var CORRECT_SETTER = false;\n  var test = {};\n  var setter;\n  try {\n    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe\n    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);\n    setter(test, []);\n    CORRECT_SETTER = test instanceof Array;\n  } catch (error) { /* empty */ }\n  return function setPrototypeOf(O, proto) {\n    anObject(O);\n    aPossiblePrototype(proto);\n    if (CORRECT_SETTER) setter(O, proto);\n    else O.__proto__ = proto;\n    return O;\n  };\n}() : undefined);\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/object-set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar isCallable = __webpack_require__(/*! ../internals/is-callable */ \"./node_modules/core-js/internals/is-callable.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar $TypeError = TypeError;\n\n// `OrdinaryToPrimitive` abstract operation\n// https://tc39.es/ecma262/#sec-ordinarytoprimitive\nmodule.exports = function (input, pref) {\n  var fn, val;\n  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;\n  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;\n  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;\n  throw $TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/ordinary-to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\nvar getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js/internals/object-get-own-property-names.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js/internals/object-get-own-property-symbols.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\nvar concat = uncurryThis([].concat);\n\n// all object keys, includes non-enumerable and symbols\nmodule.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {\n  var keys = getOwnPropertyNamesModule.f(anObject(it));\n  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/own-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/proxy-accessor.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/proxy-accessor.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f);\n\nmodule.exports = function (Target, Source, key) {\n  key in Target || defineProperty(Target, key, {\n    configurable: true,\n    get: function () { return Source[key]; },\n    set: function (it) { Source[key] = it; }\n  });\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/proxy-accessor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ (function(module) {

eval("var $TypeError = TypeError;\n\n// `RequireObjectCoercible` abstract operation\n// https://tc39.es/ecma262/#sec-requireobjectcoercible\nmodule.exports = function (it) {\n  if (it == undefined) throw $TypeError(\"Can't call method on \" + it);\n  return it;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/require-object-coercible.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\n\nvar keys = shared('keys');\n\nmodule.exports = function (key) {\n  return keys[key] || (keys[key] = uid(key));\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ \"./node_modules/core-js/internals/define-global-property.js\");\n\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || defineGlobalProperty(SHARED, {});\n\nmodule.exports = store;\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/shared-store.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar store = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js/internals/shared-store.js\");\n\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: '3.24.1',\n  mode: IS_PURE ? 'pure' : 'global',\n  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',\n  license: 'https://github.com/zloirock/core-js/blob/v3.24.1/LICENSE',\n  source: 'https://github.com/zloirock/core-js'\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/shared.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ \"./node_modules/core-js/internals/to-integer-or-infinity.js\");\n\nvar max = Math.max;\nvar min = Math.min;\n\n// Helper for a popular repeating case of the spec:\n// Let integer be ? ToInteger(index).\n// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).\nmodule.exports = function (index, length) {\n  var integer = toIntegerOrInfinity(index);\n  return integer < 0 ? max(integer + length, 0) : min(integer, length);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// toObject with fallback for non-array-like ES3 strings\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js/internals/indexed-object.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\nmodule.exports = function (it) {\n  return IndexedObject(requireObjectCoercible(it));\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-integer-or-infinity.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var trunc = __webpack_require__(/*! ../internals/math-trunc */ \"./node_modules/core-js/internals/math-trunc.js\");\n\n// `ToIntegerOrInfinity` abstract operation\n// https://tc39.es/ecma262/#sec-tointegerorinfinity\nmodule.exports = function (argument) {\n  var number = +argument;\n  // eslint-disable-next-line no-self-compare -- NaN check\n  return number !== number || number === 0 ? 0 : trunc(number);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-integer-or-infinity.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ \"./node_modules/core-js/internals/to-integer-or-infinity.js\");\n\nvar min = Math.min;\n\n// `ToLength` abstract operation\n// https://tc39.es/ecma262/#sec-tolength\nmodule.exports = function (argument) {\n  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-length.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\nvar $Object = Object;\n\n// `ToObject` abstract operation\n// https://tc39.es/ecma262/#sec-toobject\nmodule.exports = function (argument) {\n  return $Object(requireObjectCoercible(argument));\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var call = __webpack_require__(/*! ../internals/function-call */ \"./node_modules/core-js/internals/function-call.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js/internals/is-symbol.js\");\nvar getMethod = __webpack_require__(/*! ../internals/get-method */ \"./node_modules/core-js/internals/get-method.js\");\nvar ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ \"./node_modules/core-js/internals/ordinary-to-primitive.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar $TypeError = TypeError;\nvar TO_PRIMITIVE = wellKnownSymbol('toPrimitive');\n\n// `ToPrimitive` abstract operation\n// https://tc39.es/ecma262/#sec-toprimitive\nmodule.exports = function (input, pref) {\n  if (!isObject(input) || isSymbol(input)) return input;\n  var exoticToPrim = getMethod(input, TO_PRIMITIVE);\n  var result;\n  if (exoticToPrim) {\n    if (pref === undefined) pref = 'default';\n    result = call(exoticToPrim, input, pref);\n    if (!isObject(result) || isSymbol(result)) return result;\n    throw $TypeError(\"Can't convert object to primitive value\");\n  }\n  if (pref === undefined) pref = 'number';\n  return ordinaryToPrimitive(input, pref);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-property-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\nvar isSymbol = __webpack_require__(/*! ../internals/is-symbol */ \"./node_modules/core-js/internals/is-symbol.js\");\n\n// `ToPropertyKey` abstract operation\n// https://tc39.es/ecma262/#sec-topropertykey\nmodule.exports = function (argument) {\n  var key = toPrimitive(argument, 'string');\n  return isSymbol(key) ? key : key + '';\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-property-key.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar test = {};\n\ntest[TO_STRING_TAG] = 'z';\n\nmodule.exports = String(test) === '[object z]';\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-string-tag-support.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-string.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ../internals/classof */ \"./node_modules/core-js/internals/classof.js\");\n\nvar $String = String;\n\nmodule.exports = function (argument) {\n  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');\n  return $String(argument);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/try-to-string.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/try-to-string.js ***!
  \*********************************************************/
/***/ (function(module) {

eval("var $String = String;\n\nmodule.exports = function (argument) {\n  try {\n    return $String(argument);\n  } catch (error) {\n    return 'Object';\n  }\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/try-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ \"./node_modules/core-js/internals/function-uncurry-this.js\");\n\nvar id = 0;\nvar postfix = Math.random();\nvar toString = uncurryThis(1.0.toString);\n\nmodule.exports = function (key) {\n  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/uid.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("/* eslint-disable es-x/no-symbol -- required for testing */\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ \"./node_modules/core-js/internals/native-symbol.js\");\n\nmodule.exports = NATIVE_SYMBOL\n  && !Symbol.sham\n  && typeof Symbol.iterator == 'symbol';\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/use-symbol-as-uid.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/v8-prototype-define-bug.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\n// V8 ~ Chrome 36-\n// https://bugs.chromium.org/p/v8/issues/detail?id=3334\nmodule.exports = DESCRIPTORS && fails(function () {\n  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing\n  return Object.defineProperty(function () { /* empty */ }, 'prototype', {\n    value: 42,\n    writable: false\n  }).prototype != 42;\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/v8-prototype-define-bug.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ \"./node_modules/core-js/internals/native-symbol.js\");\nvar USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ \"./node_modules/core-js/internals/use-symbol-as-uid.js\");\n\nvar WellKnownSymbolsStore = shared('wks');\nvar Symbol = global.Symbol;\nvar symbolFor = Symbol && Symbol['for'];\nvar createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;\n\nmodule.exports = function (name) {\n  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {\n    var description = 'Symbol.' + name;\n    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {\n      WellKnownSymbolsStore[name] = Symbol[name];\n    } else if (USE_SYMBOL_AS_UID && symbolFor) {\n      WellKnownSymbolsStore[name] = symbolFor(description);\n    } else {\n      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);\n    }\n  } return WellKnownSymbolsStore[name];\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/wrap-error-constructor-with-cause.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/internals/wrap-error-constructor-with-cause.js ***!
  \*****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("\nvar getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar hasOwn = __webpack_require__(/*! ../internals/has-own-property */ \"./node_modules/core-js/internals/has-own-property.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ \"./node_modules/core-js/internals/object-is-prototype-of.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js/internals/object-set-prototype-of.js\");\nvar copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ \"./node_modules/core-js/internals/copy-constructor-properties.js\");\nvar proxyAccessor = __webpack_require__(/*! ../internals/proxy-accessor */ \"./node_modules/core-js/internals/proxy-accessor.js\");\nvar inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ \"./node_modules/core-js/internals/inherit-if-required.js\");\nvar normalizeStringArgument = __webpack_require__(/*! ../internals/normalize-string-argument */ \"./node_modules/core-js/internals/normalize-string-argument.js\");\nvar installErrorCause = __webpack_require__(/*! ../internals/install-error-cause */ \"./node_modules/core-js/internals/install-error-cause.js\");\nvar clearErrorStack = __webpack_require__(/*! ../internals/clear-error-stack */ \"./node_modules/core-js/internals/clear-error-stack.js\");\nvar ERROR_STACK_INSTALLABLE = __webpack_require__(/*! ../internals/error-stack-installable */ \"./node_modules/core-js/internals/error-stack-installable.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\n\nmodule.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {\n  var STACK_TRACE_LIMIT = 'stackTraceLimit';\n  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;\n  var path = FULL_NAME.split('.');\n  var ERROR_NAME = path[path.length - 1];\n  var OriginalError = getBuiltIn.apply(null, path);\n\n  if (!OriginalError) return;\n\n  var OriginalErrorPrototype = OriginalError.prototype;\n\n  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006\n  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;\n\n  if (!FORCED) return OriginalError;\n\n  var BaseError = getBuiltIn('Error');\n\n  var WrappedError = wrapper(function (a, b) {\n    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);\n    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();\n    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);\n    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));\n    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);\n    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);\n    return result;\n  });\n\n  WrappedError.prototype = OriginalErrorPrototype;\n\n  if (ERROR_NAME !== 'Error') {\n    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);\n    else copyConstructorProperties(WrappedError, BaseError, { name: true });\n  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {\n    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);\n    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');\n  }\n\n  copyConstructorProperties(WrappedError, OriginalError);\n\n  if (!IS_PURE) try {\n    // Safari 13- bug: WebAssembly errors does not have a proper `.name`\n    if (OriginalErrorPrototype.name !== ERROR_NAME) {\n      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);\n    }\n    OriginalErrorPrototype.constructor = WrappedError;\n  } catch (error) { /* empty */ }\n\n  return WrappedError;\n};\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/internals/wrap-error-constructor-with-cause.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.error.cause.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.error.cause.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("/* eslint-disable no-unused-vars -- required for functions `.length` */\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar apply = __webpack_require__(/*! ../internals/function-apply */ \"./node_modules/core-js/internals/function-apply.js\");\nvar wrapErrorConstructorWithCause = __webpack_require__(/*! ../internals/wrap-error-constructor-with-cause */ \"./node_modules/core-js/internals/wrap-error-constructor-with-cause.js\");\n\nvar WEB_ASSEMBLY = 'WebAssembly';\nvar WebAssembly = global[WEB_ASSEMBLY];\n\nvar FORCED = Error('e', { cause: 7 }).cause !== 7;\n\nvar exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {\n  var O = {};\n  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);\n  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);\n};\n\nvar exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {\n  if (WebAssembly && WebAssembly[ERROR_NAME]) {\n    var O = {};\n    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);\n    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);\n  }\n};\n\n// https://github.com/tc39/proposal-error-cause\nexportGlobalErrorCauseWrapper('Error', function (init) {\n  return function Error(message) { return apply(init, this, arguments); };\n});\nexportGlobalErrorCauseWrapper('EvalError', function (init) {\n  return function EvalError(message) { return apply(init, this, arguments); };\n});\nexportGlobalErrorCauseWrapper('RangeError', function (init) {\n  return function RangeError(message) { return apply(init, this, arguments); };\n});\nexportGlobalErrorCauseWrapper('ReferenceError', function (init) {\n  return function ReferenceError(message) { return apply(init, this, arguments); };\n});\nexportGlobalErrorCauseWrapper('SyntaxError', function (init) {\n  return function SyntaxError(message) { return apply(init, this, arguments); };\n});\nexportGlobalErrorCauseWrapper('TypeError', function (init) {\n  return function TypeError(message) { return apply(init, this, arguments); };\n});\nexportGlobalErrorCauseWrapper('URIError', function (init) {\n  return function URIError(message) { return apply(init, this, arguments); };\n});\nexportWebAssemblyErrorCauseWrapper('CompileError', function (init) {\n  return function CompileError(message) { return apply(init, this, arguments); };\n});\nexportWebAssemblyErrorCauseWrapper('LinkError', function (init) {\n  return function LinkError(message) { return apply(init, this, arguments); };\n});\nexportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {\n  return function RuntimeError(message) { return apply(init, this, arguments); };\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/modules/es.error.cause.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.at.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.at.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("\nvar ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ \"./node_modules/core-js/internals/array-buffer-view-core.js\");\nvar lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ \"./node_modules/core-js/internals/length-of-array-like.js\");\nvar toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ \"./node_modules/core-js/internals/to-integer-or-infinity.js\");\n\nvar aTypedArray = ArrayBufferViewCore.aTypedArray;\nvar exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;\n\n// `%TypedArray%.prototype.at` method\n// https://github.com/tc39/proposal-relative-indexing-method\nexportTypedArrayMethod('at', function at(index) {\n  var O = aTypedArray(this);\n  var len = lengthOfArrayLike(O);\n  var relativeIndex = toIntegerOrInfinity(index);\n  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;\n  return (k < 0 || k >= len) ? undefined : O[k];\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/modules/es.typed-array.at.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.find-last-index.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.find-last-index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("\nvar ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ \"./node_modules/core-js/internals/array-buffer-view-core.js\");\nvar $findLastIndex = (__webpack_require__(/*! ../internals/array-iteration-from-last */ \"./node_modules/core-js/internals/array-iteration-from-last.js\").findLastIndex);\n\nvar aTypedArray = ArrayBufferViewCore.aTypedArray;\nvar exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;\n\n// `%TypedArray%.prototype.findLastIndex` method\n// https://github.com/tc39/proposal-array-find-from-last\nexportTypedArrayMethod('findLastIndex', function findLastIndex(predicate /* , thisArg */) {\n  return $findLastIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/modules/es.typed-array.find-last-index.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.typed-array.find-last.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.typed-array.find-last.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("\nvar ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ \"./node_modules/core-js/internals/array-buffer-view-core.js\");\nvar $findLast = (__webpack_require__(/*! ../internals/array-iteration-from-last */ \"./node_modules/core-js/internals/array-iteration-from-last.js\").findLast);\n\nvar aTypedArray = ArrayBufferViewCore.aTypedArray;\nvar exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;\n\n// `%TypedArray%.prototype.findLast` method\n// https://github.com/tc39/proposal-array-find-from-last\nexportTypedArrayMethod('findLast', function findLast(predicate /* , thisArg */) {\n  return $findLast(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);\n});\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/modules/es.typed-array.find-last.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.typed-array.find-last-index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.typed-array.find-last-index.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../modules/es.typed-array.find-last-index */ \"./node_modules/core-js/modules/es.typed-array.find-last-index.js\");\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/modules/esnext.typed-array.find-last-index.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.typed-array.find-last.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.typed-array.find-last.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("// TODO: Remove from `core-js@4`\n__webpack_require__(/*! ../modules/es.typed-array.find-last */ \"./node_modules/core-js/modules/es.typed-array.find-last.js\");\n\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/core-js/modules/esnext.typed-array.find-last.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ rng; }\n/* harmony export */ });\n// Unique ID creation requires a high quality random # generator. In the browser we therefore\n// require the crypto API and do not support built-in fallback to lower quality random number\n// generators (like Math.random()).\nvar getRandomValues;\nvar rnds8 = new Uint8Array(16);\nfunction rng() {\n  // lazy load so that environments that need to polyfill have a chance to do so\n  if (!getRandomValues) {\n    // getRandomValues needs to be invoked in a context where \"this\" is a Crypto implementation. Also,\n    // find the complete implementation of crypto (msCrypto) on IE11.\n    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);\n\n    if (!getRandomValues) {\n      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n    }\n  }\n\n  return getRandomValues(rnds8);\n}\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\n/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\n\nvar byteToHex = [];\n\nfor (var i = 0; i < 256; ++i) {\n  byteToHex.push((i + 0x100).toString(16).substr(1));\n}\n\nfunction stringify(arr) {\n  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n  // Note: Be careful editing this code!  It's been tuned for performance\n  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434\n  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one\n  // of the following:\n  // - One or more input array values don't map to a hex octet (leading to\n  // \"undefined\" in the uuid)\n  // - Invalid input values for the RFC `version` or `variant` fields\n\n  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n    throw TypeError('Stringified UUID is invalid');\n  }\n\n  return uuid;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (stringify);\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n  options = options || {};\n  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided\n\n  if (buf) {\n    offset = offset || 0;\n\n    for (var i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n\n    return buf;\n  }\n\n  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rnds);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (v4);\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\n\nfunction validate(uuid) {\n  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (validate);\n\n//# sourceURL=webpack://game_isaacvsspikes/./node_modules/uuid/dist/esm-browser/validate.js?");

/***/ })

}]);