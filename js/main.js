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

    var individual;

    var black = "<span style='color:black'>?</span>";
    var green = "<span style='color:#793e62'>?</span>";
    var blue = "<span style='color:#4161a0'>?</span>";
    var domObject = document.getElementById('result');

    for (var index = 0; index < data.length; index++) 
    {
        var character = data.charAt(index);
        
        if(character == '{' || (character == '[')) 
        {
            stackColon = [];
            stackBracket.push(character);
            tabs = tabs.concat("&emsp;");
            var temp = black.replace("?", character + newLine + tabs);
            domObject.innerHTML += temp;
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
            var temp = black.replace("?", newLine + tabs + character);
            domObject.innerHTML += temp;
            result = result.concat(newLine + tabs + character);
        } else if (character == '\"') 
        {
            if (stackQuotes.length > 0) 
            {
                stackQuotes.pop();
            } else {
                stackQuotes.push('\"');
            }
            if (stackColon.length == 0) {
                var temp = blue.replace("?", quote);
                domObject.innerHTML += temp;
            } else {
                var temp = green.replace("?", quote);
                domObject.innerHTML += temp;
            }
            result = result.concat(quote);
        } else if (stackQuotes.length == 0 && (character == ' ') || (character == ' \t') || (character == '\n')) {
            //add space for neatness (convert tabs/new lines into empty string)
            if (result.charAt(result.length-1) == ':') 
            {
                domObject.innerHTML += ' ';
                result = result.concat(' ');
            }
        } else if (stackQuotes.length == 0 && character == ',') {
            stackColon = [];
            var temp = black.replace("?", character + newLine + tabs);
            domObject.innerHTML += temp;
            result = result.concat(character + newLine + tabs);
        } else if (stackQuotes.length == 0 && character == ":") {
            if (stackColon.length > 0) {
                stackColon.pop();
            } else {
                stackColon.push(":");
            }
            var temp = blue.replace("?", character);
            domObject.innerHTML += temp;
            result = result.concat(character);
        } else {
            if (stackColon.length > 0) {
                var temp = green.replace("?", character);
                domObject.innerHTML += temp;
                result = result.concat(character);
            } else {
                var temp = blue.replace("?", character);
                domObject.innerHTML += temp;
                result = result.concat(character);
            }
        }
    }
    if (stackBracket.length > 0 || stackQuotes.length > 0 || stackColon.length > 0) {
        alert ('Incorrect format. Check for colon, quotes and brackets.');
        return;
    }
    document.getElementById('result').style.border = "solid black";
}