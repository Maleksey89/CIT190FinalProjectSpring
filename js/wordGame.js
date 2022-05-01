document.getElementById("dropMenu").addEventListener("click", function(){
    var x = document.getElementById("mySideNav");
       if (x.style.display =="flex") {
         x.style.display="none";
      } else {
         x.style.display="flex";
}
});

$(function()
    {
    $( ".ui-sortable" ).sortable(
        {
           placeholder: '.wordGuess',
           connectWith: ".ui-sortable",
        }
)});
    var CONSON = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
    var VOWEL = ['A','E','I','O','U'];
    var randomVowels="";
    var vowelString="";
    var randomConsonants="";
    var consonantString="";
    let Conson;
    var finalWord ="";
    var word ="";
    var html= "";
    
function chooseConsonants(){
        for(var x = 0; x < 5; ++x)
            {
            Conson = CONSON[Math.floor(Math.random() * CONSON.length)];
            randomConsonants +=  Conson;
            }
            return randomConsonants;
            }        
function chooseVowel()
        {
        for(var x = 0; x < 4; ++x)
            {
           vowels = VOWEL[Math.floor(Math.random() * VOWEL.length)];
           randomVowels +=  vowels;
            }
            return randomVowels;
        }
function shuffle(unscrambled)
        {
            return unscrambled.split('').sort(function()
            {
                return Math.random() - 0.5
            }).join('');
        }
function printWord(word)
        {   
            for(var i=0; i < word.length; ++i)
            {
                html += '<li>' + word[i] + '</li>'
            }
            console.log(html);
        $('#scramble').html(html);  
        }
function finishedWord()
{
    $('#solved').each(function()
        {        
        $(this).find('li').each(function()
            {           
            finalWord += $(this).text();
            return finalWord;
            })
            console.info(finalWord); //
        }) 
return finalWord; 
}
function finalWordOutput(finalWord){ 
    console.info(finalWord);
    var URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+ finalWord;
    $('.output').html('The word you found is ' + finalWord); 
    $(".define").html("This is not a real word, Please try again"); 
    $.getJSON(URL,function(response)
    {   
        $(".define").html("");
        console.info(finalWord);
        console.info(response);
        $(".define").html('This is a real word! It has ' + response.length + ' meanings');       
    })
}
$(function wordOutput()
        {
            randomConsonants = chooseConsonants();
            randomVowels = chooseVowel();
            var unscrambledWord= randomConsonants + randomVowels;
            var scrambledWord= shuffle(unscrambledWord);
            printWord(scrambledWord);    
            $(".button").click(function(){
                $('.outputDiv').removeClass('hidden');
                finalWord="";                
                finalWord=finishedWord();
                finalWordOutput(finalWord); //
                console.info(finalWord);//
                
            });                                    
        });

