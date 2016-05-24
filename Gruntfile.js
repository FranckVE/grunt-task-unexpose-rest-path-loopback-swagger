module.exports = function (grunt) {

  // Grunt Task that updates exposure of all the LoopBack web services according to a predefined setup
  grunt.registerTask('unexpose_rest_path_for_swagger_models_v1', function (key, value) {
    try {
      // Change the list below depending on your API project :
      // list of the REST paths to leave Exposed
      var list_of_REST_path_to_EXPOSE =
        [
          "swagger_example-api_v1",
          "write_here_the_paths_you_want_to_leave_exposed"
        ];
      
      // Location of a bakup folder for modified model-config.json (change this according to your specific needs):
      var backup_folder = "grunt-play-field/backups-model-config/";

      var src_folder = "server/";
      var dest_folder = "server/";
      var src_file_extension = ".json";
      var src_file_root_name = "model-config";
      
      var src_filename = src_file_root_name + src_file_extension;
      var dest_filename = src_file_root_name + src_file_extension;
      var src = src_folder + src_filename;
      var dest = dest_folder + dest_filename;
      var free_backup_file;

      if (!grunt.file.exists(src)) {
        grunt.log.error("file " + src + " not found");
        throw grunt.util.error("Source file 'model-config.json' does NOT exists in folder '" + src_folder + "'");
      }

      // timestamp for the backup file of model-config.json
      var dateFormat = require('dateformat');
      var now = new Date();
      var ts = dateFormat(now, "yyyy-mm-dd_hh-MM-ss");

      // backup model-config.json
      var root_file_backup = src_file_root_name + "_bkp_";
      var root_backup = backup_folder + root_file_backup;
      free_backup_file = root_backup + ts + src_file_extension;
      if (!grunt.file.exists(root_file_backup + "*.*", backup_folder)) {
        var original_file = grunt.file.read(src);
        grunt.file.write(free_backup_file, original_file);
        grunt.log.write("Creating BACKUP"['green'] + " of '" + src + "' " + "to file : "['green'] + free_backup_file + " ").ok();
      } else {
        grunt.log.write("NO BACKUP created"['red'] + " of '" + src + "' " + "because file : " + free_backup_file + " ALREADY EXISTS ! "['red']).error();
        throw grunt.util.error("Destination backup file already exists");
      }

      // load model-config.json
      var project = grunt.file.readJSON(src);//get file as json object

      // make modifications in model-config.json
      for (var rest_path in project) {
        if (rest_path.charAt(0) === "_") {
          grunt.log.write("SKIPPING"['blue'] + " the JSON item '" + rest_path + "' belonging to the " + "SYSTEM"['blue'] + ". ").ok();
          continue; // skip first level items that are system-related
        }
        if (list_of_REST_path_to_EXPOSE.indexOf(rest_path) > -1) { //
          project[rest_path]["public"] = true;
          grunt.log.write("KEEPING"['green'] + " the REST path '" + rest_path + "' " + "EXPOSED"['green'] + ". ").ok();
        } else {
          project[rest_path]["public"] = false;
          grunt.log.writeln("HIDING"['yellow'] + " REST path '" + rest_path + "' : it will " + "NOT"['yellow'] + " be exposed.");
        }
      }

      grunt.file.write(dest, JSON.stringify(project, null, 2));//serialize it back to file
    }
    catch (err) {
      console.log(err);
      throw err;
    }

  });


  // Grunt Task that displays the status of the exposure of all the LoopBack webservices
  grunt.registerTask('status_rest_for_swagger_models_v1', function (key, value) {
    try {

      var src_folder = "server/";
      var src_file_extension = ".json";
      var src_file_root_name = "model-config";
      var src_filename = src_file_root_name + src_file_extension;
      var src = src_folder + src_filename;

      if (!grunt.file.exists(src)) {
        grunt.log.error("file " + src + " not found");
        throw grunt.util.error("Source file 'model-config.json' does NOT exists in folder '" + src_folder + "'");
      }

      var project = grunt.file.readJSON(src);//get file as json object

      // NB: on colored logs :
      //    http://stackoverflow.com/questions/26411084/how-to-log-colored-messages-with-grunt-log
      for (var rest_path in project) {
        if (rest_path.charAt(0) === "_") {
          grunt.log.write("SKIPPING"['blue'] + " the JSON item '" + rest_path + "' belonging to the " + "SYSTEM"['blue'] + ". ").ok();
          continue; // skip first level items that are system-related
        }
        if (project[rest_path]["public"] == true) { //
          grunt.log.writeln("EXPOSED"['green'] + " REST path : '" + rest_path + "'");
        } else {
          grunt.log.writeln("UNEXPOSED"['grey'] + " REST path '" + rest_path + "'");
        }
      }

    }
    catch (err) {
      console.log(err);
      throw err;
    }

  });

}
