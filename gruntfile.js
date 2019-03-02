module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        files: [{
          src: ["src/server/\*\*/\*.ts", "src/common/\*\*/\*.ts", "!\*\*/\*.spec.ts", "!src/public/\*\*/\*.ts", "!src/server/.baseDir.ts"],
          dest: "./dist/server"
        }],
        tsconfig: './src/server/tsconfig.server.json',
        passThrough: true
      }
    },
    watch: {
      ts: {
        files: ["src/server/\*\*/\*.ts", "!\*\*/\*.spec.ts", "src/common/\*\*/\*.ts"],
        tasks: ["ts"],
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", ["ts"]);
  grunt.registerTask("w", ["ts", "watch"]);

};
