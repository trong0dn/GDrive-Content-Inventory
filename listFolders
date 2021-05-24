// Provide the folder ID
var folderId = "<!-- INSERT Folder ID HERE -->";

// Creates a new named spreadsheet and add headers
var sheet = SpreadsheetApp.create("content_inventory of " + DriveApp.getFolderById(folderId).getName());
sheet.appendRow(["Content Name", "Date Created", "Date Updated", "Size", "URL", "Filepath"]);

/**
 * Recursive function that returns the files in each folder.
 * @param {*} folder 
 */
function listFolders(folder) {

  folder = folder || DriveApp.getFolderById(folderId);

  var files = folder.getFiles();

  while (files.hasNext()) {
    var file = files.next();
    var folders = [];
    var parent = file.getParents();

    while (parent.hasNext()) {
      parent = parent.next();
      folders.push(parent.getName());
      parent = parent.getParents();
    }

    if (folders.length) {
      var filepath = folders.reverse().join("/").toString();
    }

    data = [
      file.getName(),
      file.getDateCreated(),
      file.getLastUpdated(),
      file.getSize(),
      file.getUrl(),
      filepath
    ]
    sheet.appendRow(data);
    
    // Print onto logger for debugging and to see what files are being processed
    Logger.log(":: " + filepath);
  }

  var subfolders = folder.getFolders();

  while (subfolders.hasNext()) {
    listFolders(subfolders.next());
  }
}
