module.exports = function(grunt) {

  grunt.initConfig({
    // resize imgs to 
    image_resize: {
      resize: {
        options: {
          width: 200,
          height: 150
        },
        src: 'img/*.jpg',
        dest: 'img/copy/'
      },
    },
    // Clean resized images' directory
    clean: ['img/copy/'],

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'img/copy/',
            src: ['*'],
            dest: 'img/resized/',
            ext: '-200.jpg'
          } 
        ]
      }
     
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.jpg'],
          dest: 'img/'
        }]
      }
    }
    
  })

  // Load tasks
  grunt.loadNpmTasks('grunt-image-resize');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

// Register tasks
  grunt.registerTask('resize', ['clean','image_resize','copy','clean','imagemin']);
}