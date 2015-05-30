module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: [
                '/**',
                ' * <%= pkg.description %>',
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
                ' * @author <%= pkg.author %>',
                ' * @license http://www.perlfoundation.org/artistic_license_2_0',
                ' **/\n'
            ].join('\n')
        },
//        dirs: {
//            dest: 'dist'
//        },
        copy: {
            generated: {
                src: 'index.src.html',
                dest: 'index.html'
            }
        },
        useminPrepare: {
            html: 'index.src.html',
            options: {
                dest: 'dist'
            }
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            }
        },
        usemin: {
            html: 'index.html'
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 10
            },
            source: {
                files: [{
                    src: [
                        'dist/*.js',
                        'dist/*.css'
                    ]
                }]
            }
        },
        uglify:
        {
            my_dist: {
                files: {
                    'dist/wigahluk-dependencies.js': ['.tmp/concat/dist/wigahluk-dependencies.js'],
                    'dist/wigahluk-page.js': ['.tmp/concat/dist/wigahluk-page.js']
                }
            }
        },
        plato: {
            my_page: {
                files: { 'plato-report': ['src/**/*.js'] }
            }
        }
    });

    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.task.loadTasks('grunt-tasks/list-posts');
    grunt.loadNpmTasks('grunt-plato');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'useminPrepare', 'concat', 'uglify:my_dist', 'usemin', 'list-posts', 'plato']);

};