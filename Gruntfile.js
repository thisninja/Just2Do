module.exports = function(grunt) {
	grunt.initConfig({
		compass: {
			dist: {
				options: {
					cssDir:'public/css',
					sassDir: 'public/sass'
				}
			}
		},
		watch: {
			source: {
				files: ['public/sass/**/*.scss'],
				tasks: ['compass'],
				options: {
					livereload: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
}