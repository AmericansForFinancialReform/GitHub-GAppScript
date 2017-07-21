function convertAsciidocTable(asciidoc) {
  // Build a table from the asciidoc, split on newlines
  
  var array = asciidoc.split("\n");
  
  var line;
  var tableArray;
  
  var outerArray = new Array();
  var seenHeader = false;
  var row = 0;
  
  for (var j = 0; j < array.length; j++) {
    line = array[j];

    // check for roles
    if (/^\[.*\]$/.test(line)) {
      Logger.log("role: " + line);
    }

    // check for row header
    else if (/^\|=+$/.test(line) && !seenHeader) {
       seenHeader = true;
    }
    
    // check for end of table
    else if (/^\|=+/.test(line)) {
      Logger.log("end of table: " + line);
    }
    
    // check for rows, and append cells into the i++ row of the outerArray
    else if (/^\|.*$/.test(line)) {
      // Need to ignore the very first pipe "|" 
      cols = line.split("|");
      outerArray[row] = cols;
      row++;
    }
  }
  return outerArray;
}
