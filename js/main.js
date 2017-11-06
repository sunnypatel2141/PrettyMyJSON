function submitdata() 
{
    //data.replace('/\t+/','');
    var text = document.getElementById("textarea").value;
    var result = "";

    var data = JSON.stringify(text);
    // console.log(data);

    data = data.split('\\\"').join('\"');

    //leading and trailing apostrophes
    data = data.replace("\"{", "{");
    data = data.replace("}\"", "}");
    data = data.replace("\"[", "[");
    data = data.replace("]\"", "]");

    console.log(data);

    var tabs = "";
    var newLine = "<br>";
    var quote = "\"";

    var stackBracket = [];
    var stackQuotes = [];
    var stackColon = [];

    for (var index = 0; index < data.length; index++) 
    {
        var character = data.charAt(index);
        
        if(character == '{' || (character == '[')) 
        {
            stackBracket.push(character);
            tabs = tabs.concat("&emsp;");
            result = result.concat(character + newLine + tabs);
        } else if (character == '}' || (character == ']')) 
        {
            if (stackBracket.length == 0) 
            {
                alert('Incorrect format. Check if each opening bracket has a closing bracket.');
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
            if (result.charAt(result.length-1) == ':') 
            {
                result = result.concat(' ');
            }
        } else if (stackQuotes.length == 0 && (character == ',')) {
            result = result.concat(character + newLine + tabs);
        } else if (character == ":") {
            if (stackColon.length > 0) {
                stackColon.push(":");
            } else {
                stackColon.pop();
            }
        } else {
            if (stackColon.length > 0) {
                result = result.concat(character);
            }
            result = result.concat(character);
        }
    }
    if (stackBracket.length > 0 || stackQuotes.length > 0 || stackColon.length > 0) {
        alert ('Incorrect format. Check for colon, quotes and brackets.');
        return;
    }

    var mySpan = document.createElement('span');
    mySpan.innerHTML = result;
    mySpan.style.color = "#ff0000";
    document.getElementById('myContainer').appendChild(mySpan);

//    document.getElementById("result").innerHTML = result;
}