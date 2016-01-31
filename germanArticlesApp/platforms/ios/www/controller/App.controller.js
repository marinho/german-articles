sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.germanArticles.controller.App", {

        _nounsPerGame: 10,

        _articles: {
          "definite": {
              "nominativ": { "m": "Der", "f": "Die", "n": "Das", "p": "Die" },
              "akkusativ": { "m": "Den", "f": "Die", "n": "Das", "p": "Die" },
              "dativ":     { "m": "Dem", "f": "Der", "n": "Dem", "p": "Den" },
              "genitiv":   { "m": "Des", "f": "Der", "n": "Des", "p": "Der" }
          },

          "indefinite": {
              "nominativ": { "m": "Ein", "f": "Eine", "n": "Ein", "p": null },
              "akkusativ": { "m": "Einen", "f": "Eine", "n": "Ein", "p": null },
              "dativ":     { "m": "Einem", "f": "Einer", "n": "Einem", "p": null },
              "genitiv":   { "m": "Eines", "f": "Einer", "n": "Eines", "p": null }
          },

          "articles": {
              "nominativ": { "m": "-er", "f": "-e", "n": "-es", "p": "-e" },
              "akkusativ": { "m": "-en", "f": "-e", "n": "-es", "p": "-e" },
              "dativ":     { "m": "-em", "f": "-er", "n": "-em", "p": "-en" },
              "genitiv":   { "m": "-es", "f": "-er", "n": "-es", "p": "-er" }
          }
        },

        onInit: function () {
            var self = this;
            var view = self.getView();

            // set data model
            var oModel = new JSONModel({});
            view.setModel(oModel);

            // set nouns model - local
            //var sUrl = 'http://localhost:8000/nouns.json';
            var sUrl = 'nouns.json';
            var oNounsModel = new JSONModel(sUrl);
            view.setModel(oNounsModel, "allNouns");
        },

        onNewGame: function () {
            var self = this;
            var view = self.getView();

            var allNouns = view.getModel('allNouns').oData.Nouns;

            var nouns = [];
            var indexes = [];
            var pendingNouns = [];
            while (indexes.length < self._nounsPerGame) {
                var index = Math.round(Math.random() * (allNouns.length - 1));
                if (indexes.indexOf(index) === -1) {
                    // TODO: exclude plural nouns if indefinite
                    indexes.push(index);
                }
            };
            indexes.forEach(function (randomIndex, idx) {
                nouns.push(allNouns[randomIndex]);
                pendingNouns.push(idx);
            });

            var model = view.getModel();
            var data = model.getData();
            data.nouns = nouns;
            data.nounIndex = 0;
            data.style = 'definite.nominativ';
            data.rightArticle = '';
            data.pendingNouns = pendingNouns;
            data.currentSequence = pendingNouns.slice(0);
            data.stats = {
                rights: 0,
                wrongs: 0,
                perNoun: {}
            };
            model.setData(data);

            self.prepareNounsProgress();

            self.showNoun(0);
        },

        prepareNounsProgress: function () {
            var self = this;
            var view = self.getView();
            var model = view.getModel();
            var data = model.getData();

            var flexBox = self.getView().byId("gaNounsProgress");
            flexBox.destroyItems();

            data.nouns.forEach(function (noun, idx) {
                var text = new sap.m.Text({
                    text: ' '
                });
                text.addStyleClass('gaNounsProgressItem');
                if (idx < data.nouns.length - 1) {
                    text.addStyleClass('sapUiSmallMarginEnd');
                }
                flexBox.addItem(text);
            });
        },

        updateNounProgress: function (idx, match) {
            var self = this;
            var flexBox = self.getView().byId("gaNounsProgress");
            var progressItem = flexBox.getItems()[idx];
            progressItem.removeStyleClass('right');
            progressItem.removeStyleClass('wrong');
            if (match !== null) {
                progressItem.addStyleClass(match ? 'right' : 'wrong');
            }
        },

        showNoun: function (nounIndex) {
            var self = this;
            var view = self.getView();
            var model = view.getModel();
            var data = model.getData();
            var noun = data.nouns[nounIndex];

            // updating model
            data.nounIndex = nounIndex;
            data.noun = noun;
            data.rightArticle = '';
            model.setData(data);

            var styleBits = data.style.split('.');
            var articles = self._articles[styleBits[0]][styleBits[1]];
            var articleLabels = [];
            for (var key in articles) {
                if (articles[key] && articleLabels.indexOf(articles[key]) === -1) {
                    articleLabels.push(articles[key]);
                }
            };

            var btnHandler = function (evt) {
                self.onPressArticle(evt);
            };
            
            var flexBox = self.getView().byId("gaArticleButtons");
            flexBox.destroyItems();

            articleLabels.forEach(function (articleLabel, idx, list) {
                var btn = new sap.m.Button({
                    text: articleLabel,
                    press: btnHandler,
                    customData: new sap.ui.core.CustomData({
                        key: 'article',
                        value: articleLabel
                    })
                });
                if (idx < list.length - 1) {
                    btn.addStyleClass('sapUiSmallMarginEnd');
                }
                flexBox.addItem(btn);
            });

            var gaNounArticle = self.getView().byId("gaNounArticle");
            gaNounArticle.removeStyleClass('wrong');
            gaNounArticle.removeStyleClass('right');
        },

        onPressArticle: function (evt) {
            var self = this;
            var view = self.getView();
            var model = view.getModel();
            var data = model.getData();
            var styleBits = data.style.split('.');
            var articles = self._articles[styleBits[0]][styleBits[1]];
            var rightArticle = articles[data.noun.gender];
            
            var obtn = evt.getSource();
            var chosenArticle = obtn.getCustomData()[0].getValue();
            
            var matchedRight = rightArticle === chosenArticle;

            // Color for right article above the word
            var gaNounArticle = self.getView().byId("gaNounArticle");
            gaNounArticle.addStyleClass(matchedRight ? 'right' : 'wrong');

            // Updated noun progress
            self.updateNounProgress(data.nounIndex, matchedRight);

            // Updating model
            data.rightArticle = rightArticle;
            data.stats.perNoun[data.nounIndex] = matchedRight;
            if (matchedRight) {
                data.stats.rights += 1;
                data.pendingNouns.splice(data.pendingNouns.indexOf(data.nounIndex), 1);
            } else {
                data.stats.wrongs += 1;
            }
            
            var flexBox = self.getView().byId("gaArticleButtons");
            flexBox.destroyItems();
            
            // End of words - stats summary
            if (data.pendingNouns.length === 0) {
                var rightRate = Math.round(100 * (data.stats.rights / (data.stats.rights + data.stats.wrongs)));
                var btn = new sap.m.Button({
                    text: 'Rate: ' + rightRate + '% -- New game',
                    press: function () {
                        btn.setText('in 3 seconds');
                        btn.setEnabled(false);
                        window.setTimeout(function () {
                            self.onNewGame();
                        }, 3000);
                    }
                });
                flexBox.addItem(btn);
            }

            // End of words - retry
            else if (data.currentSequence.indexOf(data.nounIndex) === data.currentSequence.length - 1) {
                data.currentSequence = data.pendingNouns.slice(0);
                flexBox.addItem(new sap.m.Button({
                    text: 'Retry ' + data.pendingNouns.length + ' words',
                    press: function () {
                        self.showNoun(data.pendingNouns[0]);
                    }
                }));
            }

            // Button "next word"
            else {
                var goNextWord = function () {
                    window.clearTimeout(timer);
                    self.showNoun(data.currentSequence[data.currentSequence.indexOf(data.nounIndex) + 1]);
                };

                flexBox.addItem(new sap.m.Button({
                    text: 'Next word',
                    press: goNextWord
                }));

                var timer = window.setTimeout(goNextWord, 2000); // Shows next word automatically after 2 seconds
            }

            // Set data as model to component
            model.setData(data);
        }
    });
});
