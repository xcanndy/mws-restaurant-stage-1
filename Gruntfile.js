module.exports = function(grunt) {

  grunt.initConfig({
    // resize imgs to 
    image_resize: {
      resize: {
        options: {
          width: 400,
          height: 300
        },
        src: 'img/*.jpg',
        dest: 'img/resized/400/'
      },
    },
    // Clean resized images' directory
    clean: ['img/resized/'],

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'img/resized/400/',
            src: ['*'],
            dest: 'img/400/',
            ext: '-400.jpg'
          } 
        ]
      }
    },
    
  })

  // Load tasks
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

// Register tasks
  grunt.registerTask('resize-img', ['clean','image_resize','copy']);
}