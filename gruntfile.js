module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        files: [{
          src: ["src/server/\*\*/\*.ts", "src/common/\*\*/\*.ts", "!src/public/\*\*/\*.ts", "!src/server/.baseDir.ts"],
          dest: "./dist/server"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          rootDir: "src/"
        }
      }
    },
    watch: {
      ts: {
        files: ["src/server/\*\*/\*.ts", "src/common/\*\*/\*.ts"],
        tasks: ["ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", ["ts"]);
  grunt.registerTask("w", ["ts", "watch"]);

};
