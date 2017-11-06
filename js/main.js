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

    var tabs = "";

    var openBracket = "{";
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
            tabs = tabs.concat("&emsp;");
            result = result.concat(character + newLine + tabs);
        } else if (character == '}') 
        {
            if (stackBracket.length == 0) 
            {
                alert('Incorrect format.');
                return;
            }
            stackBracket.pop();
            tabs = tabs.substr(0, tabs.length-6);
            result = result.concat(newLine + tabs + character);
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
            //add space for neatness (convert tabs/new lines into empty string)
            if (data.indexOf(index-1) == ':') 
            {
                result.concat(' ');
            }

        } else if (stackQuotes.length == 0 && (character == ',')) {
            result = result.concat(character + newLine + tabs);
        } else {
            result = result.concat(character);
        }
    }
    document.getElementById("result").innerHTML = result;
}