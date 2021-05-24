function contentInventory() {

  var rootFolder = DriveApp.getRootFolder();
  var subFile = rootFolder.getFiles();
  var subFolder = rootFolder.getFolders();
  
  var file, data, sheet = SpreadsheetApp.create("content_inventory of " + rootFolder.getName());

  sheet.appendRow(["Content Name", "Date Created", "Date Updated", "Size", "URL", "Filepath"]);

  // Get information on "My Drive" root node
  if (rootFolder != null) {
    root = rootFolder;
    data = [
      root.getName(),
      root.getDateCreated(),
      root.getLastUpdated(),
      root.getSize(),
      root.getUrl(),
      root.getDescription(),
    ];
    sheet.appendRow(data);

    // Get information of the sub-directory files
    while (subFile.hasNext()) {
      var file = subFile.next();
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
      ];
      sheet.appendRow(data);
    }

    while (subFolder.hasNext()) {
      var folder = subFolder.next();
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
        folder.getName(),
        folder.getDateCreated(),
        folder.getLastUpdated(),
        folder.getSize(),
        folder.getUrl(),
        filepath
      ];
      sheet.appendRow(data);
    }
  }
}
