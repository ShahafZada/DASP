        var iconSelect;
        var selectedText;

        window.onload = function(){
            
            selectedText = document.getElementById('selected-text');
            
            document.getElementById('my-icon-select').addEventListener('changed', function(e){
               selectedText.value = iconSelect.getSelectedValue();
            });
            
            iconSelect = new IconSelect("my-icon-select");

            var icons = [];
            icons.push({'iconFilePath':'images/high_scores/Derp.png', 'iconValue':'images/high_scores/Derp.png'});
            icons.push({'iconFilePath':'images/high_scores/Artificial_intelligence.png', 'iconValue':'images/high_scores/Artificial_intelligence.png'});
            icons.push({'iconFilePath':'images/high_scores/Bruce.png', 'iconValue':'images/high_scores/Bruce.png'});
            icons.push({'iconFilePath':'images/high_scores/Fa_Q.png', 'iconValue':'images/high_scores/Fa_Q.png'});
            icons.push({'iconFilePath':'images/high_scores/Impossibru.png', 'iconValue':'images/high_scores/Impossibru.png'});
            icons.push({'iconFilePath':'images/high_scores/mi_smartest.png', 'iconValue':'images/high_scores/mi_smartest.png'});
            icons.push({'iconFilePath':'images/icons/8.png', 'iconValue':'images/icons/8.png'});
            icons.push({'iconFilePath':'images/icons/9.png', 'iconValue':'images/icons/9.png'});
            icons.push({'iconFilePath':'images/icons/10.png', 'iconValue':'images/icons/10.png'});
            icons.push({'iconFilePath':'images/icons/11.png', 'iconValue':'images/icons/11.png'});
            icons.push({'iconFilePath':'images/icons/12.png', 'iconValue':'images/icons/12.png'});
            icons.push({'iconFilePath':'images/icons/13.png', 'iconValue':'images/icons/13.png'});
            icons.push({'iconFilePath':'images/icons/14.png', 'iconValue':'images/icons/14.png'});
            
            iconSelect.refresh(icons);
            


        };