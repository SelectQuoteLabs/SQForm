## [2.5.0](https://github.com/SelectQuoteLabs/SQForm/compare/v2.4.0...v2.5.0) (2021-01-11)


### Features

* 🎸 SQFormTextField default placeholder '- -' ([ab7afef](https://github.com/SelectQuoteLabs/SQForm/commit/ab7afef5a39bcd511fb1f4828b55bbea19799cff))

## [2.4.0](https://github.com/SelectQuoteLabs/SQForm/compare/v2.3.0...v2.4.0) (2021-01-08)


### Features

* 🎸 Updated stepper component step styling and removed arro ([b73b005](https://github.com/SelectQuoteLabs/SQForm/commit/b73b0058f47d26dbd2b35c0becee035d58659cc3)), closes [#52](https://github.com/SelectQuoteLabs/SQForm/issues/52)

## [2.3.0](https://github.com/SelectQuoteLabs/SQForm/compare/v2.2.0...v2.3.0) (2021-01-06)


### Features

* 🎸 allow passthrough of props to mui field children ([71df780](https://github.com/SelectQuoteLabs/SQForm/commit/71df780ee065e9285235a455b97995a6796f69d1))

## [2.2.0](https://github.com/SelectQuoteLabs/SQForm/compare/v2.1.0...v2.2.0) (2021-01-04)


### Features

* 🎸 Allow text fields HTML5 types ([ce44960](https://github.com/SelectQuoteLabs/SQForm/commit/ce449603165d4193295847e5627d925b0a085b29)), closes [#45](https://github.com/SelectQuoteLabs/SQForm/issues/45)

## [2.1.0](https://github.com/SelectQuoteLabs/SQForm/compare/v2.0.3...v2.1.0) (2021-01-04)


### Features

* 🎸 Utils to sanitize initial form data & serialize form ([b0c1c30](https://github.com/SelectQuoteLabs/SQForm/commit/b0c1c305c29cf0b33d37d632d9af3e4782f7ffb2))


### Bug Fixes

* 🐛 Allow default value to be used in autocomplete component ([6825df8](https://github.com/SelectQuoteLabs/SQForm/commit/6825df890ee4cff86284c9110112e68d0fdbfc2d)), closes [#43](https://github.com/SelectQuoteLabs/SQForm/issues/43)
* 🐛 Submit button enables when empty dropdown selection made ([60ac6ee](https://github.com/SelectQuoteLabs/SQForm/commit/60ac6ee977c21f2cc3e806362fe2f3af01c9f8cc)), closes [#37](https://github.com/SelectQuoteLabs/SQForm/issues/37)
* 🐛 Updated to not set Required text instead of touched ([a3287b8](https://github.com/SelectQuoteLabs/SQForm/commit/a3287b8a89efc2ec0ce7510a25d26e2aa8fd7506))

### [2.0.3](https://github.com/SelectQuoteLabs/SQForm/compare/v2.0.2...v2.0.3) (2020-12-29)


### Bug Fixes

* 🐛 Fixed onBlur event for autocomplete and touched fields ([c62e313](https://github.com/SelectQuoteLabs/SQForm/commit/c62e313264f8cf0c2a9f513cfa8071fe961d5d50)), closes [#38](https://github.com/SelectQuoteLabs/SQForm/issues/38)

### [2.0.2](https://github.com/SelectQuoteLabs/SQForm/compare/v2.0.1...v2.0.2) (2020-12-22)


### Bug Fixes

* 🐛 Displays - - when empty, displays label instead of value ([40e5243](https://github.com/SelectQuoteLabs/SQForm/commit/40e52432dc9b6e28f0af11d839bfdcb098f4346d)), closes [#31](https://github.com/SelectQuoteLabs/SQForm/issues/31)

### [2.0.1](https://github.com/SelectQuoteLabs/SQForm/compare/v2.0.0...v2.0.1) (2020-12-22)


### Bug Fixes

* 🐛 Fixs dropdown font size and renders empty label - - ([2308d55](https://github.com/SelectQuoteLabs/SQForm/commit/2308d558e7e2cba3605b8a5601590732d39d874d)), closes [#30](https://github.com/SelectQuoteLabs/SQForm/issues/30)
* 🐛 Reading the dirty state on load to disable submit/next ([60034e2](https://github.com/SelectQuoteLabs/SQForm/commit/60034e2a0428702ed26def39fde72ad8ca05f3e8)), closes [#26](https://github.com/SelectQuoteLabs/SQForm/issues/26)
* 🐛 Tooltip now displays the option label rather than value ([40d1e42](https://github.com/SelectQuoteLabs/SQForm/commit/40d1e425ad326852e2971916302efd4ca7db8157)), closes [#30](https://github.com/SelectQuoteLabs/SQForm/issues/30)

## [2.0.0](https://github.com/SelectQuoteLabs/SQForm/compare/v1.3.1...v2.0.0) (2020-12-18)


### ⚠ BREAKING CHANGES

* 🧨 SQFormDialogStepper.js validationSchema prop now accepts a JS object

### Bug Fixes

* 🐛 Changes validationSchema prop to accept object ([a82a9d7](https://github.com/SelectQuoteLabs/SQForm/commit/a82a9d73e6cfc1b48343baffed21808dfaadef4b)), closes [#25](https://github.com/SelectQuoteLabs/SQForm/issues/25)

### [1.3.1](https://github.com/SelectQuoteLabs/SQForm/compare/v1.3.0...v1.3.1) (2020-12-18)


### Bug Fixes

* 🐛 Updated how styling is delivered in component ([a4c2589](https://github.com/SelectQuoteLabs/SQForm/commit/a4c25896344ac219e1057ddedf3cfe77d38cead1))

## [1.3.0](https://github.com/SelectQuoteLabs/SQForm/compare/v1.2.2...v1.3.0) (2020-12-17)


### Features

* 🎸 Updated import styles, simplified booleans ([9865e43](https://github.com/SelectQuoteLabs/SQForm/commit/9865e43f94c1ad4f5869c37143e0690ff48ecefa))
* 🎸 Updated primary button and styling ([4c14df7](https://github.com/SelectQuoteLabs/SQForm/commit/4c14df7bc1660956388de3f0305699ef351c4465))
* 🎸 Updated stepper next button and UI along with better ex ([5a7ecfe](https://github.com/SelectQuoteLabs/SQForm/commit/5a7ecfe112bda0275c879bb45dccfca6125d7afe))
* 🎸 Updated the boolean variable name and validation schema ([84436de](https://github.com/SelectQuoteLabs/SQForm/commit/84436de51e8cc484eff7084f17d3e19f3900dda8))

### [1.2.2](https://github.com/SelectQuoteLabs/SQForm/compare/v1.2.1...v1.2.2) (2020-11-24)


### Bug Fixes

* 🐛 Fixed a multi select value render ([a17abc1](https://github.com/SelectQuoteLabs/SQForm/commit/a17abc1672b2f87f9904bf84164390ad6f1906e4))

### [1.2.1](https://github.com/SelectQuoteLabs/SQForm/compare/v1.2.0...v1.2.1) (2020-11-24)


### Bug Fixes

* 🐛 Fixed a list item label ([c173f6e](https://github.com/SelectQuoteLabs/SQForm/commit/c173f6e48f846a0f6a06939700122d29fbbc22c4))

## [1.2.0](https://github.com/SelectQuoteLabs/SQForm/compare/v1.1.1...v1.2.0) (2020-11-23)


### Features

* 🎸 SQForm MultiSelect ([33b85ab](https://github.com/SelectQuoteLabs/SQForm/commit/33b85ab802b404ec119c4c496c461333df466d2c))

### [1.1.1](https://github.com/SelectQuoteLabs/SQForm/compare/v1.1.0...v1.1.1) (2020-11-20)


### Bug Fixes

* 🐛 reset form state during onclose event ([03846b4](https://github.com/SelectQuoteLabs/SQForm/commit/03846b4e282ff5497307cd4f7a3df14cb98164c3))

## [1.1.0](https://github.com/SelectQuoteLabs/SQForm/compare/v1.0.3...v1.1.0) (2020-11-19)


### Features

* 🎸 add SQFormCheckboxGroup and SQFormCheckboxGroupItem ([fdf96d7](https://github.com/SelectQuoteLabs/SQForm/commit/fdf96d702559d73c37be9dc84b0e014609105d11))

### [1.0.3](https://github.com/SelectQuoteLabs/SQForm/compare/v1.0.2...v1.0.3) (2020-11-18)


### Bug Fixes

* 🐛 Fixes the broken build and migrates to rollup ([dbb8914](https://github.com/SelectQuoteLabs/SQForm/commit/dbb8914e74aef6a0f1ff5714bccf8d70259b66b6))

### [1.0.2](https://github.com/SelectQuoteLabs/SQForm/compare/v1.0.1...v1.0.2) (2020-11-17)


### Bug Fixes

* 🐛 Change library target to umd to handle es6 modules ([2699189](https://github.com/SelectQuoteLabs/SQForm/commit/26991893dd2b3b7eeece706a1d50c854a4a63c34))

### [1.0.1](https://github.com/SelectQuoteLabs/SQForm/compare/v1.0.0...v1.0.1) (2020-11-17)


### Bug Fixes

* 🐛 declare npm publish as a public npm package ([1a0b52b](https://github.com/SelectQuoteLabs/SQForm/commit/1a0b52bc9955b5ce63ad045234851d3c2cf89b6b))

## 1.0.0 (2020-11-17)


### Features

* 🎸 init commit ([852f923](https://github.com/SelectQuoteLabs/SQForm/commit/852f92309af9f506c938bdbd6ef103222c26440f))


### Bug Fixes

* 🐛 Adds github action for publishing to npm ([89928cb](https://github.com/SelectQuoteLabs/SQForm/commit/89928cbb69201ff8b14ce77b67c8031da02a4624))
* 🐛 ditch semantic release action ([96dd5b5](https://github.com/SelectQuoteLabs/SQForm/commit/96dd5b57ecc21dad803615c6185fc13a9c65f6ca))
* 🐛 Fixes package.json repo url ([1de8536](https://github.com/SelectQuoteLabs/SQForm/commit/1de853680af34bb633b285c350526f93f0a69da9))
* 🐛 hardcode semantic release repo url ([b97bf72](https://github.com/SelectQuoteLabs/SQForm/commit/b97bf72f4505305d4d0870041318af4b4a7f2c6e))
* 🐛 Only one hyphen allowed per github action step ([065607c](https://github.com/SelectQuoteLabs/SQForm/commit/065607cb9cf695d98ba0a4b6632c983aa3d33926))
* 🐛 semantic release defaults to repo url in package.json ([ac88950](https://github.com/SelectQuoteLabs/SQForm/commit/ac889504d1ce9628f527cfa48abc13732c25d05b))
