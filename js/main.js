function submitdata() 
{
    //data.replace('/\t+/','');
    var text = document.getElementById("textarea").value;
    var result = "";

    var data = JSON.stringify(text);
    // console.log(data);

    data = data.split('\\\"').join('\"');
    data = data.replace("\"{", "{");
    data = data.replace("}\"", "}");
    console.log(data);

    var tabCount = "&emsp;";

    var openBracket = "{";
    var tab = "&emsp";
    var newLine = "\n";
    var quote = "\"";

    var stackBracket = [];
    var stackQuotes = [];

    for (var index = 0; index < data.length; index++) 
    {
        var character = data.charAt(index);
        
        if(character == '{') 
        {
            stackBracket.push(character);
            tabCount = tabCount.concat("&emsp;");
            result = result.concat(character + newLine + tabCount);
        } else if (character == '}') 
        {
            if (stackBracket.length == 0) 
            {
                alert('Incorrect format.');
                return;
            }
            stackBracket.pop();
            tabCount = tabCount.substr(0, tabCount.length-6);
            result = result.concat(character + newLine + tabCount);
        } else if (character == '\"') 
        {
            if (stackQuotes.length > 0) 
            {
                stackQuotes.pop();
            } else {
                stackQuotes.push('\"');
            }
            result = result.concat(quote);
        } else if (stackQuotes.length == 0 && (character == ' ') || (character == ' \t') || (character == '\n')) {
            //skip character
            character = "";
        } else {
            result = result.concat(character);
        }
    }
    document.getElementById("result").innerHTML = result;
}