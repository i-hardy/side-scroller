module.exports = function(grunt) {
  grunt.initConfig({
  		meta: {
  			package: grunt.file.readJSON('package.json'),
  			src: {
  				main: 'src',
  				test: 'spec'
  			},
  			bin: {
  				coverage: 'bin/coverage'
  			}
  		},
  		jasmine: {
  			coverage: {
  				src: ['<%= meta.src.main %>/*.js', '!src/*.min.js'],
  				options: {
  					specs: '<%= meta.src.test %>/*.js',
  					template: require('grunt-template-jasmine-istanbul'),
  					templateOptions: {
  						coverage: '<%= meta.bin.coverage %>/coverage.json',
  						report: [
  							{
  								type: 'html',
  								options: {
  									dir: '<%= meta.bin.coverage %>/html'
  								}
  							},
  							{
  								type: 'lcov',
  								options: {
  									dir: '<%= meta.bin.coverage %>/lcov'
  								}
  							},
  							{
  								type: 'text-summary'
  							}
  						]
  					}
  				}
  			}
  		}
  	});

  	grunt.loadNpmTasks('grunt-contrib-jasmine');

  	grunt.registerTask('test:coverage', ['jasmine:coverage']);
};
