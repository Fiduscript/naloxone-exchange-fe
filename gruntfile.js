module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "./public",
            src: ["**"],
            dest: "./dist/public"
          }
        ]
      }
    },
    ts: {
      app: {
        files: [{
          src: ["src/server/\*\*/\*.ts", "!src/server/.baseDir.ts"],
          dest: "./dist/server"
        }],
        options: {
          module: "commonjs",
          target: "es6",
          sourceMap: false,
          rootDir: "src/server"
        }
      }
    },
    watch: {
      ts: {
        files: ["src/server/\*\*/\*.ts"],
        tasks: ["ts"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "copy",
    "ts",
  ]);

  grunt.registerTask("w", [
    "copy",
    "ts",
    "watch"
  ]);

};
