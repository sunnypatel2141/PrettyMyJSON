//for coloring
var localOutput = "";

var tabs = "";
var newLine = "<br>";
var quote = "\"";

var stackBracket = [];
var stackQuotes = [];
var stackColon = [];
var globalStack = [];

var black = "<span id='blackcolor'>?";
var green = "<span id='greencolor'>?";
var blue = "<span id='bluecolor'>?";

var domObject, data;

function submitdata() 
{
    //data.replace('/\t+/','');
    var text = document.getElementById("textarea").value;
    document.getElementById("result").innerHTML = "";
    localOutput = "";

    domObject = document.getElementById("result");

    if (text.length == 0) {
        return;
    }

    data = JSON.stringify(text);
    // console.log(data);

    data = data.split('\\\"').join('\"');

    //leading and trailing apostrophes
    data = data.replace("\"{", "{");
    data = data.replace("}\"", "}");
    data = data.replace("\"[", "[");
    data = data.replace("]\"", "]");

    var old_time = new Date();
    for (var index = 0; index < data.length; index++) 
    {
        var character = data.charAt(index);

        var parsedDom = parseData(character);
        domObject.innerHTML = parsedDom;
        //var t = setTimeout(parseData(character),0);
    }
    var new_time = new Date();
    var seconds_passed = new_time - old_time;

    console.log("Time elapsed: " + seconds_passed);

    if (globalStack.length > 0) {
        alert ('Incorrect format. Check for colon, quotes and brackets.');
        return;
    }
    document.getElementById('result').style.display = "inline-block";
}

function parseData(character) {

    if(character == '{' || (character == '[')) 
    {
        // empty out stack colon (colors)
        stackColon = [];
        stackBracket.push(character);
        globalStack.push(character);

        tabs = tabs.concat("&emsp;");
        var temp = black.replace("?", character + newLine + tabs);
        localOutput = localOutput.concat(temp);
    } else if (character == '}' || (character == ']')) 
    {
        if (globalStack.length == 0) 
        {
            alert('Incorrect format. Check if each opening bracket has a closing bracket.');
            return;
        }
        stackBracket.pop();
        globalStack.pop();

        //adjust tab string to rid \t
        tabs = tabs.substr(0, tabs.length-6);
        var temp = black.replace("?", newLine + tabs + character);
        localOutput = localOutput.concat(temp + "</span>");
    } else if (character == '\"') 
    {
        if (stackQuotes.length > 0) 
        {
            stackQuotes.pop();
            globalStack.pop();
        } else {
            stackQuotes.push('\"');
            globalStack.push('\"');
        }
        if (stackColon.length == 0) {
            var temp = "</span>" + blue.replace("?", quote);
            localOutput = localOutput.concat(temp);
        } else {
            var temp = "</span>" + green.replace("?", quote);
            localOutput = localOutput.concat(temp);
        }
    } else if (stackQuotes.length == 0 && (character == ' ') || (character == ' \t') || (character == '\n')) {
        //add space for neatness (convert tabs/new lines into empty string)
        if (localOutput.charAt(localOutput.length-1) == ':') 
        {
            localOutput = localOutput.concat(' ');
        }
    } else if (stackQuotes.length == 0 && character == ',') {
        stackColon = [];
        var temp = black.replace("?", character + newLine + tabs);
        localOutput = localOutput.concat(temp);
    } else if (stackQuotes.length == 0 && character == ":") {
        if (stackColon.length > 0) {
            stackColon.pop();
        } else {
            stackColon.push(":");
        }
        //var temp = blue.replace("?", character);
        localOutput = localOutput.concat(character);
    } else if (stackQuotes.length == 0 && character == '\\') {
        if (data.charAt(index+1) == 'n' || data.charAt(index+1) == 't') {
            index++;
            //do nothing to dom or localOutput
        }
    } else {
        if (stackColon.length > 0) {
            //var temp = green.replace("?", character);
            localOutput = localOutput.concat(character);
        } else {
            var temp = blue.replace("?", character);
            localOutput = localOutput.concat(character);
        }
    }
    return localOutput;
}

function savedatafile() {
    console.log("1");
    var text = document.getElementById("result").innerHTML;
    console.log("2");
    var filename = "prettydata";
    console.log("3");
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    console.log("4");
    saveAs(blob, filename+".txt");
}