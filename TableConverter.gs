function convertAsciidocTable(asciidoc) {
  // Build a table from the asciidoc, split on newlines
  
  var array = asciidoc.split("\n");
  
  var line;

  // we need to create a 2D array for GApp Scripts to 
  // turn into a table.   
  var outerArray = new Array();
  var seenHeader = false;
  var row = 0;
  
  for (var j = 0; j < array.length; j++) {
    line = array[j];

    // check for roles -- "roles" are a kind of metadata that you can add into asciidoc that
    // isn't seen by the user. 
    if (/^\[.*\]$/.test(line)) {
      // not currently using the role for anything, so just log it
      Logger.log("role: " + line);
    }

    // check for the top row header
    else if (/^\|=+$/.test(line) && !seenHeader) {
       seenHeader = true;
    }
    
    // check for end of table
    else if (/^\|=+/.test(line)) {
      Logger.log("end of table: " + line);
    }
    
    // check for rows, and append cells into the i++ row of the outerArray
    else if (/^\|.*$/.test(line)) {
      // create an array, splitting on "|"
      cols = line.split("|");
      // The very first pipe "|" just indicates the start of the row, so let's ignore
      // the very first item in the generated array
      // The shift() method removes the first element from an array and returns that element.
      cols.shift();
      outerArray[row++] = cols;
    }
  }
  return outerArray;
}
