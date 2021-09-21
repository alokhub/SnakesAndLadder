System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _decorator, Component, Node, TiledMap, Label, tween, Vec3, Prefab, instantiate, SpriteFrame, UITransform, toDegree, Sprite, director, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp, _crd, ccclass, property, TileScript;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      TiledMap = _cc.TiledMap;
      Label = _cc.Label;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      SpriteFrame = _cc.SpriteFrame;
      UITransform = _cc.UITransform;
      toDegree = _cc.toDegree;
      Sprite = _cc.Sprite;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ac253m+E4FMpabxtLyhenLM", "TileScript", undefined);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * Predefined variables
       * Name = TileScript
       * DateTime = Wed Sep 15 2021 11:44:38 GMT+0530 (India Standard Time)
       * Author = alokraj0024
       * FileBasename = TileScript.ts
       * FileBasenameNoExtension = TileScript
       * URL = db://assets/scripts/TileScript.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       * Math.floor(Math.random() * (max - min + 1)) + min;
       */

      _export("TileScript", TileScript = (_dec = ccclass('TileScript'), _dec2 = property(TiledMap), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec8 = property(SpriteFrame), _dec(_class = (_class2 = (_temp = class TileScript extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "tileMap", _descriptor, this);

          _initializerDefineProperty(this, "playerOne", _descriptor2, this);

          _initializerDefineProperty(this, "playerTwo", _descriptor3, this);

          _initializerDefineProperty(this, "prefabLabel", _descriptor4, this);

          _initializerDefineProperty(this, "snake", _descriptor5, this);

          _initializerDefineProperty(this, "ladder", _descriptor6, this);

          _initializerDefineProperty(this, "arrayOfDices", _descriptor7, this);

          _defineProperty(this, "tileLayer", null);

          _defineProperty(this, "tileCurrPos", null);

          _defineProperty(this, "playerOneTileX", 0);

          _defineProperty(this, "playerOneTileY", 9);

          _defineProperty(this, "playerTwoTileX", 0);

          _defineProperty(this, "playerTwoTileY", 9);

          _defineProperty(this, "arrayOfSnakesHead", []);

          _defineProperty(this, "arrayOfSnakesTail", []);

          _defineProperty(this, "arrayOfLaddersHead", []);

          _defineProperty(this, "arrayOfLaddersTail", []);

          _defineProperty(this, "arrayOfChances", []);

          _defineProperty(this, "sumOfChances", 0);

          _defineProperty(this, "button1", null);

          _defineProperty(this, "button2", null);
        }

        start() {
          this.tileLayer = this.tileMap.getLayer('Tile Layer 1');
          this.tileCurrPos = this.tileLayer.getTiledTileAt(0, 9, true).node.position;
          this.playerOne.setPosition(new Vec3(this.tileCurrPos.x + 8, this.tileCurrPos.y + 15, 0));
          this.playerTwo.setPosition(new Vec3(this.tileCurrPos.x + 25, this.tileCurrPos.y + 15, 0));
          let k = 1;

          for (let i = 9; i >= 0; i--) {
            if (i % 2 == 0) {
              for (let l = 9; l >= 0; l--) {
                this.addLabel(l, i, k++);
              }
            } else {
              for (let j = 0; j <= 9; j++) {
                this.addLabel(j, i, k++);
              }
            }
          }

          this.addSnakes();
          this.addLadders();
          this.node.getChildByName('playerOneWon').active = false;
          this.node.getChildByName('playerTwoWon').active = false;
          this.button1 = this.node.getChildByName('play1');
          this.button2 = this.node.getChildByName('play2');
        }

        addLabel(j, i, k) {
          let ch = instantiate(this.prefabLabel);
          let tileNow = this.tileLayer.getTiledTileAt(j, i, true).node.position;
          ch.getComponent(Label).string = `${k}`;
          this.tileMap.node.addChild(ch);
          ch.setPosition(tileNow.x + 10, tileNow.y - 8, 1);
        }

        addSnakes() {
          let noOfSnakes = Math.floor(Math.random() * (5 - 2 + 1)) + 2;

          for (let i = 1; i <= noOfSnakes; i++) {
            let randomStartX = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            let randomStartY = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
            let snakeHead = [randomStartX, randomStartY];
            this.arrayOfSnakesHead.push(snakeHead);
            let randomEndX = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            let randomEndY = Math.floor(Math.random() * (9 - (randomStartY + 2) + 1)) + (randomStartY + 2);
            let snakeTail = [randomEndX, randomEndY];
            this.arrayOfSnakesTail.push(snakeTail);
            let tileNowRandom1 = this.tileLayer.getTiledTileAt(randomStartX, randomStartY, true).node.position;
            let tileNowRandom2 = this.tileLayer.getTiledTileAt(randomEndX, randomEndY, true).node.position;
            let diffX = tileNowRandom1.x - tileNowRandom2.x;
            let diffY = tileNowRandom1.y - tileNowRandom2.y;
            let lengthOfSnake = Math.sqrt(diffX * diffX + diffY * diffY);
            let chil = instantiate(this.snake);
            this.tileMap.node.addChild(chil);
            chil.setPosition(tileNowRandom1.x + 16, tileNowRandom1.y + 16, 1);
            chil.getComponent(UITransform).setContentSize(20, lengthOfSnake);
            let ang = Math.atan2(diffY, diffX);
            tween(chil).to(0.1, {
              angle: toDegree(ang) - 90
            }).start();
          }

          console.log(this.arrayOfSnakesHead);
          console.log(this.arrayOfSnakesTail);
        }

        addLadders() {
          let noOfLadders = Math.floor(Math.random() * (3 - 2 + 1)) + 2;

          for (let i = 1; i <= noOfLadders; i++) {
            let randomStartX = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            let randomStartY = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
            let ladderHead = [randomStartX, randomStartY];
            this.arrayOfLaddersHead.push(ladderHead);
            let randomEndX = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
            let randomEndY = Math.floor(Math.random() * (9 - (randomStartY + 2) + 1)) + randomStartY + 2;
            let ladderTail = [randomEndX, randomEndY];
            this.arrayOfLaddersTail.push(ladderTail);
            let tileNowRandom1 = this.tileLayer.getTiledTileAt(randomStartX, randomStartY, true).node.position;
            let tileNowRandom2 = this.tileLayer.getTiledTileAt(randomEndX, randomEndY, true).node.position;
            let diffX = tileNowRandom1.x - tileNowRandom2.x;
            let diffY = tileNowRandom1.y - tileNowRandom2.y;
            let lengthOfSnake = Math.sqrt(diffX * diffX + diffY * diffY);
            let chil = instantiate(this.ladder);
            this.tileMap.node.addChild(chil);
            chil.setPosition(tileNowRandom1.x + 16, tileNowRandom1.y + 16, 1);
            chil.getComponent(UITransform).setContentSize(20, lengthOfSnake);
            let ang = Math.atan2(diffY, diffX);
            tween(chil).to(0.1, {
              angle: toDegree(ang) - 90
            }).start();
          }
        }

        rollDice(event, customData) {
          let btn = null;

          if (customData == '1') {
            btn = this.button1;
          } else {
            btn = this.button2;
          }

          let randomDice = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
          btn.getComponent(Sprite).spriteFrame = this.arrayOfDices[randomDice - 1];
          return randomDice;
        }

        moveNode(playerNode, chances, checkPlayer) {
          let x = null;
          let y = null;
          let ret = chances * 0.5;

          if (checkPlayer == '1') {
            x = this.playerOneTileX;
            y = this.playerOneTileY;
          } else {
            x = this.playerTwoTileX;
            y = this.playerTwoTileY;
          }

          let id = setInterval(() => {
            if (y % 2 == 0) {
              x--;

              if (x < 0) {
                x = 0;
                y--;
              }
            } else {
              x++;

              if (x > 9) {
                x = 9;
                y--;
              }
            }

            let nextPos = this.tileLayer.getTiledTileAt(x, y).node.position;
            tween(playerNode).to(0.5, {
              position: new Vec3(nextPos.x + 8, nextPos.y + 15, 1)
            }, {
              easing: 'sineIn'
            }).start();

            if (checkPlayer == '1') {
              this.playerOneTileX = x;
              this.playerOneTileY = y;
            } else {
              this.playerTwoTileX = x;
              this.playerTwoTileY = y;
            }
          }, 500);
          this.scheduleOnce(() => {
            clearInterval(id);
          }, ret + 0.1);
          return ret + 0.5;
        }

        movePlayer(event, btnNumber) {
          let node = null;
          let x, y;
          let waitTime = 0;
          let child = null;
          let initialX = null;

          if (btnNumber == '1') {
            node = this.playerOne;
            x = this.playerOneTileX;
            y = this.playerOneTileY;
            child = 'playerOneWon';
            initialX = this.playerOneTileX;
          } else {
            node = this.playerTwo;
            x = this.playerTwoTileX;
            y = this.playerTwoTileY;
            child = 'playerTwoWon';
            initialX = this.playerTwoTileX;
          }

          this.scheduleOnce(() => {
            this.button1.active = false;
            this.button2.active = false;
          }, 0.2);
          let diceNum = this.rollDice(event, btnNumber);
          console.log('diceNum ' + diceNum);
          this.arrayOfChances.push([x, y]);

          if (x == 0 && y == 9) {
            if (diceNum != 6 && diceNum != 1) diceNum = 0;
          }

          if (y % 2 == 1) {
            x += diceNum;

            if (x > 9) {
              y -= 1;
              x = 10 - (x - 9);
            }

            if (y < 0) {
              y = 0;
              x = initialX;
              diceNum = 0;
            }

            this.sumOfChances += diceNum;
            waitTime = this.moveNode(node, diceNum, btnNumber);
          } else {
            x -= diceNum;

            if (x < 0) {
              y -= 1;
              x = 0 - x - 1;
            }

            if (y < 0) {
              y = 0;
              x = initialX;
              diceNum = 0;
            }

            this.sumOfChances += diceNum;
            waitTime = this.moveNode(node, diceNum, btnNumber);
          }

          if (waitTime == 0) {
            if (btnNumber == '1') {
              x = this.playerOneTileX;
              y = this.playerOneTileY;
            } else {
              x = this.playerTwoTileX;
              y = this.playerTwoTileY;
            }
          }

          console.log('wait time ' + waitTime);
          this.scheduleOnce(() => {
            for (let i = 0; i < this.arrayOfSnakesHead.length; i++) {
              if (this.arrayOfSnakesHead[i][0] == x && this.arrayOfSnakesHead[i][1] == y) {
                let nextPos = this.tileLayer.getTiledTileAt(this.arrayOfSnakesTail[i][0], this.arrayOfSnakesTail[i][1]).node.position;
                tween(node).to(1, {
                  position: new Vec3(nextPos.x + 8, nextPos.y + 15, 1)
                }, {
                  easing: 'sineIn'
                }).start();

                if (btnNumber == '1') {
                  this.playerOneTileX = this.arrayOfSnakesTail[i][0];
                  this.playerOneTileY = this.arrayOfSnakesTail[i][1];
                } else {
                  this.playerTwoTileX = this.arrayOfSnakesTail[i][0];
                  this.playerTwoTileY = this.arrayOfSnakesTail[i][1];
                }
              }
            }
          }, waitTime + 0.2);
          this.scheduleOnce(() => {
            for (let i = 0; i < this.arrayOfLaddersTail.length; i++) {
              if (this.arrayOfLaddersTail[i][0] == x && this.arrayOfLaddersTail[i][1] == y) {
                let nextPos = this.tileLayer.getTiledTileAt(this.arrayOfLaddersHead[i][0], this.arrayOfLaddersHead[i][1]).node.position;
                tween(node).to(1, {
                  position: new Vec3(nextPos.x + 8, nextPos.y + 15, 1)
                }, {
                  easing: 'sineIn'
                }).start();

                if (btnNumber == '1') {
                  this.playerOneTileX = this.arrayOfLaddersHead[i][0];
                  this.playerOneTileY = this.arrayOfLaddersHead[i][1];
                } else {
                  this.playerTwoTileX = this.arrayOfLaddersHead[i][0];
                  this.playerTwoTileY = this.arrayOfLaddersHead[i][1];
                }
              }
            }
          }, waitTime + 0.2);

          if (x == 0 && y == 0) {
            console.log(child);
            this.node.getChildByName(child).active = true;
            this.scheduleOnce(() => {
              this.button1.active = false;
              this.button2.active = false;
              console.log('Game finished');
              director.pause();
            }, waitTime + 1.3);
          }

          if (btnNumber == '1') {
            this.scheduleOnce(() => {
              if (this.sumOfChances % 6 == 0 && this.sumOfChances != 0 && this.sumOfChances != 18 && diceNum != 0) {
                this.button1.active = true;
              } else if (this.sumOfChances == 18) {
                this.sumOfChances = 0;
                let nextPos = this.tileLayer.getTiledTileAt(this.arrayOfChances[0][0], this.arrayOfChances[0][1]).node.position;
                tween(this.playerOne).delay(waitTime + 2.4).to(1, {
                  position: new Vec3(nextPos.x + 8, nextPos.y + 15, 1)
                }, {
                  easing: 'sineIn'
                }).start();
                this.playerOneTileX = this.arrayOfChances[0][0];
                this.playerOneTileY = this.arrayOfChances[0][1];
                this.arrayOfChances = [];
                this.button2.active = true;
              } else {
                this.arrayOfChances = [];
                this.sumOfChances = 0;
                this.button2.active = true;
              }
            }, 0.21);
          } else {
            this.scheduleOnce(() => {
              if (this.sumOfChances % 6 == 0 && this.sumOfChances != 0 && this.sumOfChances != 18 && diceNum != 0) {
                this.button2.active = true;
              } else if (this.sumOfChances == 18) {
                this.sumOfChances = 0;
                let nextPos = this.tileLayer.getTiledTileAt(this.arrayOfChances[0][0], this.arrayOfChances[0][1]).node.position;
                tween(this.playerTwo).delay(waitTime + 2.4).to(1, {
                  position: new Vec3(nextPos.x + 8, nextPos.y + 15, 1)
                }, {
                  easing: 'sineIn'
                }).start();
                this.playerTwoTileX = this.arrayOfChances[0][0];
                this.playerTwoTileY = this.arrayOfChances[0][1];
                this.arrayOfChances = [];
                this.button1.active = true;
              } else {
                this.arrayOfChances = [];
                this.sumOfChances = 0;
                this.button1.active = true;
              }
            }, 0.21);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tileMap", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playerOne", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerTwo", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefabLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "snake", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ladder", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "arrayOfDices", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=TileScript.js.map