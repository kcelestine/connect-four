module.exports = function(grunt) {

  grunt.initConfig({
    distFolder: 'dist',
    // Allows us to reference properties we declared in package.json.
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js'],
        dest: '<%= distFolder %>/main.js'
      }
    }
  }); 

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('build', ['concat']);
};
